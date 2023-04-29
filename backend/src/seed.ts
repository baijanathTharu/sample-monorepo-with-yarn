import { db } from "./db";

async function seedDb() {
  await db.todo.createMany({
    data: [
      {
        title: "Read",
      },
      {
        title: "Cook",
      },
    ],
  });
}

seedDb()
  .then(() => console.log(`Seed completed`))
  .catch((e) => console.error(`Failed to seed:`, e));
