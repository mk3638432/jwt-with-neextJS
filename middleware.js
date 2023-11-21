import { NextResponse } from "next/server";

export const middleware = (request) => {
  const pathVariable = request.nextUrl.pathname;
  const iisPublicPath =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";
  const token = request.cookies.get("token") || "";

  if (iisPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!iisPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
};

export const config = {
  matcher: ["/", "/login", "/register"],
};
