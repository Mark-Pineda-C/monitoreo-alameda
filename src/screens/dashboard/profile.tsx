import { useQuery } from "convex/react";
import { MotionScreen } from "../../components/motion-screen";
import { api } from "../../../convex/_generated/api";
import { Card, CardBody, CardHeader } from "@heroui/react";

export function Profile() {
  const lots = useQuery(api.parking_lots.listParkingLotForPdf);
  return (
    <MotionScreen keyLabel="profile">
      <div className="w-full h-dvh bg-background absolute inset-0 p-4 z-10 space-y-6">
        <h2 className="text-2xl font-bold">Lista de Estacionamientos</h2>
        <div className="grid grid-cols-3 gap-4">
          {lots?.map((lot) => (
            <Card key={lot._id} className="flex flex-col gap-2 p-4 relative">
              <CardHeader className="p-0">
                Estacionamiento {lot.type === "CAR" ? `E-${lot.number}` : `EM-${lot.number}`}
              </CardHeader>
              <CardBody className="p-0">
                {lot.defined_client ? (
                  <p className="text-sm line-clamp-1 w-1/2">{lot.defined_client?.department}</p>
                ) : (
                  <p className="text-sm line-clamp-1 w-1/2">BESCO</p>
                )}
                {lot.current?.plate && <p>{lot.current?.plate}</p>}
              </CardBody>
              {lot.current?.photo && (
                <img src={lot.current.photo} alt="photo" className="absolute top-0 right-0 w-1/2 h-full object-cover" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </MotionScreen>
  );
}
