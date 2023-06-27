import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../bases/basesUrl";
import { toast } from "react-toastify";

export const getAllUsers = createAsyncThunk("users/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/users`);
        return data;
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newUser = createAsyncThunk("users/create", async (data, {
    rejectWithValue
}) => {
    try {
        const resp = await axios.post(`${baseUrl}/users`, data);
        toast.success('Utilisateur ajouté avec succès')
        return resp.data && resp.data.data;
    } catch (error) {
        rejectWithValue(error.response);
        toast.error(error && error.response && error.response.data && error.response.data.message)
        console.log(error.response)
    }
})

export const updateUser = createAsyncThunk("users/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/users/${data && data.id}`, data && data.form);
            toast.success('Utilisateur modifié avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const deleteUser = createAsyncThunk("users/delete",
    async (id) => {
        try {
            await axios.delete(`${baseUrl}/users/${id}`);
            toast.success('Utilisateur supprimé avec succès');
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const activeOrDesactiveUserStatus = createAsyncThunk("users/updateActiveOrDesacive",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/users/${data && data.id}`, {
                isActive: data.isActive
            });
            toast.success('User status modifié avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const userSlice = createSlice({
    name: "users",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        [getAllUsers.pending]: (state, { payload }) => {
            state.loading = true;
        },
        [getAllUsers.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.value = payload;
            state.isSuccess = true;
        },
        [getAllUsers.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        
        // CREATE USER
        [newUser.pending]: (state, action) => {
            state.loading = true;
        },
        [newUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload);
            state.isSuccess = true;
        },
        [newUser.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        [deleteUser.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE User
        [updateUser.pending]: (state, action) => {
            state.loading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        [activeOrDesactiveUserStatus.pending]: (state, action) => {
            state.loading = true;
        },
        [activeOrDesactiveUserStatus.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [activeOrDesactiveUserStatus.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        }
    }
});

export default userSlice;