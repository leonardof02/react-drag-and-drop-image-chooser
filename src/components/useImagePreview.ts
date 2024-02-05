import { useEffect, useState } from "react";

export function useImagePreview(imageFiles: FileList | null) {
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);

  useEffect(() => {
    if (!imageFiles || imageFiles.length == 0) return;
    const imagesUrl = Array.from(imageFiles).map((imageFile) => URL.createObjectURL(imageFile));
    setImagesUrl(imagesUrl);
    return () => {
      imagesUrl.forEach((imageUrl) => URL.revokeObjectURL(imageUrl));
      setImagesUrl([]);
    };
  }, [imageFiles]);

  return { imagesUrl };
}
