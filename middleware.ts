import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, localeCookieName, locales } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

const removedBlogRedirects = new Map<string, string>([
  ["/en/blog/real-ways-to-make-money-with-ai", "/en/blog/ai-tools-to-make-money-2026"],
  ["/en/blog/ai-tools-for-passive-income-2026", "/en/blog/ai-tools-to-make-money-2026"],
  ["/en/blog/ai-side-hustles-you-can-start-today", "/en/blog/ai-tools-to-make-money-2026"],
  ["/en/blog/how-to-make-1000-a-month-with-ai-tools", "/en/blog/ai-tools-to-make-money-2026"],
  ["/en/blog/best-ai-tools-for-making-money-2026", "/en/blog/ai-tools-to-make-money-2026"],
  ["/en/blog/free-ai-tools-you-can-start-using-today", "/en/blog/best-free-ai-tools-2026"],
  ["/en/blog/best-ai-tools-for-freelancers-2026", "/en/blog/ai-tools-for-freelancers"],
  ["/en/blog/best-ai-tools-for-students-2026", "/en/blog/best-ai-tools-for-beginners-2026"],
  ["/en/blog/chatgpt-alternatives-compared-2026", "/en/blog/chatgpt-vs-claude-vs-gemini"],
  ["/tr/blog/2026-pasif-gelir-icin-en-iyi-ai-araclari", "/tr/blog/ai-tools-to-make-money-2026"],
  ["/tr/blog/bugun-baslayabilecegin-10-ai-yan-gelir-fikri", "/tr/blog/ai-tools-to-make-money-2026"],
  ["/tr/blog/gercekten-para-kazandiran-ucretsiz-ai-araclari", "/tr/blog/best-free-ai-tools-2026"],
  ["/tr/blog/2026-yeni-baslayanlar-icin-en-iyi-ai-araclari", "/tr/blog/best-ai-tools-for-beginners-2026"],
  ["/tr/blog/ai-araclariyla-ayda-1000-dolar-kazanma", "/tr/blog/ai-tools-to-make-money-2026"],
  ["/tr/blog/freelancerlar-icin-ai-araclari", "/tr/blog/ai-tools-for-freelancers"],
  ["/tr/blog/2026-en-iyi-ucretsiz-ai-araclari", "/tr/blog/best-free-ai-tools-2026"],
  ["/tr/blog/2026-internetten-para-kazandiran-ai-araclari", "/tr/blog/ai-tools-to-make-money-2026"],
  ["/tr/blog/chatgpt-vs-claude-vs-gemini-karsilastirma", "/tr/blog/chatgpt-vs-claude-vs-gemini"]
]);

function normalizePathname(pathname: string) {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.replace(/\/+$/, "");
}

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
  const pathname = normalizePathname(request.nextUrl.pathname);

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
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
    url.pathname = pathname;
    return NextResponse.redirect(url, 308);
  }

  const removedBlogTarget = removedBlogRedirects.get(pathname);

  if (removedBlogTarget) {
    const url = request.nextUrl.clone();
    url.pathname = removedBlogTarget;
    return NextResponse.redirect(url, 301);
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
