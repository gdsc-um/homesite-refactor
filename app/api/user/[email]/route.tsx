import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'; 

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
