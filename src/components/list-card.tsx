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
import { useMutation as useCMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { fetchStorageUrl } from "../lib/utils";
import { ConvexImage } from "./convex-image";

declare class ImageCapture {
  constructor(videoTrack?: MediaStreamTrack);
  takePhoto(photoSettings?: PhotoSettings): Promise<Blob>;
}

type PhotoSettings = {
  fillLightMode?: "auto" | "off" | "flash";
  imageHeight?: number;
  imageWidth?: number;
  redEyeReduction?: boolean;
};

export function ListCard({ type, status, number, _id, current }: Doc<"parking_lot">) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [plate, setPlate] = useState(current ? current.plate : "");
  const [owner, setOwner] = useState(current ? current.name : "");
  const [photo, setPhoto] = useState<{ file: File; image: string } | null>(null);

  const generateUrl = useCMutation(api.files.generateUploadUrl);

  const {
    mutate: activateCamera,
    isPending: isCameraLoading,
    isSuccess: isCameraLoaded,
    data: stream,
    reset: resetCamera,
  } = useMutation({
    mutationKey: ["access-camera"],
    mutationFn: async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      const video = document.getElementById("camera") as HTMLVideoElement;
      video.srcObject = stream;

      return stream;
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

  const { mutate: takePhoto, isPending: isPhotoLoading } = useMutation({
    mutationKey: ["take-photo"],
    mutationFn: async () => {
      const frame = stream?.getVideoTracks()[0];
      const capture = new ImageCapture(frame);
      const blob = await capture.takePhoto();
      const file = new File([blob], `${_id}.jpg`, { type: "image/jpeg" });

      return { file, image: URL.createObjectURL(blob) };
    },
    onSuccess: (data) => {
      setPhoto(data);
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setPhoto(null);
      resetCamera();
    }
  }, [isOpen]);

  return (
    <>
      <Card shadow="none" className="bg-emerald-500/15 w-full min-h-24 p-0" isPressable onPress={onOpen}>
        {status === "EMPTY" ? (
          <div className="w-full h-24 grid place-items-center">
            <p className="text-7xl font-black text-emerald-500/25">
              {type === "CAR" ? "E" : "EM"}-{number}
            </p>
          </div>
        ) : (
          <CardBody className="flex flex-row items-center gap-2 p-0">
            <div className="flex-1 pl-4">
              <p className="text-emerald-700/50 font-black">
                {type === "CAR" ? "E" : "EM"}-{number}
              </p>
              <p className="text-xl font-bold leading-none">{current?.plate}</p>
              <p className="text-lg leading-none line-clamp-1">{current?.name}</p>
            </div>
            <div className="h-24 w-36 relative">
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-emerald-500/15 to-transparent z-20" />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-background to-transparent z-10" />
              <ConvexImage src={current?.photo!} />
            </div>
          </CardBody>
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
                    } else {
                      takePhoto();
                    }
                  }}
                >
                  <CardBody className="grid place-items-center relative" id="camera-container">
                    {isPhotoLoading && (
                      <div className="absolute inset-0 grid place-items-center bg-black/50 z-20">
                        <Spinner
                          size="lg"
                          classNames={{ circle1: "border-b-emerald-500", circle2: "border-b-emerald-500" }}
                        />
                      </div>
                    )}
                    {photo && (
                      <img
                        src={photo.image}
                        alt="Foto del vehículo"
                        className="absolute inset-0 w-full h-full object-cover z-30"
                      />
                    )}
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
                  onPress={async () => {
                    try {
                      const postUrl = await generateUrl();
                      const result = await fetchStorageUrl({
                        postUrl,
                        contentType: "image/jpeg",
                        file: photo?.file,
                      });
                      setParkingLotStatus({ lot_id: _id, plate, status: "PARKED", owner, photo: result.storageId });
                    } catch (error) {
                      toast.error(current ? "Error al actualizar vehículo" : "Error al registrar vehículo");
                    }
                  }}
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
