import type { ConnectorMetadata } from '@logto/connector-kit';
import { ConnectorConfigFormItemType } from '@logto/connector-kit';

export const endpoint = 'https://api.twilio.com/2010-04-01/Accounts/{{accountSID}}/Messages.json';

export const defaultMetadata: ConnectorMetadata = {
  id: 'dashnex',
  target: 'dashnex',
  platform: null,
  name: {
    en: 'DasnexApi SMS Service',
  },
  logo: './logo.png',
  logoDark: null,
  description: {
    en: 'DasnexApi accelerates development by removing the learning curve and guesswork, so you can get down to building right away with our APIs.',
  },
  readme: './README.md',
  formItems: [
    {
      key: 'endpoint',
      label: 'Endpoint',
      type: ConnectorConfigFormItemType.Text,
      required: true,
      placeholder: 'https://<dashnexurl>/api/public/sendSms',
      defaultValue: 'https://<dashnexurl>/api/public/sendSms',
    },
    {
      key: 'apiToken',
      label: 'API Token',
      type: ConnectorConfigFormItemType.Text,
      required: true,
    },
    {
      key: 'sender',
      label: 'Sender',
      type: ConnectorConfigFormItemType.Text,
      required: true,
      placeholder: 'ExampleSMS',
    },
    {
      key: 'templates',
      label: 'Templates',
      type: ConnectorConfigFormItemType.Json,
      required: true,
      defaultValue: [
        {
          usageType: 'SignIn',
          content:
            'Your Logto sign-in verification code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'Register',
          content:
            'Your Logto sign-up verification code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'ForgotPassword',
          content:
            'Your Logto password change verification code is {{code}}. The code will remain active for 10 minutes.',
        },
        {
          usageType: 'Generic',
          content:
            'Your Logto verification code is {{code}}. The code will remain active for 10 minutes.',
        },
      ],
    },
  ],
};
