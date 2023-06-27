import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllDevises = createAsyncThunk("devises/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/devises`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newDevise = createAsyncThunk("devises/create",

    async (data, { rejectWithValue }) => {
        try {
            //  let navigate = useNavigate();
            const resp = await axios.post(`${baseUrl}/devises`, data);
            if (resp && resp.data) {
                toast.success('Devise ajoutée avec succès');
            }
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updateDevise = createAsyncThunk("devises/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/devises/${data && data.id}`, data.data);
            toast.success('Devise modifiée avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const deleteDevise = createAsyncThunk("devises/delete",
    async (id) => {
        try {
            //  let navigate = useNavigate();
            await axios.delete(`${baseUrl}/devises/${id}`);
            toast.success('Devise supprimée avec succès');
            //navigate("/devises");
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const devisesSlice = createSlice({
    name: "devises",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL devises
        [getAllDevises.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllDevises.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllDevises.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE devise
        [newDevise.pending]: (state, action) => {
            state.loading = true;
        },
        [newDevise.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newDevise.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE devise
        [deleteDevise.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteDevise.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteDevise.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE devise
        [updateDevise.pending]: (state, action) => {
            state.loading = true;
        },
        [updateDevise.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateDevise.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default devisesSlice;