/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdImage } from "react-icons/md";
import { useImagePreview } from "./useImagePreview";

export default function DDImageChooser() {
  const [isDragging, setDragging] = useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const { imagesUrl } = useImagePreview(imageFiles);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if( event.target.files )
      handleFiles( event.target.files );
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    setDragging(false);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(true);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    setDragging(false);
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  }

  function handleFiles(files: FileList) {
    if (!files || !Array.from(files).every((file) => file.type.startsWith("image/"))) return;
    setImageFiles(files);
  }

  return (
    <div
      className="min-w-64 max-w-7xl min-h-64 bg-white shadow-xl rounded-lg p-2 flex flex-col justify-center items-center"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className={`pointer-events-none border-4 border-dashed w-full h-full rounded-lg p-1 flex-1 flex justify-center items-center ${
          isDragging ? "text-gray-400 border-gray-400" : "text-gray-200 border-gray-200}"
        }`}
      >
        <div className="flex justify-center items-center h-full">
          {imagesUrl.length == 0 ? (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <MdImage size={80} />
              <label htmlFor="imageChooser" className="pointer-events-auto mt-2 bg-gray-400 text-white py-2 px-4 w-36 rounded-lg hover:brightness-110">
                O selecciona un archivo
              </label>
              <input className="hidden" id="imageChooser" type="file" accept="image/*" multiple onChange={handleFileChange}/>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center align-top flex-wrap gap-1">
              {imagesUrl.map((imageUrl, index) => (
                <img className="aspect-video w-32 rounded-md" key={index} src={imageUrl} alt="Selected Image"/>
              ))}
            </div>
          )}
        </div>
      </div>
      <button className="mt-2 bg-indigo-600 text-white py-2 px-4 w-full rounded-lg hover:brightness-110">
        Submit
      </button>
    </div>
  );
}
