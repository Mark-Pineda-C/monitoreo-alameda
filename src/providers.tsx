import { HeroUIProvider } from "@heroui/react";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>
    </HeroUIProvider>
  );
}
