import { useStore } from "@tanstack/react-store";
import { Header } from "../components/header";
import { navigation } from "../lib/store";
import { Home } from "./dashboard/home";
import { Profile } from "./dashboard/profile";
import { AnimatePresence } from "framer-motion";
import { List } from "./dashboard/list";

export function DashboardLayout() {
  const page = useStore(navigation, (state) => state.page);
  return (
    <div className="min-h-dvh w-full h-full">
      <Header />
      <section className="container mx-auto p-4 h-[calc(100dvh-72px)] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {page === "home" && <Home />}
          {page === "profile" && <Profile />}
          {page === "list" && <List />}
        </AnimatePresence>
      </section>
    </div>
  );
}
