import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY,
);
