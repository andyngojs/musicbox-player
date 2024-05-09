"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import type { Song } from "@/types/song";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import MediaItem from "@/components/MediaItem";
import { closeQueueModal } from "@/redux/slices/app.slice";
import { BiTrash } from "react-icons/bi";
import { removeToQueue } from "@/redux/slices/player.slice";

interface QueueModalProps {
  className?: string;
}

export const QueueModal: React.FC<QueueModalProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { queue, isPlaying } = useAppSelector((state) => state.player);

  return (
    <div
      className={twMerge(
        `bg-neutral-900 rounded-lg overflow-hidden overflow-y-auto p-4`,
        className,
      )}
    >
      <div
        className={"w-full mb-4 flex items-center justify-between mr-5 pb-2"}
      >
        <button
          className={
            "bg-transparent border-[0.5px] border-neutral-600 rounded-md px-2 py-1"
          }
        >
          Clear All
        </button>

        <AiOutlineClose
          onClick={() => dispatch(closeQueueModal())}
          size={24}
          className={"text-neutral-400 hover:text-white"}
        />
      </div>

      <div className={"px-4 "}>
        {queue.map((item: Song, index: number) => {
          return (
            <div
              key={item.id}
              className={"flex items-center justify-center gap-x-1.5 px-2"}
            >
              <span className={twMerge("font-medium")}>{index + 1}</span>
              <MediaItem data={item} />

              <div
                onClick={() => dispatch(removeToQueue(item.id))}
                className={"cursor-pointer flex-1"}
              >
                <BiTrash size={24} className={"text-neutral-400"} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QueueModal;
