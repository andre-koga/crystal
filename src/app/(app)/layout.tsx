import { Suspense } from "react";
import { requireUser } from "@/lib/auth/dal";

async function AuthGate({ children }: { children: React.ReactNode }) {
  await requireUser();
  return children;
}

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <Suspense fallback={null}>
      <AuthGate>{children}</AuthGate>
    </Suspense>
  );
}
