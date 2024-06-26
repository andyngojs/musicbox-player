"use client"
import React from "react";
import Image from "next/image";
import type {Song, YTSong} from "@/types/song";
import PlayButton from "@/components/PlayButton";

interface SongItemProps {
  data: YTSong | Song;
  onPress?: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onPress }) => {
  return (
    <div
      onClick={() => onPress?.(data.id)}
      className={
        "relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
      }
    >
      <div
        className={
          "relative aspect-square w-full h-full rounded-md overflow-hidden"
        }
      >
        <Image
          className={"object-cover"}
          src={data.image || "/images/liked.png"}
          alt={"Image"}
          fill
          sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          priority={true}
        />
      </div>
      <div className={"flex flex-col items-start w-full pt-4 gap-y-1"}>
        <p className={"font-bold truncate w-full"}>{"title" in data ? data?.title : data?.name}</p>
        <p className={"text-neutral-400 text-sm pb-4 w-full truncate"}>
          By {data.author}
        </p>
      </div>

      <div className={"absolute bottom-24 right-5"}>
          <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
