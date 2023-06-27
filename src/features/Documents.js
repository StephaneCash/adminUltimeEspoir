import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllDocuments = createAsyncThunk("documentsAdmin/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/documents-admin`);
        return data
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newDocument = createAsyncThunk("documentsAdmin/create",
    async (data) => {
        try {
            const resp = await axios.post(`${baseUrl}/documents-admin`, data);
            toast.success('Document ajouté avec succès');
            return resp.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            }
        }
    });

export const updateDocument = createAsyncThunk("documentsAdmin/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/documents-admin/${data && data.id}`, data && data.data);
            toast.success('Document modifiéeavec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const deleteDocument = createAsyncThunk("documentsAdmin/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/documents-admin/${id}`);
            toast.success('Document supprimé avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const DocumentsSlice = createSlice({
    name: "documentsAdmin",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL Documents
        [getAllDocuments.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllDocuments.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getAllDocuments.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE Document
        [newDocument.pending]: (state, action) => {
            state.loading = true;
        },
        [newDocument.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newDocument.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE Document
        [deleteDocument.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteDocument.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteDocument.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE Document
        [updateDocument.pending]: (state, action) => {
            state.loading = true;
        },
        [updateDocument.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.unshift(action.payload);
        },
        [updateDocument.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
    }
});

export default DocumentsSlice;