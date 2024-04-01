import {api} from "../lib/axios.ts";
import {ICities} from "../commons/interfaces.ts";

const findAll = () => {
    return api.get('/city');
}

const save = (cities: ICities) => {
    return api.post('/city', cities);
}

const update = (cities: ICities) => {
    return api.post(`/city/${cities.id}`, cities);
}

const findById = (id: number) => {
    return api.get(`/city/${id}`);
}

const remove = (id: number) => {
    return api.delete(`/city/${id}`);
}


const citiesService = {
    findAll,
    save,
    findById,
    remove,
    update,
}

export default citiesService;