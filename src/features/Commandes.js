import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllCommandes = createAsyncThunk("commandes/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/commandes`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newCommande = createAsyncThunk("commandes/create",

    async (data, { rejectWithValue }) => {
        try {
            const resp = await axios.post(`${baseUrl}/commandes`, data);
            if (resp && resp.data) {
                toast.success('Commande ajoutée avec succès');
            }
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updateCommande = createAsyncThunk("commandes/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/commandes/${data && data.id}`, data && data.form);
            toast.success('Commande modifiée avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const deleteCommande = createAsyncThunk("commandes/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/commandes/${id}`);
            toast.success('Commande supprimée avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const commandesSlice = createSlice({
    name: "commandes",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {

        [getAllCommandes.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllCommandes.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllCommandes.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
      //  CREATE Commande
        [newCommande.pending]: (state, action) => {
            state.loading = true;
        },
        [newCommande.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newCommande.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
       // UPDATE Commande
         [updateCommande.pending]: (state, action) => {
             state.loading = true;
         },
         [updateCommande.fulfilled]: (state, action) => {
             state.loading = false;
             state.isSuccess = true;
             state.value = state.value.filter(val => {
                 return val.id !== action.payload.id;
             })
             state.value.push(action.payload);
         },
         [updateCommande.rejected]: (state, action) => {
             state.loading = false;
             state.isSuccess = false;
         },
         // DELETE Commande
         [deleteCommande.pending]: (state, action) => {
             state.loading = true;
         },
         [deleteCommande.fulfilled]: (state, action) => {
             state.loading = false;
             state.value = state.value.filter(val => {
                 return val.id !== action.payload
             })
             state.isSuccess = true;
         },
         [deleteCommande.rejected]: (state, action) => {
             state.loading = false;
             state.isSuccess = false;
         },
    }
});

export default commandesSlice;