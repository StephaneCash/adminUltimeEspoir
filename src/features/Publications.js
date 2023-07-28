import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllPubs = createAsyncThunk("publications/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/publications`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newPub = createAsyncThunk("publications/create",

    async (data, { rejectWithValue }) => {
        try {
            const resp = await axios.post(`${baseUrl}/publications`, data);
            if (resp && resp.data) {
                toast.success('Pub ajoutée avec succès');
            }
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updatePub = createAsyncThunk("publications/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/publications/${data && data.id}`, data && data.form);
            toast.success('Pub modifiés avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

    export const addDoc = createAsyncThunk("publications/addDoc",
    async (data) => {
        try {
            const resp = await axios.patch(`${baseUrl}/publications/addPDF/${data && data.id}`, data && data.form);
            toast.success('Fichier PDF ajouté avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const deletePub = createAsyncThunk("publications/delete",
    async (id) => {
        try {
            //  let navigate = useNavigate();
            await axios.delete(`${baseUrl}/publications/${id}`);
            toast.success('Pub supprimé avec succès');
            //navigate("/publications");
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const publicationSlice = createSlice({
    name: "publications",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL publications
        [getAllPubs.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllPubs.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllPubs.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE CATEGORIE
        [newPub.pending]: (state, action) => {
            state.loading = true;
        },
        [newPub.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newPub.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE CATGORIE
        [deletePub.pending]: (state, action) => {
            state.loading = true;
        },
        [deletePub.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deletePub.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE CATEGORIE
        [updatePub.pending]: (state, action) => {
            state.loading = true;
        },
        [updatePub.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updatePub.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // ADD DOC
        [addDoc.pending]: (state, action) => {
            state.loading = true;
        },
        [addDoc.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [addDoc.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default publicationSlice;