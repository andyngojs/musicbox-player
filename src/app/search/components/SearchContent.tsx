"use client";
import React from "react";
import { YTSong } from "@/types/song";

interface SearchContentProps {
  songs: YTSong[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {

  if (songs?.length === 0) {
    return (
      <div className={"flex flex-col gap-y-2 w-full px-6 text-neutral-400"}>
        No songs found.
      </div>
    );
  }

  return (
      <div className={'flex flex-col gap-y-2 w-full px-6'}>
        {songs.map(item => {
          return (
              <div key={item.id} className={'flex items-center gap-x-4 w-full'}>
                <div className={'flex-1 '}></div>
              </div>
          )
        })}
      </div>
  );
};

export default SearchContent;
