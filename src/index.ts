import { Elysia, t } from "elysia";
import { html } from '@elysiajs/html'
import { UsersList } from "./main/views/UsersList";
import { HomePage } from "./main/views/Home";
import { cookie } from '@elysiajs/cookie'
import { jwt } from '@elysiajs/jwt'
import {Profile} from "./auth/views/Profile";
import { LoginPage } from "./auth/views/Login";

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
    .post('/sign', async ({ jwt, cookie, setCookie, body }) => {
        setCookie('auth', await jwt.sign({...body}), {
            httpOnly: true,
            maxAge: 7 * 86400,
        })
        return 'Success!';
    }, {
        body: t.Object({
            username: t.String(),
        })
    })
    .get('/profile', async ({ jwt, set, cookie: { auth } }) => {
        return Profile(jwt, set, auth);
    })
    .get('/logout', ({ cookie, setCookie }) => {
        setCookie('auth', '', {
            maxAge: 0,
        })
    })
    .get("/styles.css", () => Bun.file("./src/main/styles/output-tailwind.css"));

app.get("/",  HomePage);
app.get("/login",  LoginPage);
app.get("/users",  UsersList);


// await db.insert(users).values({name: 'Test1', email: 'test1@mail.ru'});

app.listen(3000);