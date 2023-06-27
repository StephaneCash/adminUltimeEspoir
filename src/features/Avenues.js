import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllavenues = createAsyncThunk("avenues/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/avenues`);
        return data
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newAvenue = createAsyncThunk("avenues/create",
    async (data) => {
        try {
            const resp = await axios.post(`${baseUrl}/avenues`, data);
            toast.success('Avenue ajoutée avec succès');
            return resp.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            }
        }
    });

export const updateAvenue = createAsyncThunk("avenues/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/avenues/${data && data.id}`, data && data.data);
            toast.success('Avenue modifiée avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const deleteAvenue = createAsyncThunk("avenues/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/avenues/${id}`);
            toast.success('Avenue supprimée avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const avenuesSlice = createSlice({
    name: "avenues",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL avenues
        [getAllavenues.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllavenues.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getAllavenues.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE Avenue
        [newAvenue.pending]: (state, action) => {
            state.loading = true;
        },
        [newAvenue.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newAvenue.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE Avenue
        [deleteAvenue.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteAvenue.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteAvenue.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE Avenue
        [updateAvenue.pending]: (state, action) => {
            state.loading = true;
        },
        [updateAvenue.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateAvenue.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
    }
});

export default avenuesSlice;