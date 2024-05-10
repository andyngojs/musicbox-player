"use client";
import React, {ReactNode, useCallback} from "react";
import Image from "next/image";
import type { Song } from "@/types/song";
import { twMerge } from "tailwind-merge";
import {SongSearchResponse} from "@/types/video-yt-search";

interface MediaItemProps {
  data: Song | SongSearchResponse;
  onClick?: (id: string) => void;
  className?: string;
  iconAfter?: () => ReactNode;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick, className , iconAfter}) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(data.id);
    }
  }, [onClick, data]);

  return (
    <div
      onClick={handleClick}
      className={twMerge(
        "flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md",
        className,
      )}
    >
      <div
        className={
          "relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden"
        }
      >
        <Image
          className={"object-cover"}
          src={data?.image || "/images/liked.png"}
          alt={data?.title}
          fill
          sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        />
      </div>

      <div className={"flex flex-col gap-y-1 overflow-hidden flex-1"}>
        <p className={"text-white truncate"}>{data?.title}</p>
        <p className={"text-neutral-400 text-sm truncate"}>{data?.author}</p>
      </div>

      {iconAfter && <div className={''}>{iconAfter()}</div>}
    </div>
  );
};

export default MediaItem;
