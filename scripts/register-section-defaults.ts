import type { LocationRegisterProps } from '../src/app/(site)/components/locations/location-register'

const DEFAULT_BG =
  'https://chex-payload-public-pages.s3.us-east-1.amazonaws.com/manage-inspection.png'

export const defaultRegisterSection = {
  backgroundImage: DEFAULT_BG,
  backgroundImageAlt: 'Technician reviewing a vehicle inspection on a tablet',
  emailPlaceholder: 'Email Address',
  firstNamePlaceholder: 'First Name',
  formHeadingAccent: 'Sign up',
  formHeadingRest: 'and start vehicle inspection',
  headlineLines: ['YOU CAN', 'MANAGE &', 'INSPECT', 'YOUR CAR', 'ONLINE'],
  lastNamePlaceholder: 'Last Name',
  loginLinkHref: '#',
  loginLinkLabel: 'Login',
  loginPrefix: 'Already have an account? ',
  passwordPlaceholder: 'Password',
  phonePlaceholder: 'Phone Number',
  registerButtonHref: '#signup',
  registerButtonLabel: 'Register',
  sectionId: 'signup',
  termsLinkHref: '#',
  termsLinkLabel: 'Terms of Use',
  termsPrefix: 'By checking the box, you accept our ',
} satisfies LocationRegisterProps
