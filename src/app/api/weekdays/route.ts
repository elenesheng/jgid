import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const weekdays = await prisma.weekday.findMany({
            include: {
                _count: {
                    select: { todos: true }
                }
            }
        });

        return NextResponse.json(weekdays);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch weekdays' }, { status: 500 });
    }
}
