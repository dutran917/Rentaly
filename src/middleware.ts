import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//public
const AUTH_PATH: any = { "/manager/login": true };

//private
const PATH: any = ["manager"];

export async function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get("accessTokenManager");
  const tokenAdmin = cookies.get("accessTokenAdmin");
  const path = request.nextUrl.pathname;

  if (
    !token &&
    path !== "/manager/login" &&
    !path.includes("/admin")
  ) {
    return NextResponse.redirect(
      new URL("/manager/login", request.url)
    );
  }
  if (
    token &&
    path === "/manager/login" &&
    !path.includes("/admin")
  ) {
    return NextResponse.redirect(
      new URL("/manager", request.url)
    );
  }
  if (
    !tokenAdmin &&
    path !== "/admin/login" &&
    !path.includes("/manager")
  ) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }
  if (
    tokenAdmin &&
    path === "/admin/login" &&
    !path.includes("/manager")
  ) {
    return NextResponse.redirect(
      new URL("/admin", request.url)
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
    "/manager/add-apartment",
    "/manager/dashboard",
    "/admin",
    "/admin/login",
    "/admin/lessor-management",
    "/admin/apartment-management",
  ],
};
