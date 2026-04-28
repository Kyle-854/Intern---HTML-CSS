import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

serve(async (req) => {

  // ✅ xử lý preflight request (CORS)
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
      },
    });
  }

  const { email } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data } = await supabase
    .from("users")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  return new Response(
    JSON.stringify({ exists: !!data }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // 🔥 QUAN TRỌNG
      },
    }
  );
});