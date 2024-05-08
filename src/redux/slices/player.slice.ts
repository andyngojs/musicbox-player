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
      state.queue.push(payload);
    },
    removeToQueue: (state, { payload }) => {
      state.queue = state.queue.filter((item) => item.id !== payload);
    },
    nextTrack: (state) => {
      if (state.playingIndex === state.queue.length - 1) {
        // go to first
        state.playingIndex = 0;
      } else {
        state.playingIndex = state.playingIndex + 1;
      }
      return state;
    },
    prevTrack: (state) => {
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
    clearAll: (state) => {
      state.queue = []
    }
  },
});

export const {
  pushToQueue,
  nextTrack,
  prevTrack,
  setPlayingSong,
  setVolume,
  removeToQueue,
    clearAll
} = PlayerSlice.actions;
export default PlayerSlice.reducer;
