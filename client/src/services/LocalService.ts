import {api} from "../lib/axios.ts";
import {ILocal} from "../commons/interfaces.ts";

const findAll = () => {
    return api.get('/locals');
}

const save = (local: ILocal) => {
    return api.post('/locals', local);
}

// const save = (formData: FormData) => {
//     return api.post("/locals/upload-db", formData);
// };

const update = (local: ILocal) => {
    return api.post(`/locals/${local.id}`, local);
}

const findById = (id: number) => {
    return api.get(`/locals/${id}`);
}

const findByName = (name: string) => {
    return api.get(`/locals/search?name=${name}`);
}

const remove = (id: number) => {
    return api.delete(`/locals/${id}`);
}

const localService = {
    findAll,
    save,
    findById,
    findByName,
    remove,
    update
}
export default localService;