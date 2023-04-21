import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//public
const AUTH_PATH: any = { "/manager/login": true };

//private
const PATH: any = ["manager"];

export async function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get("accessToken");
  const path = request.nextUrl.pathname;

  if (!token && path !== "/manager/login") {
    return NextResponse.redirect(
      new URL("/manager/login", request.url)
    );
  }
  if (token && path === "/manager/login") {
    return NextResponse.redirect(
      new URL("/manager", request.url)
    );
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/manager",
    "/manager/login",
    "/manager/service-management",
    "/manager/booking-management",
    "/manager/rental-management",
    "/manager/dashboard",
  ],
};
