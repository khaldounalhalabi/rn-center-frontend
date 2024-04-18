// import createMiddleware from 'next-intl/middleware';
// import { NextRequest, NextResponse } from 'next/server';
 

// const nextIntlMiddleware = createMiddleware({
//   locales: ['en', 'ar'],
 
//   // Used when no locale matches
//   defaultLocale: 'en'
// })

// export default function (req:NextRequest):NextResponse{
//   return nextIntlMiddleware(req)
// }
 
// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(ar|en)/:path*']
// };

import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*']
};