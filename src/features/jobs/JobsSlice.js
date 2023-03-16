import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getJobs } from "./jobsAPI"


const initialState = {
    jobs: [],
    isLoading: false,
    isError: false,
    error: "",
}

// async thunks

export const fetchJobs = createAsyncThunk(
    "jobs/fetchJobs", async () => {
        const jobs = await getJobs()
        return jobs
    }
)

// create slice
const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.jobs = action.payload
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error?.message
                state.jobs = []
            })
    }
})

export default jobsSlice.reducer;
