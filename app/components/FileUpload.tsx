"use client";
import React, { useRef, useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress: (progress: number) => void;
  fileType?: "image" | "video";
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {
  const [uploadind, setUploadind] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const onError = (err: { message: string }) => {
    console.log("Error: ", err);
    setError(err.message);
    setUploadind(false);
  };

  const handleSuccess = (res: IKUploadResponse) => {
    console.log("Success: ", res);
    setError(null);
    setUploadind(false);
    onSuccess(res);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const handleUploadStart = () => {
    setUploadind(true);
    setError(null);
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a video file");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("File size should be less than 100MB");
        return false;
      }
    } else {
      const validtypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validtypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, WEBP)");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return false;
      }
    }
    return true;
  };

  const handleFileSelect = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  return (
    <div className="space-y-2">
      <IKUpload
        ref={uploadRef}
        className="file-input file-input-bordered w-full"
        fileName={fileType === "video" ? "video" : "image"}
        useUniqueFileName={true}
        validateFile={validateFile}
        folder={fileType === "video" ? "/videos" : "/images"}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        onUploadStart={handleUploadStart}
        // Apply transformation only for images.
        transformation={
          fileType === "image"
            ? {
                pre: "l-text,i-Imagekit,fs-50,l-end",
                post: [
                  {
                    type: "transformation",
                    value: "w-100",
                  },
                ],
              }
            : undefined
        }
        style={{ display: "none" }}
      />
      <button
        type="button"
        onClick={handleFileSelect}
        className="btn btn-secondary"
      >
        Upload video
      </button>
      {uploadind && (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Loader2 className="animated-spin w-4 h-4" />
          <span>Uploading...</span>
        </div>
      )}
      {error && <div className="text-error text-sm">Error: {error}</div>}
    </div>
  );
}
