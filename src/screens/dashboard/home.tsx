import { Button, Input } from "@heroui/react";
import { MotionScreen } from "../../components/motion-screen";
import { SearchIcon } from "../../components/svg";
import { navigation } from "../../lib/store";
import { RecentLogs } from "../../components/recent-logs";

export function Home() {
  return (
    <MotionScreen keyLabel="home">
      <div className="flex flex-col gap-6">
        <Input
          placeholder="Buscar estacionamientos, placas o propietarios"
          startContent={<SearchIcon className="text-emerald-500 dark:text-emerald-400 text-sm" />}
        />
        <RecentLogs />
        <Button onPress={() => navigation.setState(() => ({ page: "list" }))}>Registro Manual</Button>
      </div>
    </MotionScreen>
  );
}
