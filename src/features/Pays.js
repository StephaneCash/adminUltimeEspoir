import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllPays = createAsyncThunk("pays/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/pays`);
        return data
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newPays = createAsyncThunk("pays/create",
    async (data) => {
        try {
            const resp = await axios.post(`${baseUrl}/pays`, data);
            toast.success('Pays ajouté avec succès');
            return resp.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            }
        }
    });

export const updatePays = createAsyncThunk("pays/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/pays/${data && data.id}`, data && data.data);
            toast.success('Pays modifié avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const deletePays = createAsyncThunk("pays/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/Pays/${id}`);
            toast.success('Pays supprimé avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const paysSlice = createSlice({
    name: "pays",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL Pays
        [getAllPays.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllPays.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getAllPays.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE boutique
        [newPays.pending]: (state, action) => {
            state.loading = true;
        },
        [newPays.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newPays.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE boutique
        [deletePays.pending]: (state, action) => {
            state.loading = true;
        },
        [deletePays.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deletePays.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE boutique
        [updatePays.pending]: (state, action) => {
            state.loading = true;
        },
        [updatePays.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updatePays.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
    }
});

export default paysSlice;