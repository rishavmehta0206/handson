import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllUsers = createAsyncThunk("users/fetchUsers", async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json());
    console.log('response',response)
    return response
})

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.users = action.payload
        });
    }
})

export const getAllUsers = (state) => state.users.users

export default usersSlice.reducer