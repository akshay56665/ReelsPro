"use client";
import { ApiRequest } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";
import VideoFeed from "./components/VideoFeed";
import Header from "./components/Header";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  const fetchVideos = async () => {
    try {
      const data = await ApiRequest.getVideos();
      setVideos(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="pb-5 mx-5">
      <Header />
      <VideoFeed videos={videos} />
    </div>
  );
}
