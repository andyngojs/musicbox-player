"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import PlayerContent from "@/components/PlayerContent";

interface PlayerProps {}

const Player: React.FC<PlayerProps> = () => {
  const { queue, playingIndex } = useAppSelector((state) => state.player);

  if (queue.length === 0) {
    return null;
  }

  return (
    <div className={"fixed bottom-0 bg-black w-full py-2 h-[80px] px-4"}>
      <PlayerContent song={queue[playingIndex]} />
    </div>
  );
};

export default Player;
