import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = [
  '/',
  '/sign-in',
  '/sign-up',
  'user'
]

const isPublic = createRouteMatcher(publicRoutes);

export default function middleware(req) {
  if (isPublic(req)) {
    return NextResponse.next();
  }
  return clerkMiddleware()(req);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};