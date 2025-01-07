import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = new Set(["/", "/auth/login", "/auth/register", "/profile", "/team", "/quiz", "/blog"]);

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request, secret: process.env.SECRET }) as { role?: string } | null;

	const { pathname } = new URL(request.url);

	if (PUBLIC_PATHS.has(pathname) || isPublicPath(pathname)) {
		return NextResponse.next();
	}

	if (!token) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	const userRole = token.role;

	// Handle role-based access for admin routes
	if (pathname.startsWith("/admin")) {
		if (pathname.startsWith("/admin/manage-user")) {
			return handleAdminAccess(userRole, ["SUPERADMIN"], request);
		}
		return handleAdminAccess(userRole, ["ADMIN", "SUPERADMIN"], request);
	}

	// Allow access to authenticated users for other routes
	return NextResponse.next();
}

/**
 * Determines if a path is a public path (with nested subpaths allowed).
 * @param pathname - Pathname to check.
 */
function isPublicPath(pathname: string): boolean {
	return [...PUBLIC_PATHS].some(
		(path) => pathname === path || pathname.startsWith(`${path}/`)
	);
}

/**
 * Handles role-based access control for admin routes.
 * Redirects users who lack appropriate roles.
 * @param userRole - The role of the current user.
 * @param allowedRoles - Roles allowed to access the route.
 * @param request - The incoming request.
 */
function handleAdminAccess(
	userRole: string | undefined | null,
	allowedRoles: string[],
	request: Request
) {
	if (!allowedRoles.includes(userRole || "")) {
		const redirectPath = getSafeRedirectUrl(request);
		return NextResponse.redirect(new URL(redirectPath, request.url));
	}
	return NextResponse.next();
}

/**
 * Retrieves a safe redirect URL based on the referer.
 * Ensures the referer is from the same origin to prevent open redirects.
 * @param request - The incoming request.
 */
function getSafeRedirectUrl(request: Request): string {
	const referer = request.headers.get("referer");
	if (referer) {
		try {
			const refererUrl = new URL(referer);
			if (refererUrl.origin === new URL(request.url).origin) {
				return refererUrl.pathname + refererUrl.search;
			}
		} catch {
			// Invalid URL in referer; fallback
		}
	}
	// Default fallback
	return "/";
}

export const config = {
	matcher: [
		// Match all routes except those in the public folder, API, static files, and auth paths
		"/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
	],
};
