import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllSousCategories = createAsyncThunk("sousCategories/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/images`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newSousCategorie = createAsyncThunk("sousCategories/create",

    async (data, { rejectWithValue }) => {
        try {
            const resp = await axios.post(`${baseUrl}/images`, data);
            if (resp && resp.data) {
                toast.success('Image ajoutée avec succès');
            }
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updateSousCategorie = createAsyncThunk("sousCategories/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/images/${data && data.id}`, data && data.form);
            toast.success('Image modifiée avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const deleteSousCategory = createAsyncThunk("sousCategories/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/images/${id}`);
            toast.success('Image supprimée avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const sousCategoriesSlice = createSlice({
    name: "images",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL CATEGORIES
        [getAllSousCategories.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllSousCategories.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllSousCategories.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE CATEGORIE
        [newSousCategorie.pending]: (state, action) => {
            state.loading = true;
        },
        [newSousCategorie.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newSousCategorie.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE CATGORIE
        [deleteSousCategory.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteSousCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteSousCategory.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE CATEGORIE
        [updateSousCategorie.pending]: (state, action) => {
            state.loading = true;
        },
        [updateSousCategorie.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateSousCategorie.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default sousCategoriesSlice;