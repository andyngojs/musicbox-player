"use client";
import React, { useMemo } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import type { Song } from "@/types/song";

import { useAppSelector } from "@/redux/hooks";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import Slider from "@/components/Slider";

interface PlayerContentProps {
  song: Song;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song }) => {
  const { volume, isPlaying } = useAppSelector((state) => state.player);
console.log(song)
  const {
    handlePlay,
    handleNextSong,
    handlePrevSong,
    toggleMuteSong,
    handleSetVolumeSong,
  } = usePlayer({ songUrl: song?.url, songId: song?.id });

  const Icon = useMemo(
    () => (isPlaying ? BsPauseFill : BsPlayFill),
    [isPlaying],
  );

  const VolumeIcon = useMemo(
    () => (volume === 0 ? HiSpeakerXMark : HiSpeakerWave),
    [volume],
  );

  return (
    <div className={"grid grid-cols-2 md:grid-cols-3 h-full"}>
      <div className={"flex w-full justify-start"}>
        <div className={"flex items-center gap-x-4"}>
          <MediaItem data={song} className={"w-[238px]"} />

          <LikeButton songId={song?.id} />
        </div>
      </div>

      <div
        className={"flex md:hidden col-auto w-full justify-end items-center"}
      >
        <div
          onClick={handlePlay}
          className={
            "h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          }
        >
          <Icon size={30} className={"text-black"} />
        </div>
      </div>

      <div
        className={
          "hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6"
        }
      >
        <AiFillStepBackward
          onClick={handlePrevSong}
          className={
            "text-neutral-400 cursor-pointer hover:text-white transition"
          }
          size={30}
        />
        <div
          onClick={handlePlay}
          className={
            "flex justify-center items-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
          }
        >
          <Icon size={30} className={"text-black"} />
        </div>
        <AiFillStepForward
          onClick={handleNextSong}
          className={
            "text-neutral-400 cursor-pointer hover:text-white transition"
          }
          size={30}
        />
      </div>

      <div className={"hidden md:flex w-full justify-end pr-2"}>
        <div className={"flex items-center gap-x-2 w-[120px]"}>
          <VolumeIcon
            onClick={toggleMuteSong}
            size={34}
            className={"cursor-pointer "}
          />
          <Slider value={volume} onChange={handleSetVolumeSong} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
