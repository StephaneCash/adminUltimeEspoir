import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAlltaux = createAsyncThunk("taux/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/taux`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newTaux = createAsyncThunk("taux/create",

    async (data, { rejectWithValue }) => {
        try {
            const resp = await axios.post(`${baseUrl}/taux`, data);
            if (resp && resp.data) {
                toast.success('Taux ajouté avec succès');
            }
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updateTaux = createAsyncThunk("taux/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/taux/${data && data.id}`, data.data);
            toast.success('Taux modifié avec succès');
            console.log(resp.data)
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const deleteTaux = createAsyncThunk("taux/delete",
    async (id) => {
        try {
            //  let navigate = useNavigate();
            await axios.delete(`${baseUrl}/taux/${id}`);
            toast.success('Taux supprimé avec succès');
            //navigate("/taux");
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const tauxSlice = createSlice({
    name: "taux",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL taux
        [getAlltaux.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAlltaux.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAlltaux.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE Taux
        [newTaux.pending]: (state, action) => {
            state.loading = true;
        },
        [newTaux.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newTaux.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE Taux
        [deleteTaux.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteTaux.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteTaux.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE Taux
        [updateTaux.pending]: (state, action) => {
            state.loading = true;
        },
        [updateTaux.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateTaux.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default tauxSlice;