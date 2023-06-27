import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllProvinces = createAsyncThunk("provinces/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/provinces`);
        return data
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newProvince = createAsyncThunk("provinces/create",
    async (data) => {
        try {
            const resp = await axios.post(`${baseUrl}/provinces`, data);
            toast.success('Province ajoutée avec succès');
            return resp.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            }
        }
    });

export const updateProvince = createAsyncThunk("provinces/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/provinces/${data && data.id}`, data && data.data);
            toast.success('Province modifiée avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const deleteProvince = createAsyncThunk("provinces/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/provinces/${id}`);
            toast.success('Province supprimée avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const provincesSlice = createSlice({
    name: "provinces",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL provinces
        [getAllProvinces.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllProvinces.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getAllProvinces.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE province
        [newProvince.pending]: (state, action) => {
            state.loading = true;
        },
        [newProvince.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newProvince.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE province
        [deleteProvince.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteProvince.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteProvince.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE province
        [updateProvince.pending]: (state, action) => {
            state.loading = true;
        },
        [updateProvince.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateProvince.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
    }
});

export default provincesSlice;