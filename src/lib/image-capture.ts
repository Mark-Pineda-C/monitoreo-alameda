export declare class ImageCapture {
  constructor(videoTrack?: MediaStreamTrack);
  takePhoto(photoSettings?: PhotoSettings): Promise<Blob>;
}

type PhotoSettings = {
  fillLightMode?: "auto" | "off" | "flash";
  imageHeight?: number;
  imageWidth?: number;
  redEyeReduction?: boolean;
};
