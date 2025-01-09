import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}


export async function POST(req: Request) {
    const { name, email, password, role, nim, avatar, profil_bevy, role_tim } = await req.json();

    try {
        const newMember = await prisma.user.create({
            data: {
                name,
                email,
                password,
                role,
                nim,
                avatar,
                profil_bevy,
                role_tim
            },
        });
        return NextResponse.json(newMember, { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
    }

}