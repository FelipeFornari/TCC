import {api} from "../lib/axios.ts";
import {ILocal, IUse} from "../commons/interfaces.ts";

const findAll = () => {
    return api.get('/use');
}

const save = (use: IUse) => {
    return api.post('/use', use);
}

const update = (use: IUse) => {
    return api.post(`/use/${use.id}`, use);
}

const findById = (id: number) => {
    return api.get(`/use/${id}`);
}

const remove = (id: number) => {
    return api.delete(`/use/${id}`);
}

const findByLocal = (local: ILocal) => {
    return api.get(`/use/search/local?local=${local}`);
}

const findAllByLocalId = (id: number) => {
    return api.get(`/use/search/localId?id=${id}`);
}

const useService = {
    findAll,
    save,
    findById,
    remove,
    update,
    findByLocal,
    findAllByLocalId,
}

export default useService;