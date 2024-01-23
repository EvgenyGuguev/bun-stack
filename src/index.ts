import {Elysia} from "elysia";
import {html} from '@elysiajs/html';
import {UsersList} from "./main/views/UsersList";
import {HomePage} from "./main/views/Home";
import {connection} from "../db";
import {authRoute} from "./auth/plugin";

const app = new Elysia()
    .use(html())
    .decorate('db', connection)
    .get("/styles.css", () => Bun.file("./src/main/styles/output-tailwind.css"));

app.use(authRoute);
app.get("/", HomePage);
app.get("/users", ({db}) => UsersList(db));

app.listen(3000);