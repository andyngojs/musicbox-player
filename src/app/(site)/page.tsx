"use client";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "@/app/(site)/components/PageContent";
import { ExampleSongs } from "@/data/songs";
import type { Song } from "@/types/song";
import SongItem from "@/components/SongItem";
import { pushToQueue } from "@/redux/slices/player.slice";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const { queue } = useAppSelector((state) => state.player);

  const handlePlaySong = (song: Song) => {
    let indexExisted = queue.findIndex((item: Song) => item.id === song.id);
    if (indexExisted < 0) {
      dispatch(pushToQueue(song));

      toast.success("Added to queue successfully!");
    }
  };

  return (
    <main className="bg-neutral-900 h-full w-full rounded-lg overflow-hidden overflow-y-auto">
      <Header>
        <div className={"mb-2"}>
          <h1 className={"text-white text-3xl font-bold"}>Welcome back</h1>

          <div
            className={
              "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4"
            }
          >
            <ListItem
              image={"/images/liked.png"}
              name={"Liked Songs"}
              href={"liked"}
            />
          </div>
        </div>
      </Header>

      <div className={"mt-2 mb-7 px-6"}>
        <div className={"flex justify-between items-center"}>
          <h1 className={"text-white text-2xl font-bold"}>Available Songs</h1>
        </div>

        <div
          className={
            "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4"
          }
        >
          {ExampleSongs.map((song: Song, index: number) => {
            return (
              <SongItem
                key={song.id}
                data={song}
                onPress={() => handlePlaySong(song)}
              />
            );
          })}
        </div>
      </div>

      <div className={"mt-2 mb-7 px-6"}>
        <div className={"flex justify-between items-center"}>
          <h1 className={"text-white text-2xl font-bold"}>
            Newest Songs on Youtube
          </h1>
        </div>

        <PageContent />
      </div>
    </main>
  );
}
