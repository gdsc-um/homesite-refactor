import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	const password = await hash("password123", 12);
	const user = await prisma.user.upsert({
		where: { email: "admin@admin.com" },
		update: {},
		create: {
			id: "d5f2e78c-c9e0-45d6-b577-5af5c196e9d2",
			nim: "220535608548",
			name: "Alvalen Shafelbilyunazra",
			email: "admin@admin.com",
			avatar: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
            role: "SUPERADMIN",
			password,
		},
	});
	console.log({ user });
}
main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
