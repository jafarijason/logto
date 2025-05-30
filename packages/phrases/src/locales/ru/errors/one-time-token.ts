const one_time_token = {
  token_not_found: 'Токен {{token}} не найден.',
  email_mismatch: 'Электронная почта не соответствует указанному токену.',
  token_expired: 'Токен истек.',
  token_consumed: 'Токен был использован.',
  token_revoked: 'Токен был отозван.',
  cannot_reactivate_token: 'Не удается повторно активировать токен.',
};

export default Object.freeze(one_time_token);
