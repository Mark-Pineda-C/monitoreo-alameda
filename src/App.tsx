import { ThemeSwitcher } from "./components/theme-switcher.tsx";
import PWABadge from "./PWABadge.tsx";

function App() {
  return (
    <main className="bg-background text-foreground">
      <div className="flex justify-center items-center h-screen">
        <h1>monitoreo de estacionamientos</h1>
        <ThemeSwitcher />
      </div>
      <PWABadge />
    </main>
  );
}

export default App;
