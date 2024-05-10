"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import PlayerContent from "@/components/PlayerContent";
import {twMerge} from "tailwind-merge";
import styles from '@/styles/Player.module.scss'

interface PlayerProps {}

const Player: React.FC<PlayerProps> = () => {
  const { queue, playingIndex } = useAppSelector((state) => state.player);

  if (queue.length === 0) {
    return null;
  }

  return (
    <div className={twMerge("fixed bottom-[15px] rounded-lg w-full py-2 h-[80px] px-4", styles.outer)}>
      <PlayerContent song={queue[playingIndex]} />
    </div>
  );
};

export default Player;
