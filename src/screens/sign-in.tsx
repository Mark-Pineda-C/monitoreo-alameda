import { useAuthActions } from "@convex-dev/auth/react";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Checkbox } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { EmailIcon, EyeClosedIcon, EyeIcon, PasswordIcon } from "../components/svg";
import { useState } from "react";

export function SignIn() {
  const { signIn } = useAuthActions();
  const [isVisible, setIsVisible] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (formData: FormData) => {
      const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };
      if (!data.email) {
        throw new Error("El correo electrónico es requerido");
      }
      if (!data.password) {
        throw new Error("La contraseña es requerida");
      }
      await signIn("password", formData);
    },
    onError: (error) => {
      if (error.message.match("InvalidAccountId")) {
        return toast.error("El usuario no existe");
      }
      toast.error(error.message);
    },
  });

  return (
    <div className="min-h-dvh bg-gradient-to-b from-emerald-400 to-teal-600 p-6 flex items-center justify-center relative overflow-hidden">
      {/* SVG Decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <svg
          className="absolute top-0 left-0 opacity-10 text-background"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M42.7,-62.9C50.9,-52.8,50.1,-34.4,51.7,-19.1C53.4,-3.8,57.4,8.3,55.7,20.9C54,33.5,46.5,46.6,35.2,54.9C23.9,63.2,8.7,66.7,-5.4,64.1C-19.5,61.6,-38.9,53,-54.4,39.5C-69.9,26,-81.4,7.7,-79.2,-8.8C-77,-25.3,-61,-40,-45.1,-50C-29.2,-60,-14.6,-65.3,2.4,-68.7C19.4,-72,38.8,-73.4,42.7,-62.9Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute bottom-0 right-0 opacity-10 text-background"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M39.5,-48.4C51.9,-39.8,63,-27.5,65.7,-13.1C68.4,1.3,62.7,17.7,53.8,31.3C44.9,44.9,32.8,55.7,17.7,62.3C2.7,68.9,-15.3,71.3,-31.4,65.7C-47.5,60.1,-61.7,46.5,-69.1,29.6C-76.5,12.7,-77.1,-7.5,-70.3,-24.4C-63.5,-41.3,-49.3,-54.8,-34.4,-62.4C-19.5,-70,-9.7,-71.6,2.4,-74.7C14.6,-77.8,29.1,-82.3,39.5,-48.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <Card
        as="form"
        action={mutate}
        className="w-full max-w-md bg-background/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 relative overflow-visible text-foreground"
      >
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
        </div>
        <CardHeader className="text-center flex-col">
          <h2 className="text-3xl font-bold text-foreground">Bienvenido</h2>
          <p className="text-foreground/80 mt-2">Inicia sesión para continuar</p>
        </CardHeader>
        <CardBody className="space-y-4 p-0 overflow-visible">
          <input type="hidden" name="flow" value="signUp" />
          <Input
            classNames={{
              inputWrapper: "after:bg-gradient-to-r after:from-emerald-400 after:to-teal-600",
            }}
            variant="underlined"
            startContent={<EmailIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />}
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            name="email"
          />
          <Input
            classNames={{
              inputWrapper: "after:bg-gradient-to-r after:from-emerald-400 after:to-teal-600",
            }}
            variant="underlined"
            startContent={<PasswordIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />}
            label="Contraseña"
            placeholder="••••••••"
            name="password"
            type={isVisible ? "text" : "password"}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <EyeIcon className="text-emerald-500 dark:text-emerald-400 pointer-events-none" />
                ) : (
                  <EyeClosedIcon className="text-emerald-500 dark:text-emerald-400 pointer-events-none" />
                )}
              </button>
            }
          />
        </CardBody>
        <CardFooter className="p-0 flex-col gap-4 overflow-visible">
          <div className="flex items-center justify-between w-full">
            <Checkbox
              size="sm"
              classNames={{ wrapper: "after:bg-gradient-to-br after:from-emerald-400 after:to-teal-600" }}
            >
              Recordarme
            </Checkbox>
            <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-400 to-teal-600 text-white font-semibold"
            isLoading={isPending}
          >
            Iniciar sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
