import { GlobalConfig } from 'payload/types'

export const MobileAppSettings: GlobalConfig = {
  slug: 'mobileAppSettings',
  label: 'Mobile App Settings',
  admin: {
    group: 'Mobile App',
    description: 'Global settings and shared content for the mobile app',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Authentication',
          fields: [
            {
              name: 'notLoggedInMessage',
              type: 'group',
              label: 'Not Logged In Message',
              admin: {
                description: 'Default message shown on pages that require login (used across all pages unless overridden)',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Login Required',
                  admin: {
                    description: 'Heading for not-logged-in state',
                  },
                },
                {
                  name: 'message',
                  type: 'richText',
                  admin: {
                    description: 'Explanation of why login is required',
                  },
                },
                {
                  name: 'loginButtonText',
                  type: 'text',
                  defaultValue: 'Log In',
                  admin: {
                    description: 'Text for login button',
                  },
                },
                {
                  name: 'signupButtonText',
                  type: 'text',
                  defaultValue: 'Sign Up',
                  admin: {
                    description: 'Text for signup button',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'First Launch',
          fields: [
            {
              name: 'firstLaunchWelcome',
              type: 'group',
              label: 'First Launch Welcome',
              admin: {
                description: 'Content shown when user first opens the app',
              },
              fields: [
                {
                  name: 'isEnabled',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Show welcome screen on first launch',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Welcome to CHIRP Radio',
                  admin: {
                    description: 'Welcome screen title',
                  },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  admin: {
                    description: 'Optional subtitle',
                  },
                },
                {
                  name: 'content',
                  type: 'richText',
                  admin: {
                    description: 'Welcome message content',
                  },
                },
                {
                  name: 'heroImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description: 'Hero image for welcome screen',
                  },
                },
                {
                  name: 'ctaButtonText',
                  type: 'text',
                  defaultValue: 'Get Started',
                  admin: {
                    description: 'Call-to-action button text',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Terms & Legal',
          fields: [
            {
              name: 'termsAcceptance',
              type: 'group',
              label: 'Terms Acceptance',
              admin: {
                description: 'Terms and conditions that users must accept',
              },
              fields: [
                {
                  name: 'isRequired',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Require users to accept terms',
                },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Terms and Conditions',
                },
                {
                  name: 'content',
                  type: 'richText',
                  admin: {
                    description: 'Full terms and conditions text',
                  },
                },
                {
                  name: 'acceptanceText',
                  type: 'text',
                  defaultValue: 'I agree to the Terms and Conditions',
                  admin: {
                    description: 'Checkbox label text',
                  },
                },
                {
                  name: 'termsUrl',
                  type: 'text',
                  admin: {
                    description: 'Optional: Link to full terms page',
                  },
                },
                {
                  name: 'privacyPolicyUrl',
                  type: 'text',
                  admin: {
                    description: 'Optional: Link to privacy policy',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Error Messages',
          fields: [
            {
              name: 'errorMessages',
              type: 'group',
              label: 'Common Error Messages',
              admin: {
                description: 'Standard error messages used throughout the app',
              },
              fields: [
                {
                  name: 'networkError',
                  type: 'text',
                  defaultValue: 'Unable to connect. Please check your internet connection.',
                  admin: {
                    description: 'Message when network request fails',
                  },
                },
                {
                  name: 'serverError',
                  type: 'text',
                  defaultValue: 'Something went wrong. Please try again later.',
                  admin: {
                    description: 'Message for server/API errors',
                  },
                },
                {
                  name: 'authenticationError',
                  type: 'text',
                  defaultValue: 'Your session has expired. Please log in again.',
                  admin: {
                    description: 'Message when authentication fails',
                  },
                },
                {
                  name: 'notFoundError',
                  type: 'text',
                  defaultValue: 'Content not found.',
                  admin: {
                    description: 'Message when requested content doesn\'t exist',
                  },
                },
                {
                  name: 'permissionError',
                  type: 'text',
                  defaultValue: 'You don\'t have permission to access this content.',
                  admin: {
                    description: 'Message when user lacks required permissions',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
