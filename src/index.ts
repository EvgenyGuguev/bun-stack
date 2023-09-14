import { Elysia } from "elysia";
import { db } from "../db";
import { sql } from "drizzle-orm";
import { users, User } from "../db/schema";

const app = new Elysia();

app.get("/", () => Bun.env.DB_URL!);
  

// await db.insert(users).values({name: 'Test1', email: 'test1@mail.ru'});

const usersQuery = await db.execute(sql`select * from ${users}`);
const usersArr: User[] = usersQuery.rows;
console.log(usersArr)

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
