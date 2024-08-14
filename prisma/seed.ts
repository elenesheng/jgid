const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const weekDays = [
    { id: "id_lzsaxmqw_g650mbx20sa", name: "Monday" },
    { id: "id_lzsaxmqw_levam5fqivo", name: "Tuesday" },
    { id: "id_lzsaxmqw_lkquojwvjqr", name: "Wednesday" },
    { id: "id_lzsaxmqw_e4ine77pvck", name: "Thursday" },
    { id: "id_lzsaxmqw_2oyjpqdu0j2", name: "Friday" },
    { id: "id_lzsaxmqw_dvk7fud4314", name: "Saturday" },
    { id: "id_lzsaxmqw_35p3h4c1b4", name: "Sunday" },
];

async function main() {
    for (const day of weekDays) {
        const weekday = await prisma.weekday.upsert({
            where: { id: day.id },
            update: {},
            create: {
                id: day.id,
                name: day.name,
            },
        });
        console.log(`Created weekday with id: ${weekday.id}`);
    }
    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
