import { useEffect, useState } from "react";

export function useImagePreview(files: FileList | null) {
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);

  useEffect(() => {
    if (!files || files?.length == 0) return;
    const imagesPreview = Array.from(files).map((file) => URL.createObjectURL(file));
    setImagesUrl(imagesPreview);
    return () => {
      imagesUrl.forEach((image) => URL.revokeObjectURL(image));
      setImagesUrl([]);
    };
  }, [files]);

  return { imagesUrl };
}
