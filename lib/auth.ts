import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: "/auth/login",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					return null;
				}
				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (
					user &&
					bcrypt.compareSync(credentials.password, user.password)
				) {
					return {
						id: user.id,
						email: user.email,
						name: user.name,
						avatar: user.avatar,
						role: user.role,
					};
				}

				return null;
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		jwt: ({ token, user, trigger, session }) => {
			console.log("JWT Callback", { token, user });
			if (user) {
				token.id = user.id;
				token.email = user.email ?? null;
				token.name = user.name ?? null;
				token.role = user.role ?? null;
				token.avatar = user.avatar ?? null;
			}
			if (trigger === "update" && session) {
				token.id = session.user.id;
				token.email = session.user.email;
				token.name = session.user.name;
				token.role = session.user.role;
				token.avatar = session.user.avatar
			}
			return token;
		},
		session: ({ session, token }) => {
			console.log("Session Callback", { session, token });
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					role: token.role,
					avatar: token.avatar,
				},
			};
		},
	},
};
