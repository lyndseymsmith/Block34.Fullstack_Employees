import db from "#db/client";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "Luke Skywalker", birthday: "1977-05-25", salary: 75000 },
    { name: "Leia Organa", birthday: "1977-05-25", salary: 80000 },
    { name: "Han Solo", birthday: "1977-05-25", salary: 70000 },
    { name: "Darth Vader", birthday: "1977-05-25", salary: 120000 },
    { name: "Obi-Wan Kenobi", birthday: "1977-05-25", salary: 85000 },
    { name: "Yoda", birthday: "1977-05-25", salary: 100000 },
    { name: "Rey", birthday: "2015-12-18", salary: 65000 },
    { name: "Finn", birthday: "2015-12-18", salary: 60000 },
    { name: "Poe Dameron", birthday: "2015-12-18", salary: 68000 },
    { name: "Kylo Ren", birthday: "2015-12-18", salary: 90000 }
  ];

  for (const { name, birthday, salary } of employees) {
    await db.query('INSERT INTO employees (name, birthday, salary) VALUES ($1, $2, $3)', [name, birthday, salary]
    )
  }
}
