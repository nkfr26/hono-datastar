import { html } from 'hono/html'
import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          src="https://cdn.jsdelivr.net/npm/htmx.org@4.0.0"
          integrity="sha384-BvJpBiO8Kh31EqtJe5DRIeWrHWnCGkwytKs9NKFi86Hhw96dEqdEMzZDeK9iEGTc"
          crossorigin="anonymous"
        ></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Hono + htmx</title>
      </head>
      <body>
        <div class="p-4">
          <h1 class="text-4xl font-bold mb-4"><a href="/">Todo</a></h1>
          ${children}
        </div>
      </body>
    </html>
  `
})

export const AddTodo = () => (
  <form
    hx-post="/todo"
    hx-target="#todo"
    hx-swap="append"
    {...{
      "hx-status:4xx": "swap:none",
      "hx-on::after:request": "this.reset()",
    }}
    class="mb-4"
  >
    <div class="mb-2">
      <input name="title" type="text" required class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5" />
    </div>
    <button class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2 text-center" type="submit">
      Submit
    </button>
  </form>
)

export const Item = ({ title, id }: { title: string; id: string }) => (
  <p class="flex row items-center justify-between py-1 px-4 my-1 rounded-lg text-lg border bg-gray-100 text-gray-600 mb-2">
    {title}
    <button
      hx-delete={`/todo/${id}`}
      hx-target="closest p"
      hx-swap="delete"
      class="font-medium"
    >
      Delete
    </button>
  </p>
)
