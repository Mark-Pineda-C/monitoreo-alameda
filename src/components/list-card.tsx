import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { Doc } from "../../convex/_generated/dataModel";
import { CameraIcon } from "./svg";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";
import { useState } from "react";

export function ListCard({ type, status, number, _id, current }: Doc<"parking_lot">) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [plate, setPlate] = useState(current ? current.plate : "");
  const [owner, setOwner] = useState(current ? current.name : "");

  const {
    mutate: activateCamera,
    isPending: isCameraLoading,
    isSuccess: isCameraLoaded,
  } = useMutation({
    mutationKey: ["access-camera"],
    mutationFn: async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      const video = document.getElementById("camera") as HTMLVideoElement;
      video.srcObject = stream;
    },
  });

  const { mutate: setParkingLotStatus, isPending: isParkingLotStatusLoading } = useMutation({
    mutationFn: useConvexMutation(api.parking_lots.setParkingLotStatus),
    onSuccess: () => {
      toast.success("Vehículo registrado correctamente");
      onClose();
    },
    onError: () => {
      toast.error("Error al registrar vehículo");
    },
  });

  return (
    <>
      <Card shadow="none" className="bg-emerald-500/15 w-full min-h-24" isPressable onPress={onOpen}>
        {status === "EMPTY" ? (
          <div className="w-full h-24 grid place-items-center">
            <p className="text-7xl font-black text-emerald-500/25">
              {type === "CAR" ? "E" : "EM"}-{number}
            </p>
          </div>
        ) : (
          <CardHeader>
            {type === "CAR" ? "E" : "EM"}-{number}
          </CardHeader>
        )}
      </Card>
      <Drawer isOpen={isOpen} placement="bottom" onOpenChange={onOpenChange} size="lg">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader>{current ? "Actualizar registro" : "Registrar vehículo"}</DrawerHeader>
              <DrawerBody>
                <Card
                  shadow="none"
                  className="bg-default-100 min-h-52"
                  isPressable
                  onPress={() => {
                    if (!isCameraLoaded) {
                      activateCamera();
                    }
                  }}
                >
                  <CardBody className="grid place-items-center relative" id="camera-container">
                    <video
                      id="camera"
                      className={`absolute inset-0 w-full h-full object-cover duration-300 ${isCameraLoaded ? "opacity-100" : "opacity-0"}`}
                      autoPlay
                      playsInline
                    ></video>
                    {isCameraLoading ? (
                      <Spinner
                        size="lg"
                        classNames={{ circle1: "border-b-emerald-500", circle2: "border-b-emerald-500" }}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <CameraIcon className="text-4xl text-emerald-500 dark:text-emerald-400" />
                        <p className="text-emerald-500 dark:text-emerald-400">Tomar foto</p>
                      </div>
                    )}
                  </CardBody>
                </Card>
                <Input label="Placa" value={plate} onValueChange={setPlate} isRequired />
                <Input label="Propietario" value={owner} onValueChange={setOwner} />
              </DrawerBody>
              <DrawerFooter>
                <Button onPress={onClose}>Cancelar</Button>
                <Button
                  isLoading={isParkingLotStatusLoading}
                  onPress={() => setParkingLotStatus({ lot_id: _id, plate, status: "PARKED", owner })}
                >
                  {isParkingLotStatusLoading
                    ? current
                      ? "Actualizando"
                      : "Registrando"
                    : current
                      ? "Actualizar "
                      : "Registrar"}
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
