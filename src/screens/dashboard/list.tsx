import { useQuery } from "@tanstack/react-query";
import { MotionScreen } from "../../components/motion-screen";
import { convexQuery } from "@convex-dev/react-query";
import { Card, CardBody, CardHeader, Pagination, ScrollShadow, Spinner, Tab, Tabs } from "@heroui/react";
import { useDeferredValue, useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { ListCard } from "../../components/list-card";

export function List() {
  const [selected, setSelected] = useState<"CAR" | "BIKE">("CAR");
  const [currentPage, setCurrentPage] = useState(1);
  const deferredType = useDeferredValue<"CAR" | "BIKE">(selected);
  const { isLoading, data, isSuccess } = useQuery(
    convexQuery(api.parking_lots.listParkingLots, { type: deferredType }),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selected, deferredType]);

  return (
    <MotionScreen keyLabel="list">
      <div className="flex flex-col items-center gap-4 overflow-hidden">
        <Tabs
          aria-label="ParkingLot Types"
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(key as "CAR" | "BIKE")}
          className="w-full grid place-items-center"
        >
          <Tab key="CAR" title="Est. Regular" />
          <Tab key="BIKE" title="Est. de Motos" />
        </Tabs>
        {isLoading && (
          <Spinner size="lg" classNames={{ circle1: "border-b-emerald-500", circle2: "border-b-emerald-500" }} />
        )}
        {isSuccess && !data?.length && <p>No hay estacionamientos</p>}
        {isSuccess && data?.length && (
          <>
            <ScrollShadow
              className="space-y-6 h-[calc(100dvh-72px-40px-52px-16px-16px-16px)] w-full py-4 px-2"
              hideScrollBar
            >
              {[...data].slice((currentPage - 1) * 10, currentPage * 10).map((lot) => (
                <ListCard {...lot} key={lot._id} />
              ))}
            </ScrollShadow>
            <Pagination
              showControls
              initialPage={currentPage}
              onChange={setCurrentPage}
              total={Math.ceil(data.length / 10)}
              size="sm"
              classNames={{
                cursor: "bg-gradient-to-br from-emerald-600 to-teal-500",
              }}
            />
          </>
        )}
      </div>
    </MotionScreen>
  );
}
