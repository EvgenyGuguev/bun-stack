export const BaseHtml = (content: any) => (
<html lang="ru">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/htmx.org@1.9.5"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
        <link href="/styles.css" rel="stylesheet" />
        <title>BUN HTMX</title>
    </head>
    <body class="flex flex-col w-full h-screen items-center">
        <header class="flex" hx-boost="true">
            <a href="/" class="mr-4">Go Home</a>
            <a href="/users" class="mr-4" >Users List</a>
        </header>
        { content }
    </body>
</html>
)