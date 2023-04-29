import Head from "next/head";
import { useState } from "react";

async function pingBackend(): Promise<{ message: string }> {
  const res = await fetch(`http://localhost:8080/ping`);
  const data = await res.json();
  return data;
}

export default function Home() {
  const [data, setData] = useState<null | { message: string }>(null);

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
            onClick={async () => {
              const data = await pingBackend();
              setData(data);
            }}
          >
            Ping Backend
          </button>
        </div>
        {data?.message ? `Message from backend: ${data.message}` : null}
      </main>
    </>
  );
}
