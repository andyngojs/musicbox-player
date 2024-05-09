import {createSlice} from "@reduxjs/toolkit";

interface InitialState {
    isOpenQueueModal: boolean;
}

const initialState: InitialState = {
    isOpenQueueModal: false
}

export const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        openQueueModal: (state) => {
            state.isOpenQueueModal = true
        },
        closeQueueModal: (state) => {
            state.isOpenQueueModal = false
        }
    }
})

export const {openQueueModal, closeQueueModal} = AppSlice.actions
export default AppSlice.reducer
