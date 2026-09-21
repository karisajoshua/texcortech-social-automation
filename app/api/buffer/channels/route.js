const ENDPOINT = "https://api.buffer.com";

export async function GET() {
  const token = process.env.BUFFER_ACCESS_TOKEN;
  if (!token) {
    return Response.json(
      { ok: false, stage: "configuration", error: "BUFFER_ACCESS_TOKEN is not configured in this deployment." },
      { status: 500 }
    );
  }

  try {
    const query = `query GetOrganizations { account { organizations { id name } } }`;
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
      cache: "no-store",
    });

    const raw = await response.text();
    let data;
    try { data = JSON.parse(raw); } catch { data = { raw: raw.slice(0, 500) }; }

    if (!response.ok) {
      return Response.json(
        { ok: false, stage: "buffer", bufferStatus: response.status, response: data },
        { status: 502 }
      );
    }

    if (data?.errors?.length) {
      return Response.json(
        { ok: false, stage: "buffer-graphql", errors: data.errors },
        { status: 502 }
      );
    }

    return Response.json({ ok: true, buffer: data });
  } catch (error) {
    return Response.json(
      { ok: false, stage: "network", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 502 }
    );
  }
}
