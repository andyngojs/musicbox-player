import ytdl from "@distube/ytdl-core";

interface Song {
  id: string;
  url: string;
  image: string;
  title: string;
  author: string;
  duration?: number;
}

export interface InfoTrack {
  id: string;
  url: string;
  metadata: ytdl.videoInfo;
}

export interface YTSong {
  id: string;
  name: string;
  image: string;
  channelId: string;
  author: string;
}
