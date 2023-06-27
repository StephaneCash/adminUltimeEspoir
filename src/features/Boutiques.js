import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../bases/basesUrl";

export const getAllBoutiques = createAsyncThunk("boutiques/getData", async (arg, {
    rejectWithValue
}) => {
    try {
        const { data } = await axios.get(`${baseUrl}/boutiques`);
        return data
    } catch (error) {
        rejectWithValue(error.response);
    }
});

export const newBoutique = createAsyncThunk("boutiques/create",
    async (data) => {
        try {
            const resp = await axios.post(`${baseUrl}/boutiques`, data);
            toast.success('Boutique ajoutée avec succès');
            return resp.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error && error.response && error.response.data && error.response.data.message[0]);
            }
        }
    });

export const updateBoutqiue = createAsyncThunk("boutiques/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/boutiques/${data && data.id}`, data && data.form);
            toast.success('Boutique modifiée avec succès');
            //navigate("/categories");
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const deleteBoutique = createAsyncThunk("boutiques/delete",
    async (id) => {
        try {
            //  let navigate = useNavigate();
            await axios.delete(`${baseUrl}/boutiques/${id}`);
            toast.success('Boutique supprimée avec succès');
            //navigate("/categories");
            return id;
        } catch (error) {
            console.log(error.response)
        }
    })

export const activeOrDesactive = createAsyncThunk("boutiques/update",
    async (data) => {
        try {
            const resp = await axios.put(`${baseUrl}/boutiques/${data && data.id}`, {
                isActive: data.isActive
            });
            toast.success('Boutique status modifié avec succès');
            return resp.data;
        } catch (error) {
            console.log(error.response);
        }
    });

export const addClassifications = createAsyncThunk("boutiques/addClassification",
    async (data) => {
        try {
            await axios.post(`${baseUrl}/classifications/v1/boutiques`, {
                boutiqueId: data.boutiqueId,
                classificationId: data.classificationId
            });
            toast.success('Classifications modifiées avec succès');
            return data;
        } catch (error) {
            console.log(error.response);
            toast.error(error && error.response && error.response.data && error.response.data.message)
            toast.error(error && error.response && error.response.data && error.response.data.message[0] && error.response.data.message[0])
        }
    });

export const removeClassifications = createAsyncThunk("boutiques/removeClassification",
    async (data) => {
        try {
            await axios.patch(`${baseUrl}/classifications/v1/boutiques`, {
                boutiqueId: data.boutiqueId,
                classificationId: data.classificationId
            });
            toast.success('Classifications remove avec succès');
            return data;
        } catch (error) {
            toast.error(error && error.response && error.response.data && error.response.data.message)
            console.log(error.response);
        }
    });

export const boutiqueSlice = createSlice({
    name: "boutiques",
    initialState: {
        value: [],
        isSuccess: false,
        loading: false
    },
    extraReducers: {
        //GET ALL boutiques
        [getAllBoutiques.pending]: (state, { payload }) => {
            state.loading = true;
            state.isSuccess = false;
        },
        [getAllBoutiques.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = action.payload;
            state.isSuccess = true;
        },
        [getAllBoutiques.rejected]: (state, { payload }) => {
            state.loading = false;
            state.isSuccess = false;
        },
        //CREATE boutique
        [newBoutique.pending]: (state, action) => {
            state.loading = true;
        },
        [newBoutique.fulfilled]: (state, action) => {
            state.loading = false;
            state.value.push(action.payload)
            state.isSuccess = true;
        },
        [newBoutique.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // DELETE boutique
        [deleteBoutique.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteBoutique.fulfilled]: (state, action) => {
            state.loading = false;
            state.value = state.value.filter(val => {
                return val.id !== action.payload
            })
            state.isSuccess = true;
        },
        [deleteBoutique.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE boutique
        [updateBoutqiue.pending]: (state, action) => {
            state.loading = true;
        },
        [updateBoutqiue.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [updateBoutqiue.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // UPDATE boutique
        [activeOrDesactive.pending]: (state, action) => {
            state.loading = true;
        },
        [activeOrDesactive.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value = state.value.filter(val => {
                return val.id !== action.payload.id;
            })
            state.value.push(action.payload);
        },
        [activeOrDesactive.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // ADD CLASSIFICATIONS
        [addClassifications.pending]: (state, action) => {
            state.loading = true;
        },
        [addClassifications.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value.map((val) => {
                if (action.payload && action.payload.boutiqueId && parseInt(val.id) === parseInt(action.payload.boutiqueId)) {
                    return action.payload.classificationId && action.payload.classificationId.map(value => {
                        return val.classifications.push(value)
                    })
                }
            });
        },
        [addClassifications.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
        // REMOVE CLASSIFICATIONS
        [removeClassifications.pending]: (state, action) => {
            state.loading = true;
        },
        [removeClassifications.fulfilled]: (state, action) => {
            state.loading = false;
            state.isSuccess = true;
            state.value.filter(val => {
                return val.id !== action.payload.boutiqueId;
            })
            state.value.push(action.payload);
        },
        [removeClassifications.rejected]: (state, action) => {
            state.loading = false;
            state.isSuccess = false;
        },
    }
});

export default boutiqueSlice;