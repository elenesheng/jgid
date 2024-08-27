import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from "@prisma/client";
import { authOptions } from '@/app/lib/utils/authOptions';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const weekday = searchParams.get('weekday');
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: userId,
                ...(weekday ? { weekday } : {}),
            },
            select: {
                id: true,
                name: true,
                completed: true,
                spentTime: true,
                weekday: true,
                description: true
            },
        });

        return NextResponse.json(todos);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const { id, name, description, completed, spentTime, weekday } = await request.json();

    try {
        const newTodo = await prisma.todo.create({
            data: {
                id,
                name,
                description,
                completed,
                spentTime,
                userId,
                weekday: weekday,
            },
        });
        return NextResponse.json(newTodo, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const weekday = req.nextUrl.searchParams.get('weekday');

    try {
        if (weekday) {
            await prisma.todo.deleteMany({
                where: {
                    userId,
                    weekday: weekday
                }
            });
            return NextResponse.json({ message: `Todos for ${weekday} deleted` });
        } else {
            await prisma.todo.deleteMany({ where: { userId } });
            return NextResponse.json({ message: 'All todos deleted' });
        }
    } catch (error) {
        console.error('Error deleting todos:', error);
        return NextResponse.json({ error: 'Failed to delete todos' }, { status: 500 });
    }
}
