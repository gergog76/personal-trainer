import { getStore } from "@netlify/blobs";
import seed from "./_seed-data.mjs";

const STORE_NAME = "derekbarat-adatok";
const KEY = "trainings";
const jsonHeaders = { "content-type": "application/json; charset=utf-8" };

// A szerkesztő jelszava. Szerver oldalon fut, a böngészőnek soha nem
// küldjük el - nem publikus, még ha a forráskód a deploy csomagban van is.
// GitHub-alapú deploy-nál az env var megbízhatóan működik (a korábbi
// drag-and-drop deploy idején tapasztalt megbízhatatlanság miatt volt
// korábban ide hardcode-olva - lásd git history).
const EDIT_TOKEN = process.env.EDIT_TOKEN;

export default async (req, context) => {
  if (!EDIT_TOKEN) {
    return new Response(
      JSON.stringify({ error: "Szerver konfigurációs hiba: EDIT_TOKEN env var hiányzik." }),
      { status: 500, headers: jsonHeaders }
    );
  }

  if (req.method === "PUT" || req.method === "POST") {
    const token = (req.headers.get("x-edit-token") || "").trim();
    if (token !== EDIT_TOKEN) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: jsonHeaders,
      });
    }
  } else if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const store = getStore(STORE_NAME);

  if (req.method === "GET") {
    let data = await store.get(KEY, { type: "json" });
    if (!data) {
      await store.setJSON(KEY, seed);
      data = seed;
    }
    return new Response(JSON.stringify(data), { headers: jsonHeaders });
  }

  {
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: jsonHeaders,
      });
    }

    if (!body || typeof body !== "object" || !body.exercises || !body.programs) {
      return new Response(
        JSON.stringify({ error: "Hiányzó 'exercises' vagy 'programs' mező" }),
        { status: 400, headers: jsonHeaders }
      );
    }

    await store.setJSON(KEY, body);
    return new Response(JSON.stringify({ ok: true }), { headers: jsonHeaders });
  }
};

export const config = {
  path: "/api/trainings",
};
