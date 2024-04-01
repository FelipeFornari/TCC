import {api} from "../lib/axios.ts";
import {IEntrusted, IModality} from "../commons/interfaces.ts";

const findAll = () => {
    return api.get('/entrusteds');
}

const save = (entrusted: IEntrusted) => {
    return api.post('/entrusteds', entrusted);
}

const update = (entrusted: IModality) => {
    return api.post(`/entrusteds/${entrusted.id}`, entrusted);
}

const findById = (id: number) => {
    return api.get(`/entrusteds/${id}`);
}

const remove = (id: number) => {
    return api.delete(`/entrusteds/${id}`);
}

const entrustedService = {
    findAll,
    save,
    findById,
    remove,
    update
}

export default entrustedService;