declare module 'micro-cors-multiple-allow-origin'
declare module 'micro-compose'
declare module 'micro-errors'
declare module '@remap/authenticate-middleware'

interface IAuthentication {
  name: string;
  picture: string;
  auth_time: number;
  email: string;
  email_verified: boolean;
  uid: string;
}
