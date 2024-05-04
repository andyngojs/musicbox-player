"use client";
import React, { useState, useCallback } from "react";
import type { YTSong } from "@/types/song";
import { apiHandlerGApi } from "@/services/google-api.service";

interface PageContentProps {}

const PageContent: React.FC<PageContentProps> = () => {
  const [newestSongs, setNewestSongs] = useState<YTSong[] | []>([]);

  const fetchTrackPopular = useCallback(async () => {
    await apiHandlerGApi.getVideos(
      {
        chart: "mostPopular",
        hl: "vi_VN",
        videoCategoryId: "10",
      },
      (data) => {
        const song = data.items.map((item) => {
          return {
            id: item.id,
            name: item.snippet.title,
            image: item.snippet.thumbnails.medium.url,
          };
        });

        setNewestSongs(song);
      },
    );
  }, []);

  return <div>Page Content</div>;
};

export default PageContent;
