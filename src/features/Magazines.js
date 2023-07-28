import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllMagazines = createAsyncThunk("magazines/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/magazines`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newMagazine = createAsyncThunk("magazines/create",

    async (data, { rejectWithValue }) => {
        try {
            //  let navigate = useNavigate();
            const resp = await axios.post(`${baseUrl}/magazines`, data);
            if (resp && resp.data) {
                toast.success('Magazine ajouté avec succès');
            }
            //navigate("/magazines");
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updateMagazine = createAsyncThunk("magazines/update",
    async (data) => {
        try {
            //  let navigate = useNavigate();
            const resp = await axios.put(`${baseUrl}/magazines/${data && data.id}`, data && data.form);
            toast.success('Magazine modifié avec succès');
            //navigate("/magazines");
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const addDoc = createAsyncThunk("magazines/addDoc",
    async (data) => {
        try {
            const resp = await axios.patch(`${baseUrl}/magazines/addPDF/${data && data.id}`, data && data.form);
            toast.success('Document ajouté avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const deleteMagazine = createAsyncThunk("magazines/delete",
    async (id) => {
        try {
            //  let navigate = useNavigate();
            await axios.delete(`${baseUrl}/magazines/${id}`);
            toast.success('Magazine supprimé avec succès');
            //navigate("/magazines");
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const magazineSlice = createSlice({
    name: "magazines",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL magazines
        [getAllMagazines.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllMagazines.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllMagazines.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE CATEGORIE
        [newMagazine.pending]: (state, action) => {
            state.loading = true;
        },
        [newMagazine.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newMagazine.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE CATGORIE
        [deleteMagazine.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteMagazine.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteMagazine.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE CATEGORIE
        [updateMagazine.pending]: (state, action) => {
            state.loading = true;
        },
        [updateMagazine.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateMagazine.rejected]: (state, action) => {
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

export default magazineSlice;