import {Elysia, t} from "elysia";
import {sql} from "drizzle-orm";
import {connection} from "../../db";
import {RegisterPage} from "./views/Register";
import {User, users} from "../../db/schema";
import {jwt} from "@elysiajs/jwt";
import {LoginPage} from "./views/Login";
import {Profile} from "./views/Profile";

export const authRoute = new Elysia({ prefix: '/auth' })
    .decorate('db', connection)
    .use(
        jwt({
            name: 'jwt',
            secret: 'secret'
        })
    )
    .post('/register', async ({body, db}) => {
        // await db.insert(users).values({...body});
        await db.execute(sql`insert into users (name, email, password) values (${body.name}, ${body.email}, ${body.password})`);
        return 'Register success!';
    }, {
        body: t.Object({
            name: t.String(),
            email: t.String(),
            password: t.String(),
        })
    })
    .get("/register", RegisterPage)
    .post('/sign', async ({jwt, cookie: {auth}, body, db}) => {
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
    })
    .get("/login", LoginPage)
    .get('/profile', async ({jwt, set, cookie: {auth}}) =>
        Profile(jwt, set, auth.value)
    )
    .get('/logout', ({cookie: {auth}}) => {
        auth.value = '';
        auth.maxAge = 0;
        return 'You are logged out!';
    });

