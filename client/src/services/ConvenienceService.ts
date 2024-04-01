import {api} from "../lib/axios.ts";
import {IConvenience} from "../commons/interfaces.ts";

const findAll = () => {
    return api.get('/convenience');
}

const save = (convenience: IConvenience) => {
    return api.post('/convenience', convenience);
}

const update = (convenience: IConvenience) => {
    return api.post(`/convenience/${convenience.id}`, convenience);
}

const findById = (id: number) => {
    return api.get(`/convenience/${id}`);
}

const remove = (id: number) => {
    return api.delete(`/convenience/${id}`);
}

const convenienceService = {
    findAll,
    save,
    findById,
    remove,
    update
}

export default convenienceService;