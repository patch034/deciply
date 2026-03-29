import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, localeCookieName, locales } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

function getPreferredLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;

  if (cookieLocale && locales.includes(cookieLocale as (typeof locales)[number])) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language");

  if (!acceptLanguage) {
    return defaultLocale;
  }

  const preferred = acceptLanguage
    .split(",")
    .map((entry) => entry.split(";")[0]?.trim().toLowerCase())
    .find((language) => {
      if (!language) {
        return false;
      }

      return locales.some((locale) => language === locale || language.startsWith(`${locale}-`));
    });

  return preferred?.slice(0, 2) ?? defaultLocale;
}

function getRequestHost(request: NextRequest) {
  return (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "").toLowerCase();
}

function getRequestProtocol(request: NextRequest) {
  return (request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "")).toLowerCase();
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const host = getRequestHost(request);
  const protocol = getRequestProtocol(request);
  const isLocalhost = host.includes("localhost") || host.startsWith("127.0.0.1");
  const isCanonicalHost = host === siteConfig.host;
  const isWwwHost = host === `www.${siteConfig.host}`;

  if (!isLocalhost && (isWwwHost || ((isCanonicalHost || isWwwHost) && protocol === "http"))) {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.host = siteConfig.host;
    return NextResponse.redirect(url, 308);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
