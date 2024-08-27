import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from "@prisma/client";
import { authOptions } from '@/app/lib/utils/authOptions';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const todoId = params.id;
    const { name, description, completed, spentTime, weekdayName } = await request.json();
console.log(todoId)
    try {
        const updatedTodo = await prisma.todo.update({
            where: { id: todoId, userId },
            data: { name, description, completed, spentTime, weekday: weekdayName }
        });
        console.log(updatedTodo)

        return NextResponse.json(updatedTodo);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const todoId = params.id;

    try {
        await prisma.todo.delete({ where: { id: todoId, userId } });
        return NextResponse.json({ message: 'Todo deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
    }
}
