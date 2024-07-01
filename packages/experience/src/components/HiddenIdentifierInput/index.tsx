import { useContext } from 'react';

import UserInteractionContext from '@/Providers/UserInteractionContextProvider/UserInteractionContext';

/**
 * This component renders a hidden input field that stores the user's identifier.
 * Its primary purpose is to assist password managers in associating the correct
 * identifier with the password being set or changed.
 *
 * By including this hidden field, we enable password managers to correctly save
 * or update the user's credentials, enhancing the user experience and security.
 */
const HiddenIdentifierInput = () => {
  const { currentIdentifier } = useContext(UserInteractionContext);

  if (!currentIdentifier) {
    return null;
  }

  return <input readOnly hidden type={currentIdentifier.type} value={currentIdentifier.value} />;
};

export default HiddenIdentifierInput;
