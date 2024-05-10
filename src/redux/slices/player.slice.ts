import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "@/types/song";

interface InitialState {
  queue: Song[];
  playingIndex: number;
  histories: [];
  isPlaying: boolean;
  volume: number;
}

const initialState: InitialState = {
  queue: [],
  playingIndex: 0,
  histories: [],
  isPlaying: false,
  volume: 1,
};

export const PlayerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    pushToQueue: (state, { payload }: PayloadAction<Song>) => {
      if (state.isPlaying) {
        Howler.stop();
        state.isPlaying = false;
      }

      state.queue.push(payload);
    },
    removeToQueue: (
      state,
      { payload }: PayloadAction<{ songId: string; index?: number }>,
    ) => {
      let arrTemp = [...state.queue];

      if (state.isPlaying) {
        state.isPlaying = false;
      }

      state.queue = arrTemp.filter((item) => item.id !== payload.songId);

      // only happen when click remove button in QueueModal
      if (state.playingIndex >= Number(payload?.index)) {
        state.playingIndex = state.playingIndex - 1;
      }

      if (state.queue[state.playingIndex] === undefined) {
        state.playingIndex = state.queue.length - 1;
      }
    },
    nextTrack: (state) => {
      state.isPlaying = false;

      if (state.playingIndex === state.queue.length - 1) {
        // go to first
        state.playingIndex = 0;
      } else {
        state.playingIndex = state.playingIndex + 1;
      }

      return state;
    },
    prevTrack: (state) => {
      state.isPlaying = false;

      if (state.playingIndex > 0) {
        state.playingIndex = state.playingIndex - 1;
      } else {
        state.playingIndex = state.queue.length - 1;
      }

      return state;
    },
    setPlayingSong: (state, { payload }: PayloadAction<boolean>) => {
      state.isPlaying = payload;
    },
    setVolume: (state, { payload }: PayloadAction<number>) => {
      state.volume = payload;
    },
    clearQueue: (state) => {
      state.queue = [];
    },
    setPlayingIndex: (state, { payload }: PayloadAction<number>) => {
      state.playingIndex = payload;
    },
    setPlayer: (state, { payload }: PayloadAction<InitialState>) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const {
  pushToQueue,
  nextTrack,
  prevTrack,
  setPlayingSong,
  setVolume,
  removeToQueue,
  clearQueue,
  setPlayingIndex,
  setPlayer,
} = PlayerSlice.actions;
export default PlayerSlice.reducer;
