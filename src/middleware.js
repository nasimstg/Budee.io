import { authMiddleware, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { initUser } from "./lib/db/user";
export default authMiddleware({
  publicRoutes: ["/", "/contact", "/pricing", "/about", "/sign-in", "/sign-up", "/documentation"],
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // Handle users who are authenticated but haven't selected an organization
    if (
      auth.userId &&
      !auth.orgId &&
      req.nextUrl.pathname !== "/app/team-selection"
    ) {
      const orgSelection = new URL("/app/team-selection", req.url);
      return NextResponse.redirect(orgSelection);
    }
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 