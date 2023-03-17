import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addJobs, deleteJobs, getJobs, editJobs } from "./jobsAPI"


const initialState = {
    jobs: [],
    isLoading: false,
    isError: false,
    error: "",
    editing: {},
    searchText: "",
    salarySort: ""
}

// async thunks

export const fetchJobs = createAsyncThunk(
    "jobs/fetchJobs", async (sort) => {
        const jobs = await getJobs(sort)
        return jobs
    }
)

export const createJobs = createAsyncThunk("jobs/createJobs", async (data) => {
    const job = await addJobs(data);
    return job;
})

export const removeJobs = createAsyncThunk("jobs/removeJobs", async (id) => {
    const job = await deleteJobs(id)
    return job
})

export const changeJob = createAsyncThunk("jobs/changeJobs", async ({ id, data }) => {
    const job = await editJobs(id, data);
    return job;
})

// create slice
const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        editJob: (state, action) => {
            state.editing = action.payload
        },
        searchFilter: (state, action) => {
            state.searchText = action.payload
        },
        salaryFilter: (state, action) => {
            state.salarySort = action.payload
        }
    },
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
            .addCase(createJobs.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(createJobs.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.jobs.push(action.payload)
            })
            .addCase(createJobs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error?.message
                state.jobs = []
            })
            .addCase(removeJobs.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(removeJobs.fulfilled, (state, action) => {
                console.log(action)
                state.isError = false
                state.isLoading = false
                state.jobs = state.jobs.filter(job => job.id !== action.meta.arg)
            })
            .addCase(removeJobs.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error?.message
            })
            .addCase(changeJob.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(changeJob.fulfilled, (state, action) => {
                console.log(action)
                state.isError = false
                state.isLoading = false

                const indexToUpdate = state.jobs.findIndex(j => j.id === action.payload.id)

                state.jobs[indexToUpdate] = action.payload

            })
            .addCase(changeJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
    }
})

export default jobsSlice.reducer;
export const { editJob, searchFilter, salaryFilter } = jobsSlice.actions
