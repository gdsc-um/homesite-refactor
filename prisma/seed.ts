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
			role_tim: "CORETIM",
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
			role_tim: "CORETIM",
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
			role_tim: "CORETIM",
			profil_bevy: "https://gdg.community.dev/u/myfmmz/",
			avatar: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
            role: "MEMBER",

			password,
		},
	});
	const user4 = await prisma.user.upsert({
		where: { email: "admin4@gmail.com" },
		update: {},
		create: {
			id: "d5f2e78c-c9e0-45d6-b577-5af5c196e9d51",
			nim: "1478523691",
			name: "Budi 0 1",
			email: "admin4@gmail.com",
			role_tim: "CORETIM",
			profil_bevy: "https://gdg.community.dev/u/myfmmz/",
			avatar: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
            role: "MEMBER",

			password,
		},
	});
	const user5 = await prisma.user.upsert({
		where: { email: "admin5@gmail.com" },
		update: {},
		create: {
			id: "d5f2e78c-c9e0-45d6-b577-5af5c196e9d52",
			nim: "1478523692",
			name: "Budi 0 1",
			email: "admin5@gmail.com",
			role_tim: "CORETIM",
			profil_bevy: "https://gdg.community.dev/u/myfmmz/",
			avatar: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
            role: "MEMBER",

			password,
		},
	});
	const user6 = await prisma.user.upsert({
		where: { email: "admin6@gmail.com" },
		update: {},
		create: {
			id: "d5f2e78c-c9e0-45d6-b577-5af5c196e9d56",
			nim: "1478523696",
			name: "Budi 0 1",
			email: "admin6@gmail.com",
			role_tim: "CORETIM",
			profil_bevy: "https://gdg.community.dev/u/myfmmz/",
			avatar: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
            role: "MEMBER",

			password,
		},
	});
	const user7 = await prisma.user.upsert({
		where: { email: "admin7@admin.com" },
		update: {},
		create: {
			id: "d5f2e78c-c9e0-45d6-b577-5af5c196e",
			nim: "12345789",
			name: "Alvalen Shafelbilyunazra",
			email: "admin7@admin.com",
			avatar: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvian_rahmadani_ikZ8sYg.jpg",
            role: "SUPERADMIN",
			role_tim: "CORETIM",
			profil_bevy: "https://gdg.community.dev/u/myfmmz/",
			password,
		},
	});
	const user8 = await prisma.user.upsert({
		where: { email: "admin8@gmail.com" },
		update: {},
		create: {
			id: "d5f2e78c-c9e0-45d6-77-5af5c196e9d1",
			nim: "98654321",
			name: "Budi 0 1",
			email: "admin8@gmail.com",
			role_tim: "CORETIM",
			profil_bevy: "https://gdg.community.dev/u/myfmmz/",
			avatar: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
            role: "ADMIN",

			password,
		},
	});
	const user9 = await prisma.user.upsert({
		where: { email: "admin9@gmail.com" },
		update: {},
		create: {
			id: "d5f2e78c-c9e0-45d6-b577-5af196e9d5",
			nim: "14785332369",
			name: "Budi 0 1",
			email: "admin9@gmail.com",
			role_tim: "CORETIM",
			profil_bevy: "https://gdg.community.dev/u/myfmmz/",
			avatar: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
            role: "MEMBER",

			password,
		},
	});
	const user10 = await prisma.user.upsert({
		where: { email: "admin10@gmail.com" },
		update: {},
		create: {
			id: "d5f278c-c9e0-45d6-b577-5af5c196e9d5",
			nim: "17852369",
			name: "Budi 0 1",
			email: "admin10@gmail.com",
			role_tim: "CORETIM",
			profil_bevy: "https://gdg.community.dev/u/myfmmz/",
			avatar: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
            role: "MEMBER",

			password,
		},
	});
	const user11 = await prisma.user.upsert({
		where: { email: "admin11@gmail.com" },
		update: {},
		create: {
			id: "d5f2e78c-cf9e0-45d6-b577-5af5c196e9d5",
			nim: "1478523619",
			name: "Budi 0 1",
			email: "admin11@gmail.com",
			role_tim: "CORETIM",
			profil_bevy: "https://gdg.community.dev/u/myfmmz/",
			avatar: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
            role: "MEMBER",

			password,
		},
	});
	const user12 = await prisma.user.upsert({
		where: { email: "admin12@gmail.com" },
		update: {},
		create: {
			id: "d5f2e758c-c9e0-45d6-b577-5af5c196e9d5",
			nim: "1478523659",
			name: "Budi 0 1",
			email: "admin12@gmail.com",
			role_tim: "CORETIM",
			profil_bevy: "https://gdg.community.dev/u/myfmmz/",
			avatar: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
            role: "MEMBER",

			password,
		},
	});

	
	
	

	// const artikel = await prisma.article.create({
	// 	data: {
	// 		title: "Hello World",
	// 		content: "This is a content of the article",
	// 		author: "Dimas Ardiminda ",
	// 		slug: "hello-world",
	// 		date: new Date(),
	// 		banner: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
	// 	},
	// });
	// const artikel2 = await prisma.article.create({
	// 	data: {
	// 		title: "Hello World",
	// 		content: "This is a content of the article",
	// 		author: "Dimas Ardiminda ",
	// 		slug: "hello-world-2",
	// 		date: new Date(),
	// 		banner: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/alvalen_shafel_5fUEnek.jpg",
	// 	},
	// });
}
main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
