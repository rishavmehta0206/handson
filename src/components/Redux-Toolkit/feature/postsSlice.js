import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchAllPosts = createAsyncThunk("posts/fetchPosts", async (_, { getState }) => {
    let { posts, lastTimeFetched } = getState().posts;
    let { users } = getState().users;
    let elapsedTime = lastTimeFetched && (Date.now() - lastTimeFetched < 60 * 1000);
    console.log(lastTimeFetched, elapsedTime, posts);
    console.log("getState", posts, users)
    if (elapsedTime) {
        return { data: posts, isFromCache: true }
    }
    else {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json());
        return {
            data: response?.map(data => {
                let user = users.find(user => user.id === data.userId);
                if (user) {
                    return { ...data, user: user }
                }
                return user;
            }), isFromCache: false
        }
    }
})


export const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        loading: false,
        error: null,
        lastTimeFetched: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            const { data, isFromCache } = action.payload;
            state.posts = data;
            if (!isFromCache) {
                state.lastTimeFetched = Date.now();
            }
            state.loading = false;
        });
        builder.addCase(fetchAllPosts.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
    }
})

export const getAllPosts = (state) => state.posts.posts;
export default postSlice.reducer;