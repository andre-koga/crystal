import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Authoritative session check: asks the Supabase Auth server, not just the cookie.
// Every server action, route handler and page that touches user data must call this.
export async function requireUser() {
  // The Supabase client reads the clock while loading the session, which Next
  // does not allow during prerendering. Wait for a real request first.
  await connection();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/login");
  }
  return data.user;
}
