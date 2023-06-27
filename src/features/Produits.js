import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllProduits = createAsyncThunk("produits/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/produits`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newProduit = createAsyncThunk("produits/create",

    async (data, { rejectWithValue }) => {
        try {
            //  let navigate = useNavigate();
            const resp = await axios.post(`${baseUrl}/produits`, data);
            if (resp && resp.data) {
                toast.success('Produit ajouté avec succès');
            }
            //navigate("/contacts");
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updateProduit = createAsyncThunk("produits/update",
    async (data) => {
        try {
            //  let navigate = useNavigate();
            const resp = await axios.put(`${baseUrl}/produits/${data && data.id}`, data && data.form);
            toast.success('Produit modifié avec succès');
            //navigate("/contacts");
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const deleteProduit = createAsyncThunk("produits/delete",
    async (id) => {
        try {
            //  let navigate = useNavigate();
            await axios.delete(`${baseUrl}/produits/${id}`);
            toast.success('produit supprimé avec succès');
            //navigate("/contacts");
            return id;
        } catch (error) {
            console.log(error.response)
        }
    });

export const activeOrDesactive = createAsyncThunk("produits/active",
    async (data) => {
        console.log(data)
        try {
            const resp = await axios.put(`${baseUrl}/produits/${data && data.id}`, {
                isActive: ! data.isActive
            });
            toast.success('Produit status modifié avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const produitsSlice = createSlice({
    name: "produits",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL produits
        [getAllProduits.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllProduits.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllProduits.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE produit
        [newProduit.pending]: (state, action) => {
            state.loading = true;
        },
        [newProduit.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newProduit.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE produit
        [deleteProduit.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteProduit.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteProduit.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE Produit
        [updateProduit.pending]: (state, action) => {
            state.loading = true;
        },
        [updateProduit.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.unshift(action.payload);
        },
        [updateProduit.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // ACTIVE OR DISABLED
        [activeOrDesactive.pending]: (state, action) => {
            state.loading = true;
        },
        [activeOrDesactive.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.unshift(action.payload);
        },
        [activeOrDesactive.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default produitsSlice;