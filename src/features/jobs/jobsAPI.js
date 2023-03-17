import axios from "../../utils/axios"

export const getJobs = async (sort) => {
    let queryString = ""

    if (sort !== "") {
        queryString += `type_like=${sort}`
    }
    const response = await axios.get(`/jobs/?${queryString}`)
    return response.data
}

export const addJobs = async (data) => {
    const response = await axios.post("/jobs", data);
    return response.data
}

export const deleteJobs = async (id) => {
    const response = await axios.delete(`/jobs/${id}`)
    return response.data
}

export const editJobs = async (id, data) => {
    const response = await axios.put(`/jobs/${id}`, data)
    return response.data;
}