const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.todo.updateMany({
        where: { weekday: null },
        data: {
            weekday: "Monday",
        },
    });

    console.log("Updated todos with null weekdays to 'Monday'");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
