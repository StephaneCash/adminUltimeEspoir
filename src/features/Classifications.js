import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllactualites = createAsyncThunk("actualites/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/actualites`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newClassification = createAsyncThunk("actualites/create",

    async (data, { rejectWithValue }) => {
        try {
            const resp = await axios.post(`${baseUrl}/actualites`, data);
            if (resp && resp.data) {
                toast.success('Classification ajoutée avec succès');
            }
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updateClassification = createAsyncThunk("actualites/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/actualites/${data && data.id}`, data && data.form);
            toast.success('Classification modifiée avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const deleteClassification = createAsyncThunk("actualites/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/actualites/${id}`);
            toast.success('Classification supprimée avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const actualitesSlice = createSlice({
    name: "actualites",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {

        [getAllactualites.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllactualites.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllactualites.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
      //  CREATE CLASSIFICATION
        [newClassification.pending]: (state, action) => {
            state.loading = true;
        },
        [newClassification.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newClassification.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
       // UPDATE CLASSIFICATION
         [updateClassification.pending]: (state, action) => {
             state.loading = true;
         },
         [updateClassification.fulfilled]: (state, action) => {
             state.loading = false;
             state.isSuccess = true;
             state.value = state.value.filter(val => {
                 return val.id !== action.payload.id;
             })
             state.value.push(action.payload);
         },
         [updateClassification.rejected]: (state, action) => {
             state.loading = false;
             state.isSuccess = false;
         },
         // DELETE CLASSIFICATION
         [deleteClassification.pending]: (state, action) => {
             state.loading = true;
         },
         [deleteClassification.fulfilled]: (state, action) => {
             state.loading = false;
             state.value = state.value.filter(val => {
                 return val.id !== action.payload
             })
             state.isSuccess = true;
         },
         [deleteClassification.rejected]: (state, action) => {
             state.loading = false;
             state.isSuccess = false;
         },
    }
});

export default actualitesSlice;