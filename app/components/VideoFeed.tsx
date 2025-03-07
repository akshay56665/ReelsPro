"use client";
import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";

interface videoProps {
  videos: IVideo[];
}
export default function VideoFeed({ videos }: videoProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoComponent key={video._id?.toString()} video={video} />
      ))}
    </div>
  );
}
