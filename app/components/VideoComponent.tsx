"use client";
import { IVideo } from "@/models/Video";
import { IKVideo } from "imagekitio-next";
import Link from "next/link";

interface videoProps {
  video: IVideo;
}

function VideoComponent({ video }: videoProps) {
  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">
        <div className="relative group w-full">
          <div
            className="rounded-xl relative w-full"
            style={{ aspectRatio: "9/16" }}
          >
            <IKVideo
              path={video.VideoUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video.controls}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </figure>

      <div className="card-body p-4">
        <div className="hover:opacity-80 transition-opacity">
          <h2 className="card-title text-lg">{video.title}</h2>
        </div>

        <p className="text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}

export default VideoComponent;
