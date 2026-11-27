import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/auth/actions";
import { requireUser } from "@/lib/auth/dal";

async function UserBar() {
  const user = await requireUser();
  return (
    <form action={signOut} className="flex items-center gap-3">
      <span className="text-muted-foreground text-sm">{user.email}</span>
      <Button type="submit" variant="outline" size="sm">
        Sign out
      </Button>
    </form>
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Crystal</h1>
      <p className="text-muted-foreground max-w-md">
        Learn by explaining. The AI asks the questions.
      </p>
      <Suspense fallback={null}>
        <UserBar />
      </Suspense>
    </main>
  );
}
