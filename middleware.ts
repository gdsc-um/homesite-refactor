import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Route access rules
// Role: SUPERADMIN > ADMIN > null (default for all authenticated users)
const ROUTE_RULES: Record<string, { roles: string[] | null }> = {
	"/admin": { roles: ["ADMIN", "SUPERADMIN"] },
	"/admin/manage-user": { roles: ["SUPERADMIN"] },
	"/quiz": { roles: null }, 
};

// Middleware function
export async function middleware(request: NextRequest) {
	const token = (await getToken({
		req: request,
		secret: process.env.SECRET,
	})) as { role?: string } | null;

	const { pathname } = new URL(request.url);

	// Match the route with access rules
	for (const [route, { roles }] of Object.entries(ROUTE_RULES)) {
		if (pathname.startsWith(route)) {
			if (!token) {
				return redirectToLogin(request);
			}
			if (roles && !roles.includes(token.role || "")) {
				return redirectToSafeUrl(request);
			}
			return NextResponse.next();
		}
	}
	return NextResponse.next();
}

/**
 * Redirects the user to the login page.
 * @param request - The incoming request.
 */
function redirectToLogin(request: NextRequest): NextResponse {
	return NextResponse.redirect(new URL("/auth/login", request.url));
}

/**
 * Redirects the user to a safe fallback URL based on referer or root path.
 * @param request - The incoming request.
 */
function redirectToSafeUrl(request: NextRequest): NextResponse {
	const referer = request.headers.get("referer");
	if (referer) {
		try {
			const refererUrl = new URL(referer);
			if (refererUrl.origin === new URL(request.url).origin) {
				return NextResponse.redirect(
					new URL(refererUrl.pathname, request.url)
				);
			}
		} catch {
			// Invalid referer URL; fallback
		}
	}
	return NextResponse.redirect(new URL("/", request.url));
}
