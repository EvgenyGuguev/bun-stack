import {Elysia, t} from "elysia";
import {html} from '@elysiajs/html'
import {UsersList} from "./main/views/UsersList";
import {HomePage} from "./main/views/Home";
import {jwt} from '@elysiajs/jwt'
import {Profile} from "./auth/views/Profile";
import {LoginPage} from "./auth/views/Login";
import {connection} from "../db";
import {RegisterPage} from "./auth/views/Register";
import {User, users} from "../db/schema";
import {sql} from "drizzle-orm";

const app = new Elysia()
    .use(html())
    .use(
        jwt({
            name: 'jwt',
            secret: 'secret'
        })
    )
    .decorate('db', connection)
    .get("/styles.css", () => Bun.file("./src/main/styles/output-tailwind.css"));

app.post('/register', async ({body, db}) => {
    await db.insert(users).values({...body});
    return 'Register success!';
}, {
    body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
    })
});
app.get("/register", RegisterPage);

app.post('/sign', async ({jwt, cookie, cookie: {auth}, body, db}) => {
    const query = await db.execute(sql`select * from ${users} where ${users.email} = ${body.email}`);
    const user: User|undefined = query.rows[0];

    if (user) {
        auth.value = await jwt.sign({email: body.email});
        auth.httpOnly = true;
        auth.maxAge = 7 * 86400;
        return `Success! You are logged in as ${body.email}`;
    } else {
        return 'User not found!'
    }

}, {
    body: t.Object({
        email: t.String(),
        password: t.String(),
    })
});
app.get("/login", LoginPage);

app.get('/profile', async ({jwt, set, cookie: {auth}}) =>
    Profile(jwt, set, auth.value)
);

app.get('/logout', ({cookie: {auth}}) => {
    auth.value = '';
    auth.maxAge = 0;
    return 'You are logged out!';
});

app.get("/", HomePage);
app.get("/users", ({db}) => UsersList(db));

app.listen(3000);