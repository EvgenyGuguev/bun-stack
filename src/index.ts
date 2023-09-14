import { Elysia } from "elysia";
import { html } from '@elysiajs/html'
import { UsersList } from "./main/views/UsersList";
import { HomePage } from "./main/views/Home";
import { cookie } from '@elysiajs/cookie'
import { jwt } from '@elysiajs/jwt'

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
    .get('/sign/:name', async ({ jwt, cookie, setCookie, params }) => {
        setCookie('auth', await jwt.sign(params), {
            httpOnly: true,
            maxAge: 7 * 86400,
        })

        return `Sign in as ${cookie.auth}`
    })
    .get('/profile', async ({ jwt, set, cookie: { auth } }) => {
        const profile = await jwt.verify(auth)

        if (!profile) {
            set.status = 401
            return 'Unauthorized'
        }

        return `Hello ${profile.name}`
    })
    .get('/logout', ({ cookie, setCookie }) => {
        setCookie('auth', '', {
            maxAge: 0,
        })
    })
    .get("/styles.css", () => Bun.file("./src/main/styles/output-tailwind.css"));

app.get("/",  HomePage);
app.get("/users",  UsersList);


// await db.insert(users).values({name: 'Test1', email: 'test1@mail.ru'});

app.listen(3000);