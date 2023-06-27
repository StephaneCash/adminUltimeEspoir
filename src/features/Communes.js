import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllCommunes = createAsyncThunk("communes/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/communes`);
        return data
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newCommune = createAsyncThunk("communes/create",
    async (data) => {
        try {
            const resp = await axios.post(`${baseUrl}/communes`, data);
            toast.success('Commune ajoutée avec succès');
            return resp.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            }
        }
    });

export const updateCommune = createAsyncThunk("communes/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/communes/${data && data.id}`, data && data.data);
            toast.success('Commune modifiée avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const deleteCommune = createAsyncThunk("communes/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/communes/${id}`);
            toast.success('Commune supprimée avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const communesSlice = createSlice({
    name: "communes",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL communes
        [getAllCommunes.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllCommunes.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getAllCommunes.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE Commune
        [newCommune.pending]: (state, action) => {
            state.loading = true;
        },
        [newCommune.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newCommune.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE Commune
        [deleteCommune.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteCommune.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteCommune.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE Commune
        [updateCommune.pending]: (state, action) => {
            state.loading = true;
        },
        [updateCommune.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.unshift(action.payload);
        },
        [updateCommune.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
    }
});

export default communesSlice;