import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    formInfos: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

export const saveFormInfo = createAsyncThunk(
    'form/saveFormInfo',
    async (formInfo, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/donors/form', formInfo); // URL matches backend route
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


// Create the form slice
const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        addInfo: (state, action) => {
            state.formInfos.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveFormInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(saveFormInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.formInfos.push(action.payload); // Add new info to the state
            })
            .addCase(saveFormInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { addInfo } = formSlice.actions;

export default formSlice.reducer;
