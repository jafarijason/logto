import { UsersPasswordEncryptionMethod, User } from '@logto/schemas';
import { nanoid } from 'nanoid';
import pRetry from 'p-retry';

import { findUserByUsername, hasUserWithId } from '@/queries/user';
import assertThat from '@/utils/assert-that';
import { buildIdGenerator } from '@/utils/id';
import { encryptPassword } from '@/utils/password';

const userId = buildIdGenerator(12);

export const generateUserId = async (retries = 500) =>
  pRetry(
    async () => {
      const id = userId();

      if (!(await hasUserWithId(id))) {
        return id;
      }

      throw new Error('Cannot generate user ID in reasonable retries');
    },
    { retries, factor: 0 } // No need for exponential backoff
  );

export const encryptUserPassword = (
  userId: string,
  password: string
): {
  passwordEncryptionSalt: string;
  passwordEncrypted: string;
  passwordEncryptionMethod: UsersPasswordEncryptionMethod;
} => {
  const passwordEncryptionSalt = nanoid();
  const passwordEncryptionMethod = UsersPasswordEncryptionMethod.SaltAndPepper;
  const passwordEncrypted = encryptPassword(
    userId,
    password,
    passwordEncryptionSalt,
    passwordEncryptionMethod
  );

  return { passwordEncrypted, passwordEncryptionMethod, passwordEncryptionSalt };
};

export const findUserByUsernameAndPassword = async (
  username: string,
  password: string
): Promise<User> => {
  const user = await findUserByUsername(username);
  const { id, passwordEncrypted, passwordEncryptionMethod, passwordEncryptionSalt } = user;

  assertThat(
    passwordEncrypted && passwordEncryptionMethod && passwordEncryptionSalt,
    'session.invalid_sign_in_method'
  );

  assertThat(
    encryptPassword(id, password, passwordEncryptionSalt, passwordEncryptionMethod) ===
      passwordEncrypted,
    'session.invalid_credentials'
  );

  return user;
};
