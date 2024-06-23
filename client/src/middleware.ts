import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "cookies-next";
export function middleware(request: NextRequest) {
  const token = getCookie("token", { req: request });

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/books/:id*", "/books/add", "/books"],
};
