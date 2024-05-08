import { useCallback, useEffect, useMemo } from "react";
import { Howl, Howler } from "howler";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearAll,
  nextTrack,
  prevTrack,
  removeToQueue,
  setPlayingSong,
  setVolume,
} from "@/redux/slices/player.slice";

interface UsePlayerProps {
  songUrl?: string;
  songId: string;
}

export default function usePlayer({ songUrl, songId }: UsePlayerProps) {
  const dispatch = useAppDispatch();
  const { volume, isPlaying, queue } = useAppSelector((state) => state.player);

  const sound = useMemo(
    () =>
      new Howl({
        src: String(songUrl),
        html5: true,
        autoplay: true,
        onplay: () => {
          dispatch(setPlayingSong(true));
        },
        onend: () => {
          dispatch(setPlayingSong(false));
          if (queue.length > 1) {
            dispatch(nextTrack());
          } else {
            dispatch(removeToQueue(songId));
          }
        },
        onpause: () => dispatch(setPlayingSong(false)),
      }),
    [dispatch, songUrl, queue, songId],
  );

  const handleNextSong = useCallback(() => {
    dispatch(nextTrack());
  }, [dispatch]);

  const handlePrevSong = useCallback(() => {
    dispatch(prevTrack());
  }, [dispatch]);

  const handlePlay = useCallback(() => {
    if (!isPlaying) {
      sound.play();
    } else {
      sound.pause();
    }
  }, [isPlaying, sound]);

  const toggleMuteSong = useCallback(() => {
    if (volume === 0) {
      dispatch(setVolume(1));
      sound.volume(1);
    } else {
      dispatch(setVolume(0));
      sound.volume(0);
    }
  }, [volume, dispatch, sound]);

  const handleSetVolumeSong = useCallback(
    (value: number) => {
      dispatch(setVolume(value));
      sound.volume(value);
    },
    [dispatch, sound],
  );

  useEffect(() => {
    sound.load();

    return () => {
      sound.unload();
      // dispatch(clearAll())
    };
  }, [sound, dispatch]);

  return {
    handlePlay,
    handleNextSong,
    handlePrevSong,
    toggleMuteSong,
    handleSetVolumeSong,
  };
}
