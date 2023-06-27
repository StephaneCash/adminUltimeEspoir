import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllcategories = createAsyncThunk("categories/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/categories`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newCategorie = createAsyncThunk("categories/create",

    async (data, { rejectWithValue }) => {
        try {
            //  let navigate = useNavigate();
            const resp = await axios.post(`${baseUrl}/categories`, data);
            if (resp && resp.data) {
                toast.success('Catégorie ajoutée avec succès');
            }
            //navigate("/categories");
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updateCategorie = createAsyncThunk("categories/update",
    async (data) => {
        try {
            //  let navigate = useNavigate();
            const resp = await axios.put(`${baseUrl}/categories/${data && data.id}`, data && data.form);
            toast.success('Catégorie modifiée avec succès');
            //navigate("/categories");
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const deleteCategory = createAsyncThunk("categories/delete",
    async (id) => {
        try {
            //  let navigate = useNavigate();
            await axios.delete(`${baseUrl}/categories/${id}`);
            toast.success('Catégorie supprimée avec succès');
            //navigate("/categories");
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL CATEGORIES
        [getAllcategories.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllcategories.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllcategories.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE CATEGORIE
        [newCategorie.pending]: (state, action) => {
            state.loading = true;
        },
        [newCategorie.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newCategorie.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE CATGORIE
        [deleteCategory.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteCategory.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE CATEGORIE
        [updateCategorie.pending]: (state, action) => {
            state.loading = true;
        },
        [updateCategorie.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateCategorie.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default categoriesSlice;