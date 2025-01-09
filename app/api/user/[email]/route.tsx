import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";


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
export async function GET(req: NextRequest, { params }: { params: Promise<{ email: string }> }) {
    const { email } = await params;
  
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
      return NextResponse.json(
        { error: "Failed to fetch user", details: (error as Error).message },
        { status: 500 }
      );
    }
  }

// PUT update user
export async function PUT(req: NextRequest, { params }: { params: Promise<{ email: string }> }) {
        const { email } = await params;
        const body = await req.json();
        const { name, password, role, nim, avatar, profil_bevy, role_tim } = body;
    
        if (!email || typeof email !== "string") {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }
    
        try {
        const dataToUpdate: any = { name, role, nim, avatar, profil_bevy, role_tim };
    
        if (password) {
            dataToUpdate.password = await hash(password, 10); // Hash password sebelum menyimpan
        }
    
        const updatedUser = await prisma.user.update({
            where: { email },
            data: dataToUpdate,
        });
    
        return NextResponse.json(updatedUser);
        } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { error: "Failed to update user", details: (error as Error).message },
            { status: 500 }
        );
        }
}