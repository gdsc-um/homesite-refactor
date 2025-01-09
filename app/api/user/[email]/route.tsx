import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


// delete user
export async function DELETE(req: Request, { params }: { params: { email: string } }) {
    const { email } = params;

    try {
        const deletedUser = await prisma.user.delete({
            where: { email },
        });
        return NextResponse.json(deletedUser);
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: 'User delete failed', details: (error as Error).message }, { status: 400 });
    }
}


// GET user by email
export async function GET(req: Request, { params }: { params: { email: string } }) {
    const { email } = params;

    if (!email || typeof email !== "string") {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
        where: { email },
        });

        if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Failed to fetch user", details: (error as Error).message }, { status: 500 });
    }
    }

// PUT update user
export async function PUT(req: Request, { params }: { params: { email: string } }) {
    const { email } = params;

    if (!email || typeof email !== "string") {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    try {
        const body = await req.json();
        const { name, password, role, nim, avatar, profil_bevy, role_tim } = body;

        const updatedUser = await prisma.user.update({
        where: { email },
        data: { name, password, role, nim, avatar, profil_bevy, role_tim },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Failed to update user", details: (error as Error).message }, { status: 500 });
    }
}
