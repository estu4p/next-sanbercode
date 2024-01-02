import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isCookiesExist = !!request.cookies.get("user_token");
  const isLoginPage = pathname.startsWith("/login");

  // Jika user sudah login dan berada di halaman login, maka akan di redirest ke halaman home
  if (isCookiesExist === true && isLoginPage === true) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Jika user belum login dan tidak berada di halaman login, maka akan di redirest ke halaman login
  if (isCookiesExist === false && isLoginPage === false) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // console.log("isTokenExist", isTokenExist);
  // return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
