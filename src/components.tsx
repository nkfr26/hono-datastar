import { html } from 'hono/html'
import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return html`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="module" src="https://cdn.jsdelivr.net/gh/starfederation/datastar@v1.0.4/bundles/datastar.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Hono + Datastar</title>
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
  <form data-on:submit="@post('/todo')" class="mb-4">
    <div class="mb-2">
      <input data-bind="title" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5" />
    </div>
    <button class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2 text-center" type="submit">
      Submit
    </button>
  </form>
)

export const Item = ({ title, id }: { title: string; id: string }) => (
  <p
    id={`todo-${id}`}
    class="flex row items-center justify-between py-1 px-4 my-1 rounded-lg text-lg border bg-gray-100 text-gray-600 mb-2"
  >
    {title}
    <button data-on:click={`@delete('/todo/${id}')`} class="font-medium">Delete</button>
  </p>
)
