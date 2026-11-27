"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

type Provider = "github" | "google";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const searchParams = useSearchParams();
  const hasError = searchParams.get("error") !== null;

  useEffect(() => {
    if (hasError) toast.error("Sign-in failed. Please try again.");
  }, [hasError]);

  async function sendMagicLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setPending(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSentTo(email);
  }

  async function signInWith(provider: Provider) {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) toast.error(error.message);
  }

  if (sentTo) {
    return (
      <p className="text-muted-foreground text-sm">
        We sent a sign-in link to <strong>{sentTo}</strong>. Open it on this
        device to continue.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={sendMagicLink} className="flex flex-col gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" disabled={pending}>
          {pending ? "Sending…" : "Email me a sign-in link"}
        </Button>
      </form>
      <div className="text-muted-foreground flex items-center gap-3 text-xs">
        <span className="bg-border h-px flex-1" />
        or
        <span className="bg-border h-px flex-1" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={() => signInWith("github")}>
          GitHub
        </Button>
        <Button variant="outline" onClick={() => signInWith("google")}>
          Google
        </Button>
      </div>
    </div>
  );
}
