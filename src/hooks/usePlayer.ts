import { useCallback, useEffect, useMemo, useState } from "react";
import { Howl } from "howler";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  nextTrack,
  prevTrack,
  removeToQueue,
  setPlayingSong,
  setVolume,
} from "@/redux/slices/player.slice";
import {closeQueueModal} from "@/redux/slices/app.slice";

interface UsePlayerProps {
  songUrl?: string;
  songId: string;
}

export default function usePlayer({ songUrl, songId }: UsePlayerProps) {
  const dispatch = useAppDispatch();
  const { volume, isPlaying, queue } = useAppSelector((state) => state.player);
  const [currentTimeTrack, setCurrentTime] = useState(0);
  const [currentWidthTrack, setCurrentWidthTrack] = useState(0);

  const sound = useMemo(
    () =>
      new Howl({
        src: String(songUrl),
        html5: true,
        preload: "metadata",
        // autoplay: true,
        onplay: () => {
          dispatch(setPlayingSong(true));
        },
        onend: () => {
          dispatch(setPlayingSong(false));
          setCurrentTime(0)
          setCurrentWidthTrack(0)

          if (queue.length > 1) {
            dispatch(nextTrack());
          } else {
            dispatch(closeQueueModal())
          }

          dispatch(removeToQueue({ songId }));
        },
        onpause: () => dispatch(setPlayingSong(false)),
      }),
    [dispatch, songUrl, queue, songId],
  );

  const handleNextSong = useCallback(() => {
    if (sound.playing()) {
      sound.pause();
    }
    setCurrentTime(0);
    dispatch(nextTrack());
  }, [dispatch, sound]);

  const handlePrevSong = useCallback(() => {
    if (sound.playing()) {
      sound.pause();
    }
    setCurrentTime(0);
    dispatch(prevTrack());
  }, [dispatch, sound]);

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

  const handleTimeUpdate = useCallback(() => {
    if (sound.playing()) {
      const width = Math.floor((sound.seek() / sound.duration()) * 100);

      setCurrentTime(sound.seek());

      setCurrentWidthTrack(width);
    }
  }, [sound]);

  useEffect(() => {
    sound.load();

    let timerInterval;
    timerInterval = setInterval(handleTimeUpdate, 1000);

    return () => {
      sound.unload();
      clearInterval(timerInterval);
    };
  }, [sound, handleTimeUpdate]);

  return {
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
  };
}
