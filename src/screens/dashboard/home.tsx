import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { MotionScreen } from "../../components/motion-screen";
import { ArrowLeftIcon, ArrowRightIcon, EntrysExitsIcon, SearchIcon } from "../../components/svg";
import { navigation } from "../../lib/store";

export function Home() {
  return (
    <MotionScreen keyLabel="home">
      <div className="flex flex-col gap-6">
        <Input
          placeholder="Buscar estacionamientos, placas o propietarios"
          startContent={<SearchIcon className="text-emerald-500 dark:text-emerald-400 text-sm" />}
        />
        <Card shadow="none" isPressable className="bg-emerald-500/10">
          <CardHeader className="flex items-center justify-between">
            <p>Ultimas entradas/salidas</p>
            <EntrysExitsIcon className="text-emerald-500 dark:text-emerald-400 text-sm" />
          </CardHeader>
          <CardBody className="flex flex-col gap-2">
            {[
              {
                plate: "ABC-123",
                park_lot: "E-32",
                owner: "Juan Perez",
                type: "exit",
                time: "hace 3 minutos",
              },
              {
                plate: "DFE-353",
                park_lot: "EM-12",
                owner: "Carlos Gomez Peralta",
                type: "entry",
                time: "hace 1 hora",
              },
              {
                plate: "ABC-123",
                park_lot: "E-32",
                owner: "Juan Perez",
                type: "entry",
                time: "hace 3 hora",
              },
            ].map((item, index) => (
              <div className="bg-background rounded-lg p-2 flex items-center gap-6" key={`entry-exit-${index}`}>
                <div className="flex items-center gap-1 min-w-[72px]">
                  {item.type === "exit" ? (
                    <ArrowLeftIcon className="text-emerald-500 dark:text-emerald-400 text-sm" />
                  ) : (
                    <ArrowRightIcon className="text-emerald-500 dark:text-emerald-400 text-sm" />
                  )}
                  <span>{item.park_lot}</span>
                </div>
                <div className="text-start flex-1">
                  <p className="text-xs opacity-50 leading-tight">{item.plate}</p>
                  <p className="leading-tight line-clamp-1">{item.owner}</p>
                </div>
                <span className="text-xs opacity-50 h-full w-max text-nowrap">{item.time}</span>
              </div>
            ))}
          </CardBody>
        </Card>
        <Button onPress={() => navigation.setState(() => ({ page: "list" }))}>Registro Manual</Button>
      </div>
    </MotionScreen>
  );
}
