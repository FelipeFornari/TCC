import {api} from "../lib/axios.ts";
import {IModality} from "../commons/interfaces.ts";

const findAll = () => {
    return api.get('/modalities');
}

const save = (functionalities: IModality) => {
    return api.post('/modalities', functionalities);
}

const update = (functionalities: IModality) => {
    return api.post(`/modalities/${functionalities.id}`, functionalities);
}

const findById = (id: number) => {
    return api.get(`/modalities/${id}`);
}

const remove = (id: number) => {
    return api.delete(`/modalities/${id}`);
}

const modalityService = {
    findAll,
    save,
    findById,
    remove,
    update
}

export default modalityService;