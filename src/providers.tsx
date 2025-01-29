import { HeroUIProvider } from "@heroui/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<HeroUIProvider>
			<ConvexProvider client={convex}>{children}</ConvexProvider>
		</HeroUIProvider>
	);
}
