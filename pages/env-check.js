export default function EnvCheck() {
  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>SPM Env Check</h1>

      <p>
        Supabase URL:{" "}
        {process.env.NEXT_PUBLIC_SUPABASE_URL ? "FOUND" : "MISSING"}
      </p>

      <p>
        Supabase anon key:{" "}
        {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "FOUND" : "MISSING"}
      </p>
    </main>
  );
}
