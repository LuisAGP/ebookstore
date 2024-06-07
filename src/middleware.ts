// middleware.js
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

export const config = {
  matcher: [
    '/profile', // Normal URL
    // '/store/book/:id*', // With parameter
  ],
};
