import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllTexts = createAsyncThunk("texts/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/texts`);
        return data
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newText = createAsyncThunk("texts/create",
    async (data) => {
        try {
            const resp = await axios.post(`${baseUrl}/texts`, data);
            toast.success('texts ajouté avec succès');
            return resp.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            }
        }
    });

export const updateText = createAsyncThunk("texts/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/texts/${data && data.id}`, data && data.data);
            toast.success('texts modifié avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const deleteText = createAsyncThunk("texts/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/texts/${id}`);
            toast.success('texts supprimé avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const textsSlice = createSlice({
    name: "texts",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL texts
        [getAllTexts.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllTexts.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getAllTexts.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE boutique
        [newText.pending]: (state, action) => {
            state.loading = true;
        },
        [newText.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newText.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE boutique
        [deleteText.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteText.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteText.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE boutique
        [updateText.pending]: (state, action) => {
            state.loading = true;
        },
        [updateText.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateText.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
    }
});

export default textsSlice;