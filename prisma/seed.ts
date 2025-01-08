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
			nim: "123456789",
			name: "Alvalen Shafelbilyunazra",
			email: "admin@admin.com",
			avatar: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvian_rahmadani_ikZ8sYg.jpg",
            role: "SUPERADMIN",
			role_tim: "Core Tim",
			profil_bevy: "https://gdg.community.dev/u/myfmmz/",
			password,
		},
	});
	const user2 = await prisma.user.upsert({
		where: { email: "admin2@gmail.com" },
		update: {},
		create: {
			id: "d5f2e78c-c9e0-45d6-b577-5af5c196e9d1",
			nim: "987654321",
			name: "Budi 0 1",
			email: "admin2@gmail.com",
			role_tim: "Core Tim",
			profil_bevy: "https://gdg.community.dev/u/myfmmz/",
			avatar: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
            role: "ADMIN",

			password,
		},
	});
	const user3 = await prisma.user.upsert({
		where: { email: "admin3@gmail.com" },
		update: {},
		create: {
			id: "d5f2e78c-c9e0-45d6-b577-5af5c196e9d5",
			nim: "147852369",
			name: "Budi 0 1",
			email: "admin3@gmail.com",
			role_tim: "Core Tim",
			profil_bevy: "https://gdg.community.dev/u/myfmmz/",
			avatar: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
            role: "MEMBER",

			password,
		},
	});
	

	const artikel = await prisma.article.create({
		data: {
			title: "Hello World",
			content: "This is a content of the article",
			author: "Dimas Ardiminda ",
			slug: "hello-world",
			date: new Date(),
			banner: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
		},
	});
	const artikel2 = await prisma.article.create({
		data: {
			title: "Hello World",
			content: "This is a content of the article",
			author: "Dimas Ardiminda ",
			slug: "hello-world-2",
			date: new Date(),
			banner: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
		},
	});
}
main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
