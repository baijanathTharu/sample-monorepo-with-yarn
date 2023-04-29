import Head from "next/head";
import { useEffect, useRef, useState } from "react";

async function pingBackend(): Promise<{ message: string }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ping`);
  const data = await res.json();
  return data;
}
async function getTodos(): Promise<{ id: number; title: string }[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos`);
  const data = await res.json();
  return data;
}
async function deleteTodo(id: number): Promise<{ message: string }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${id}`,
    {
      method: "DELETE",
    }
  );
  const data = await res.json();
  return data;
}
async function createTodo(
  title: string
): Promise<{ id: number; title: string }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos`, {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export default function Home() {
  const [ping, setPing] = useState<null | { message: string }>(null);
  const [todos, setTodos] = useState<{ id: number; title: string }[]>([]);

  const [toggle, setToggle] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos().then((d) => setTodos(d));
  }, [toggle]);

  const refetchTodos = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <Head>
        <title>Frontend</title>
        <meta name="description" content="Frontend Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1>Hello, from frontend</h1>
        <div>
          <button
            style={{
              marginRight: "10px",
            }}
            onClick={async () => {
              const data = await pingBackend();
              setPing(data);
            }}
          >
            Ping Backend
          </button>
          <span>
            {ping?.message ? `Message from backend: ${ping.message}` : null}
          </span>
        </div>

        <div>
          <h2>Create Todos</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);

              const title = (formData.get("title") as string) || "";
              await createTodo(title);
              refetchTodos();

              if (titleRef.current) {
                titleRef.current.value = "";
              }
            }}
          >
            <label htmlFor="title">
              Title
              <input type="text" name="title" ref={titleRef} />
            </label>

            <input type="submit" name="create" />
          </form>
        </div>

        <div>
          <h2>List of Todos</h2>
          {todos.map((todo) => {
            return (
              <div key={todo.id}>
                {todo.title}{" "}
                <button
                  onClick={async () => {
                    await deleteTodo(todo.id);
                    refetchTodos();
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
