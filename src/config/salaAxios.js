import axios from "axios";

const salaAxios = axios.create({
    baseURL:'http://localhost:4000/api'
})

export default salaAxios;