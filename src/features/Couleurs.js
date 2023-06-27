import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllCouleurs = createAsyncThunk("couleurs/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/couleurs`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
        console.log(error.response)
    }
});

export const newCouleur = createAsyncThunk("couleurs/create",

    async (data, { rejectWithValue }) => {
        try {
            //  let navigate = useNavigate();
            const resp = await axios.post(`${baseUrl}/couleurs`, data);
            if (resp && resp.data) {
                toast.success('Couleur ajouté avec succès');
            }
            //navigate("/contacts");
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updateCouleur = createAsyncThunk("couleurs/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/couleurs/${data && data.id}`, data && data.data);
            toast.success('Couleur modifiée avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const deleteCouleur = createAsyncThunk("couleurs/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/couleurs/${id}`);
            toast.success('Couleur supprimée avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const couleursSlice = createSlice({
    name: "couleurs",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {

        [getAllCouleurs.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllCouleurs.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getAllCouleurs.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE produit
        [newCouleur.pending]: (state, action) => {
            state.loading = true;
        },
        [newCouleur.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newCouleur.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE COULEUR
        [updateCouleur.pending]: (state, action) => {
            state.loading = true;
        },
        [updateCouleur.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.unshift(action.payload);
        },
        [updateCouleur.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE COULEUR
        [deleteCouleur.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteCouleur.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteCouleur.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
    }
});

export default couleursSlice;