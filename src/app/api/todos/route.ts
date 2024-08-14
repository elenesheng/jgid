import { WeekDay } from './../../types/tasks';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from "@prisma/client";
import { authOptions } from '@/app/lib/utils/authOptions';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const weekday = searchParams.get('weekday');

    try {
        const todos = await prisma.todo.findMany({
            where: {
                weekday: {
                    name: weekday || undefined,
                },
            },
            include: {
                weekday: true,
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
    const { id, name, description, completed, spentTime, weekdayId } = await request.json();

    try {
        const newTodo = await prisma.todo.create({
            data: {
                name,
                description,
                completed,
                spentTime,
                userId,
                weekdayId
            },
        });
        return NextResponse.json(newTodo, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
    }
}

export async function DELETE() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    try {
        await prisma.todo.deleteMany({ where: { userId } });
        return NextResponse.json({ message: 'All todos deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete todos' }, { status: 500 });
    }
}