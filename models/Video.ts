import mongoose, { Schema, model, models } from "mongoose";

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  VideoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;

const videoschema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    VideoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    controls: {
      type: Boolean,
      default: false,
    },
    transformation: {
      height: {
        type: Number,
        default: VIDEO_DIMENSIONS.height,
      },
      width: {
        type: Number,
        default: VIDEO_DIMENSIONS.width,
      },
      quality: {
        type: Number,
        min: 0,
        max: 100,
      },
    },
  },
  { timestamps: true }
);

const Video = models?.Video || model<IVideo>("Video", videoschema);
export default Video;
