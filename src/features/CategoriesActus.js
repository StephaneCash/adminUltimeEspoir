import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllcategoriesActus = createAsyncThunk("categoriesActus/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/categories-actus`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newCategorieActus = createAsyncThunk("categoriesActus/create",

    async (data, { rejectWithValue }) => {
        try {
            const resp = await axios.post(`${baseUrl}/categories-actus`, data);
            if (resp && resp.data) {
                toast.success('Catégorie ajoutée avec succès');
            }
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updateCategorieActus = createAsyncThunk("categoriesActus/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/categories-actus/${data && data.id}`, data && data.form);
            toast.success('Catégorie modifiée avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const deleteCategoryActus = createAsyncThunk("categoriesActus/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/categories-actus/${id}`);
            toast.success('Catégorie supprimée avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const categorieActusSlice = createSlice({
    name: "categoriesActus",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL CATEGORIES
        [getAllcategoriesActus.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllcategoriesActus.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllcategoriesActus.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE CATEGORIE
        [newCategorieActus.pending]: (state, action) => {
            state.loading = true;
        },
        [newCategorieActus.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newCategorieActus.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE CATGORIE
        [deleteCategoryActus.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteCategoryActus.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteCategoryActus.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE CATEGORIE
        [updateCategorieActus.pending]: (state, action) => {
            state.loading = true;
        },
        [updateCategorieActus.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateCategorieActus.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default categorieActusSlice;