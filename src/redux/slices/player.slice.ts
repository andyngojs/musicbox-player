import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "@/types/song";

interface InitialState {
  queue: Song[];
  playingIndex: number;
}

const initialState: InitialState = {
  queue: [],
  playingIndex: 0,
};

export const PlayerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    pushToQueue: (state, { payload }: PayloadAction<Song>) => {
      state.queue.push(payload);
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
  },
});

export const { pushToQueue, nextTrack, prevTrack } = PlayerSlice.actions;
export default PlayerSlice.reducer;
