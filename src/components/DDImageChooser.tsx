/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState, DragEvent, ChangeEvent } from "react";
import { MdImage } from "react-icons/md";
import { useImagePreview } from "./useImagePreview";

export default function DDImageChooser() {
  const [isDragging, setDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const { imagesUrl } = useImagePreview( files );

  console.log(imagesUrl);

  function handleDragOver(event: DragEvent<HTMLInputElement>) {
    event.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLInputElement>) {
    event.preventDefault();
    setDragging(false);
    handleFiles(event.dataTransfer.files);
  }

  function handleFiles(fileList: FileList) {
    if (!fileList || !Array.from(fileList).every((file) => file.type.startsWith("image/"))) {
      setFiles(null);
      return;
    }
    setFiles(fileList);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    if (event.target?.files) handleFiles(event.target.files);
  }

  return (
    <div className="min-w-64 max-w-7xl min-h-64 bg-white shadow-xl rounded-lg p-2 flex flex-col justify-center items-center">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-4 border-dashed w-full h-full rounded-lg p-1 flex-1 flex justify-center items-center ${
          isDragging ? "text-gray-400 border-gray-400" : "text-gray-200 border-gray-200"
        }`}
      >
        {imagesUrl.length == 0 ? (
          <div className="flex justify-center items-center h-full pointer-events-none">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <MdImage size={80} />
              <label
                htmlFor="imageChooser"
                className="pointer-events-auto mt-2 bg-gray-400 text-white py-2 px-4 w-36 rounded-lg hover:brightness-110"
              >
                Seleccionar archivo
              </label>
              <input
                onChange={handleChange}
                className="hidden"
                id="imageChooser"
                type="file"
                accept="image/*"
                multiple
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center align-top flex-wrap gap-1">
            {imagesUrl.map((image, index) => (
              // eslint-disable-next-line jsx-a11y/alt-text
              <img src={image} key={index} className="aspect-video w-32 rounded-md" />
            ))}
          </div>
        )}
      </div>
      <button className="mt-2 bg-indigo-600 text-white py-2 px-4 w-full rounded-lg hover:brightness-110">
        Submit
      </button>
    </div>
  );
}
