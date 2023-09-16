import {Elysia, t} from "elysia";
import {html} from '@elysiajs/html'
import {UsersList} from "./main/views/UsersList";
import {HomePage} from "./main/views/Home";
import {cookie} from '@elysiajs/cookie'
import {jwt} from '@elysiajs/jwt'
import {Profile} from "./auth/views/Profile";
import {LoginPage} from "./auth/views/Login";
import {db} from "../db";
import {RegisterPage} from "./auth/views/Register";
import {users} from "../db/schema";

/*
TODO:
- регистрация
- страницы регистрации, входа, выхода, информации о пользователе
 */

const app = new Elysia()
    .use(html)
    .use(
        jwt({
            name: 'jwt',
            secret: 'secret'
        })
    )
    .use(cookie())
    .get("/styles.css", () => Bun.file("./src/main/styles/output-tailwind.css"));

app.post('/register', async ({body}) => {
    await db.insert(users).values({...body});
    return 'Register success!';
}, {
    body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
    })
})

app.post('/sign', async ({jwt, cookie, setCookie, body}) => {
    setCookie('auth', await jwt.sign({...body}), {
        httpOnly: true,
        maxAge: 7 * 86400,
    })
    return 'Success!';
}, {
    body: t.Object({
        name: t.String(),
    })
});

app.get('/profile', async ({jwt, set, cookie: {auth}}) =>
    Profile(jwt, set, auth)
);

app.get('/logout', ({cookie, setCookie}) => {
    setCookie('auth', '', {
        maxAge: 0,
    })
    return 'You are logged out!';
});

app.get("/", HomePage);
app.get("/register-page", RegisterPage);
app.get("/login-page", LoginPage);
app.get("/users-page", () => UsersList(db));


// await db.insert(users).values({name: 'Test1', email: 'test1@mail.ru'});

app.listen(3000);