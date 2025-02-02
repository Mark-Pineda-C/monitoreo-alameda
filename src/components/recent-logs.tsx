import { Card, CardHeader, CardBody, Spinner } from "@heroui/react";
import { EntrysExitsIcon, ArrowLeftIcon, ArrowRightIcon } from "./svg";
import { api } from "../../convex/_generated/api";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import moment from "moment";

moment.locale("es");

export function RecentLogs() {
  const { data, isLoading, isSuccess } = useQuery(convexQuery(api.parking_history.getRecentLogs, {}));
  return (
    <Card shadow="none" isPressable className="bg-emerald-500/10">
      <CardHeader className="flex items-center justify-between">
        <p>Ultimas entradas/salidas</p>
        <EntrysExitsIcon className="text-emerald-500 dark:text-emerald-400 text-sm" />
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        {isLoading && (
          <div className="w-full h-full grid place-items-center">
            <Spinner size="md" classNames={{ circle1: "border-b-emerald-500", circle2: "border-b-emerald-500" }} />
          </div>
        )}
        {isSuccess &&
          data.map((log) => (
            <div className="bg-background rounded-lg p-2 flex items-center gap-6" key={`entry-exit-${log._id}`}>
              <div className="flex items-center gap-1 min-w-[72px]">
                {log.type === "EXIT" ? (
                  <ArrowLeftIcon className="text-emerald-500 dark:text-emerald-400 text-sm" />
                ) : (
                  <ArrowRightIcon className="text-emerald-500 dark:text-emerald-400 text-sm" />
                )}
                <span>{log.parking_lot_number}</span>
              </div>
              <div className="text-start flex-1">
                <p className="text-xs opacity-50 leading-tight">{log.plate}</p>
                <p className="leading-tight line-clamp-1">{log.owner}</p>
              </div>
              <span className="text-xs opacity-50 h-full w-max text-nowrap">{moment(log._creationTime).fromNow()}</span>
            </div>
          ))}
      </CardBody>
    </Card>
  );
}
