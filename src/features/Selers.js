import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllSellers = createAsyncThunk("users-clients/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/users-clients`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newSeler = createAsyncThunk("users-clients/create",

    async (data, { rejectWithValue }) => {
        try {
            //  let navigate = useNavigate();
            const resp = await axios.post(`${baseUrl}/users-clients`, data);
            if (resp && resp.data) {
                toast.success('Seler ajouté avec succès');
            }
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            rejectWithValue(error.response)
        }
    });

export const updateSeler = createAsyncThunk("users-clients/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/users-clients/${data && data.id}`, data.data);
            toast.success('Seler modifié avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const deleteSeler = createAsyncThunk("users-clients/delete",
    async (id) => {
        try {
            //  let navigate = useNavigate();
            await axios.delete(`${baseUrl}/users-clients/${id}`);
            toast.success('Seler supprimé avec succès');
            //navigate("/users-clients");
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const removeUserInShop = createAsyncThunk("users-clients/remove",
    async (data) => {
        try {
            await axios.patch(`${baseUrl}/users-clients/v1/boutiques`, {
                userClientId: data.userClientId,
                boutiqueId: data.boutiqueId
            });
            toast.success('Seler remove avec succès');
            return data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message[0]);
        }
    });

export const usersClientsSlice = createSlice({
    name: "users-clients",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL users-clients
        [getAllSellers.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllSellers.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllSellers.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE Seler
        [newSeler.pending]: (state, action) => {
            state.loading = true;
        },
        [newSeler.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newSeler.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE Seler
        [deleteSeler.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteSeler.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteSeler.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE Seler
        [updateSeler.pending]: (state, action) => {
            state.loading = true;
        },
        [updateSeler.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateSeler.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //REMOVE USER ADMIN SHOP
        [removeUserInShop.pending]: (state, action) => {
            state.loading = true;
        },
        [removeUserInShop.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            let findUser = state.value.filter(val => {
                return parseInt(val.id) === parseInt(action.payload.userClientId);
            })
            findUser && findUser.boutiques && findUser.boutiques.filter((val) => val.id !== action.payload.boutiqueId);
            state.value = state.value.filter(val => {
                return val.id !== action.payload.userClientId
            })
            state.value.unshift(findUser);
        },
        [removeUserInShop.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default usersClientsSlice;