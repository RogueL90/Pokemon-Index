import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/pokemon/'

const getReq = () => {
    return axios.get(baseUrl)
}

const addReq = (newPoke) => {
    return axios.post(baseUrl, newPoke)
}

const deleteReq = (id) => {
    return axios.delete(`${baseUrl+id}`)
}

export default {getReq, deleteReq, addReq}
