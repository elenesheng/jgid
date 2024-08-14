const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

async function main() {
    for (const dayName of weekDays) {
        const weekday = await prisma.weekday.upsert({
            where: { name: dayName },
            update: {},
            create: {
                name: dayName,
            },
        });
        console.log(`Upserted weekday: ${weekday.name} with id: ${weekday.id}`);
    }

    const monday = await prisma.weekday.upsert({
        where: { name: 'Monday' },
        update: {},
        create: {
            name: 'Monday',
        },
    });

    await prisma.todo.updateMany({
        where: { weekdayName: null },
        data: {
            weekdayName: monday.name,
        },
    });

    console.log("Updated todos with null weekdays to Monday");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
