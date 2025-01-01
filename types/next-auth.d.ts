import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			role: "MEMBER" | "ADMIN" | "SUPERADMIN";
			avatar: string | null;
		} & DefaultSession["user"];
	}

	interface User {
		id: string;
		email: string | null;
		name: string | null;
		avatar: string | null;
		role : "MEMBER" | "ADMIN" | "SUPERADMIN";
	}
}
