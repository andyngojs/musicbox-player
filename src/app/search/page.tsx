"use client";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import type { SongSearchResponse } from "@/types/video-yt-search";
import { apiHandlerGApi } from "@/services/google-api.service";
import Header from "@/components/Header";
import SearchContent from "@/app/search/components/SearchContent";
import Input from "@/components/Input";

interface SearchProps {}

export default function Search() {
  const [value, setValue] = useState<string>("");
  const [songsSearched, setSongsSearched] = useState<SongSearchResponse[]>([]);

  const searchTracks = useCallback(async (keywork: string) => {
    try {
      await apiHandlerGApi.search(
        {
          q: keywork,
        },
        (response) => {
          const songSearch = response.items.map((item) => {
            return {
              id: item.id.videoId,
              title: item.snippet.title,
              author: item.snippet.channelTitle,
              channelId: item.snippet.channelId,
              image: item.snippet.thumbnails.medium.url,
            };
          });
          setSongsSearched(songSearch);
        },
      );
    } catch (e) {
      throw new Error("error_search_videos: " + e);
    }
  }, []);

  const handleChange = useCallback(
    (e: any) => {
      setValue(e.target.value);

      const searchDebounce = debounce(
        async () => await searchTracks(e.target.value),
        2000,
      );

      searchDebounce();
    },
    [searchTracks],
  );

  return (
    <div
      className={
        "bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto"
      }
    >
      <Header className={"from-bg-neutral-900"}>
        <div className={"mb-2 flex flex-col gap-y-6"}>
          <h1 className={"text-3xl font-bold text-white"}>Search</h1>

          <Input
            placeholder={"What do you want to listen to ?"}
            value={value}
            onChange={handleChange}
          />
        </div>
      </Header>

      <SearchContent songs={songsSearched} />
    </div>
  );
}
