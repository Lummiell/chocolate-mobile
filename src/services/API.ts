import axios from 'axios'

const api = axios.create({baseURL:'https://api-chocolate-backend.herokuapp.com/'})

export default api;