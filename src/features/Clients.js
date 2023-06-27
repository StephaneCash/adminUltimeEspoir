import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllClients = createAsyncThunk("clients/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/clients`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newClient = createAsyncThunk("clients/create",

    async (data, { rejectWithValue }) => {
        try {
            //  let navigate = useNavigate();
            const resp = await axios.post(`${baseUrl}/clients`, data);
            if (resp && resp.data) {
                toast.success('Client ajouté avec succès');
            }
            //navigate("/clients");
            return resp.data && resp.data.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updateClient = createAsyncThunk("clients/update",
    async (data) => {
        try {
            //  let navigate = useNavigate();
            const resp = await axios.put(`${baseUrl}/clients/${data && data.id}`, data && data.form);
            toast.success('Client modifié avec succès');
            //navigate("/clients");
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const deleteClient = createAsyncThunk("clients/delete",
    async (id) => {
        try {
            //  let navigate = useNavigate();
            await axios.delete(`${baseUrl}/clients/${id}`);
            toast.success('Client supprimée ave succès');
            //navigate("/clients");
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const clientsSlice = createSlice({
    name: "clients",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL clients
        [getAllClients.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllClients.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllClients.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE Client
        [newClient.pending]: (state, action) => {
            state.loading = true;
        },
        [newClient.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newClient.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE CATGORIE
        [deleteClient.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteClient.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteClient.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE Client
        [updateClient.pending]: (state, action) => {
            state.loading = true;
        },
        [updateClient.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateClient.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default clientsSlice;