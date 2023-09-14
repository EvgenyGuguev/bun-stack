import { Elysia } from "elysia";
import { html } from '@elysiajs/html'
import { UsersList } from "./main/views/UsersList";
import { HomePage } from "./main/views/Home";

const app = new Elysia()
    .use(html)
    .get("/styles.css", () => Bun.file("./src/main/styles/output-tailwind.css"));

app.get("/",  HomePage);
app.get("/users",  UsersList);


// await db.insert(users).values({name: 'Test1', email: 'test1@mail.ru'});

app.listen(3000);
