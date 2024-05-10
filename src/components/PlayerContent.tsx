"use client";
import React, { useMemo } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import * as RadixSlider from "@radix-ui/react-slider";

import type { Song } from "@/types/song";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import usePlayer from "@/hooks/usePlayer";

import { formatTime } from "@/utils/player.util";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import Slider from "@/components/Slider";
import { PiQueueDuotone } from "react-icons/pi";
import { openQueueModal } from "@/redux/slices/app.slice";
import { twMerge } from "tailwind-merge";
import styles from '@/styles/Player.module.scss'

interface PlayerContentProps {
  song: Song;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song }) => {
  const dispatch = useAppDispatch();
  const { volume, isPlaying } = useAppSelector((state) => state.player);
  const { isOpenQueueModal } = useAppSelector((state) => state.app);

  const {
    sound,
    currentTimeTrack,
    currentWidthTrack,
    setCurrentTime,
    setCurrentWidthTrack,
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
    <div className={twMerge("grid grid-cols-2 md:grid-cols-3 h-full", styles.content)}>
      <div className={"flex w-full justify-start"}>
        <div className={"flex items-center gap-x-2"}>
          <MediaItem data={song} className={"w-[238px]"} />

          <LikeButton songId={song?.id} className={'hidden md:block'} />
        </div>
      </div>

      {/*===== Mobile ======= */}
      <div
          onClick={() => {
            dispatch(openQueueModal())
          }}
        className={"flex md:hidden col-auto w-full justify-end items-center gap-x-6"}
      >
        <AiFillStepBackward
            onClick={handlePrevSong}
            className={
              "text-neutral-400 cursor-pointer hover:text-white transition"
            }
            size={24}
        />
        <div
          onClick={handlePlay}
          className={
            "h-8 w-8 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          }
        >
          <Icon size={24} className={"text-black"} />
        </div>

        <AiFillStepForward
          onClick={handleNextSong}
          className={
            "text-neutral-400 cursor-pointer hover:text-white transition"
          }
          size={24}
        />
      </div>
      {/*===== End ======= */}

      <div
        className={
          "hidden h-full md:flex flex-col justify-center items-center w-full max-w-[740px]"
        }
      >
        <div
          className={
            "h-full md:flex justify-center items-center w-full gap-x-6"
          }
        >
          <AiFillStepBackward
            onClick={handlePrevSong}
            className={
              "text-neutral-400 cursor-pointer hover:text-white transition"
            }
            size={24}
          />
          <div
            onClick={handlePlay}
            className={
              "flex justify-center items-center h-8 w-8 rounded-full bg-white p-1 cursor-pointer"
            }
          >
            <Icon size={25} className={"text-black"} />
          </div>
          <AiFillStepForward
            onClick={handleNextSong}
            className={
              "text-neutral-400 cursor-pointer hover:text-white transition"
            }
            size={24}
          />
        </div>

        <div
          className={
            "h-full md:flex justify-center items-center w-full gap-x-3"
          }
        >
          <span>{formatTime(currentTimeTrack)}</span>
          <RadixSlider.Root
            className={
              "relative flex items-center select-none touch-none w-full h-10"
            }
            min={0}
            max={100}
            step={1}
            value={[currentWidthTrack]}
            onValueChange={(value) => {
              let seconds = (sound.duration() / 100) * value[0];
              sound.seek(seconds);
              setCurrentTime(seconds);

              setCurrentWidthTrack(Math.floor(Number(value[0])));
            }}
          >
            <RadixSlider.Track
              className={`bg-neutral-600 relative grow rounded-full h-[3px] w-[${currentWidthTrack}%]`}
            >
              <RadixSlider.Range
                className={`absolute bg-yellow-500 rounded-full h-full `}
              />
            </RadixSlider.Track>
          </RadixSlider.Root>
          <span>{formatTime(Number(song?.duration) || sound.duration())}</span>
        </div>
      </div>

      <div className={"hidden md:flex w-full items-center justify-end pr-2"}>
        <div
          className={"gap-x-2 mr-5"}
          onClick={() => dispatch(openQueueModal())}
        >
          <PiQueueDuotone
            size={24}
            className={twMerge(
              isOpenQueueModal ? "text-white" : "text-neutral-400",
              "cursor-pointer",
            )}
          />
        </div>

        <div className={"flex items-center gap-x-2 w-[120px]"}>
          <VolumeIcon
            onClick={toggleMuteSong}
            size={30}
            className={"cursor-pointer"}
          />
          <Slider value={volume} onChange={handleSetVolumeSong} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
