import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllVilles = createAsyncThunk("villes/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/villes`);
        return data
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newVille = createAsyncThunk("villes/create",
    async (data) => {
        try {
            const resp = await axios.post(`${baseUrl}/villes`, data);
            toast.success('Ville ajoutée avec succès');
            return resp.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            }
        }
    });

export const updateVille = createAsyncThunk("villes/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/villes/${data && data.id}`, data && data.data);
            toast.success('Ville modifiée avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const deleteVille = createAsyncThunk("villes/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/villes/${id}`);
            toast.success('Ville supprimée avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const villesSlice = createSlice({
    name: "villes",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL villes
        [getAllVilles.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllVilles.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getAllVilles.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE ville
        [newVille.pending]: (state, action) => {
            state.loading = true;
        },
        [newVille.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newVille.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE ville
        [deleteVille.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteVille.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteVille.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE boutique
        [updateVille.pending]: (state, action) => {
            state.loading = true;
        },
        [updateVille.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateVille.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
    }
});

export default villesSlice;