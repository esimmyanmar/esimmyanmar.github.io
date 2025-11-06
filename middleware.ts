import { type NextRequest, NextResponse } from "next/server"

const ZAWGYI_PATTERN = /[\u1000-\u109f](?![\u200b\u200c\u200d])/g
const MYANMAR_PATTERN = /[\u1000-\u109f][\u200b\u200c\u200d]?/g

function isZawgyi(text: string): boolean {
  if (!text) return false
  const zawgyiMatches = (text.match(ZAWGYI_PATTERN) || []).length
  const myanmarMatches = (text.match(MYANMAR_PATTERN) || []).length
  return zawgyiMatches > myanmarMatches * 0.7
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/public") ||
    pathname.match(/\.(jpg|jpeg|png|gif|ico|svg|webp|avif)$/)
  ) {
    return NextResponse.next()
  }

  const languageCookie = request.cookies.get("language")?.value
  let preferredLang = languageCookie || "en"

  if (!languageCookie) {
    const acceptLanguage = request.headers.get("accept-language") || ""
    if (acceptLanguage.includes("my") || acceptLanguage.includes("th")) {
      preferredLang = "my"
    }
  }

  const zawgyiParam = request.nextUrl.searchParams.get("zawgyi")
  if (zawgyiParam === "true" && preferredLang === "my") {
    const response = NextResponse.redirect(new URL(`/my${pathname === "/" ? "" : pathname}`, request.url))
    response.cookies.set("language", "my", {
      maxAge: 365 * 24 * 60 * 60,
      sameSite: "lax",
    })
    return response
  }

  if (!pathname.startsWith("/en") && !pathname.startsWith("/my") && pathname !== "/") {
    const newPathname = `/${preferredLang}${pathname}`
    const response = NextResponse.redirect(new URL(newPathname, request.url))
    response.cookies.set("language", preferredLang, {
      maxAge: 365 * 24 * 60 * 60,
      sameSite: "lax",
    })
    return response
  }

  if (pathname.startsWith("/en") || pathname.startsWith("/my")) {
    const lang = pathname.split("/")[1]
    const response = NextResponse.next()
    response.cookies.set("language", lang, {
      maxAge: 365 * 24 * 60 * 60,
      sameSite: "lax",
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
