import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import PWABadge from "./PWABadge.tsx";
import { SignIn } from "./screens/sign-in.tsx";
import { Toaster } from "react-hot-toast";
import { DashboardLayout } from "./screens/dashboard.tsx";

function App() {
  return (
    <main className="bg-background text-foreground">
      <AuthLoading>
        <div className="min-h-dvh bg-gradient-to-b from-emerald-400 to-teal-600 p-6 flex items-center justify-center relative overflow-hidden">
          <div className="honeycomb">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </AuthLoading>
      <Unauthenticated>
        <SignIn />
      </Unauthenticated>
      <Authenticated>
        <DashboardLayout />
      </Authenticated>
      <PWABadge />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 1000,
        }}
      />
    </main>
  );
}

export default App;
