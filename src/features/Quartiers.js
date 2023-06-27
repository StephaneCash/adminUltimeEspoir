import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllQuartiers = createAsyncThunk("quartiers/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/quartiers`);
        return data
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newQuartier = createAsyncThunk("quartiers/create",
    async (data) => {
        try {
            const resp = await axios.post(`${baseUrl}/quartiers`, data);
            toast.success('Quartier ajoutée avec succès');
            return resp.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            }
        }
    });

export const updateQuartier = createAsyncThunk("quartiers/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/quartiers/${data && data.id}`, data && data.data);
            toast.success('Quartier modifiée avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const deleteQuartier = createAsyncThunk("quartiers/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/quartiers/${id}`);
            toast.success('Quartier supprimée avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const quartiersSlice = createSlice({
    name: "quartiers",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL quartiers
        [getAllQuartiers.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllQuartiers.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getAllQuartiers.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE Quartier
        [newQuartier.pending]: (state, action) => {
            state.loading = true;
        },
        [newQuartier.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newQuartier.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE Quartier
        [deleteQuartier.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteQuartier.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteQuartier.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE Quartier
        [updateQuartier.pending]: (state, action) => {
            state.loading = true;
        },
        [updateQuartier.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateQuartier.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
    }
});

export default quartiersSlice;