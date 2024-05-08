"use client";
import React, { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import type { InfoTrack, YTSong } from "@/types/song";
import { apiHandlerGApi } from "@/services/google-api.service";
import { apiHandler } from "@/services/api-handler.service";
import { useAppDispatch } from "@/redux/hooks";
import { pushToQueue } from "@/redux/slices/player.slice";
import SongItem from "@/components/SongItem";
import Loading from "@/components/Loading";

interface PageContentProps {}

const PageContent: React.FC<PageContentProps> = () => {
  const [isLoading, setLoading] = useState(false);
  const [newestSongs, setNewestSongs] = useState<YTSong[] | []>([]);

  const dispatch = useAppDispatch();

  const fetchTrackPopular = useCallback(async () => {
    setLoading(true);

    await apiHandlerGApi.getVideos(
      {
        chart: "mostPopular",
        hl: "vi_VN",
        videoCategoryId: "10",
        maxResults: 7,
      },
      (data) => {
        const song = data.items.map((item) => {
          return {
            id: item.id,
            name: item.snippet.title,
            image: item.snippet.thumbnails.high.url,
            channelId: item.snippet.channelId,
            author: item.snippet.channelTitle,
          };
        });

        setNewestSongs(song);
        setLoading(false);
      },
    );
  }, []);

  const handlePressSong = useCallback(
    async (id: string) => {
      try {
        const response = await apiHandler.getPlayableUrl(id);

        if (response && !response?.data) {
          toast.error("These is a error occurred. Try again");
          return;
        }

        if (response.data.length === 1) {
          const song = response.data[0];

          dispatch(
            pushToQueue({
              id: song.id,
              image: song.metadata.videoDetails.thumbnails[1]?.url,
              title: song.metadata.videoDetails?.title,
              author: song.metadata.videoDetails.author?.name,
              url: song.url,
            }),
          );
        } else {
          response.data?.map((item: InfoTrack) => {
            const songTemp = {
              id: item.id,
              image: item.metadata.videoDetails.thumbnails[1]?.url,
              title: item.metadata.videoDetails?.title,
              author: item.metadata.videoDetails.author?.name,
              url: item?.url,
            };

            dispatch(pushToQueue(songTemp));
          });
        }
      } catch (e) {
        toast.error("These is a error occurred. Try again");
        throw new Error("Error get_playable_url " + e);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    fetchTrackPopular().then();
  }, [fetchTrackPopular]);

  if (isLoading) {
    return <Loading />;
  }

  if (newestSongs.length === 0) {
    return <div className={"mt-4 text-neutral-400"}>No songs available.</div>;
  }

  return (
    <div
      className={
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4"
      }
    >
      {newestSongs.map((item) => {
        return <SongItem key={item.id} data={item} onPress={handlePressSong} />;
      })}
    </div>
  );
};

export default PageContent;
