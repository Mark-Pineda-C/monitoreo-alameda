import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../convex/_generated/api";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner } from "@heroui/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useTheme } from "@heroui/use-theme";
import { Logo, UserIcon, LightIcon, DarkIcon, LogoutIcon } from "./svg";
import { navigation } from "../lib/store";

export function Header() {
  const { signOut } = useAuthActions();
  const { theme, setTheme } = useTheme();
  const { isLoading, data } = useQuery(convexQuery(api.user.getUserInfo, {}));

  return (
    <header className="flex justify-between items-center p-4">
      <button type="button" onClick={() => navigation.setState(() => ({ page: "home" }))}>
        <Logo />
      </button>
      {isLoading ? (
        <Spinner size="sm" classNames={{ circle1: "border-b-emerald-500", circle2: "border-b-emerald-500" }} />
      ) : (
        <Dropdown placement="bottom-end" backdrop="blur">
          <DropdownTrigger>
            <Avatar
              isBordered
              size="sm"
              as="button"
              className="transition-transform"
              name={data?.name}
              classNames={{
                base: "ring-emerald-500 dark:ring:emerald-400",
              }}
            />
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Acciones del perfil"
            onAction={async (key) => {
              switch (key.toString()) {
                case "logout":
                  await signOut();
                  return;
                case "change-theme":
                  setTheme(theme === "light" ? "dark" : "light");
                  return;
                case "profile":
                  navigation.setState(() => ({ page: "profile" }));
                  return;
                default:
                  console.log(key);
                  return;
              }
            }}
          >
            <DropdownItem key="profile" endContent={<UserIcon className="text-emerald-600 dark:text-emerald-500" />}>
              Perfil
            </DropdownItem>
            <DropdownItem
              key="change-theme"
              endContent={
                theme === "light" ? (
                  <LightIcon className="text-emerald-600 dark:text-emerald-500" />
                ) : (
                  <DarkIcon className="text-emerald-600 dark:text-emerald-500" />
                )
              }
            >
              Cambiar Tema
            </DropdownItem>
            <DropdownItem key="logout" endContent={<LogoutIcon className="text-emerald-600 dark:text-emerald-500" />}>
              Salir
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </header>
  );
}
