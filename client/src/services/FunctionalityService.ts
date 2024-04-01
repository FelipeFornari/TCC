import {api} from "../lib/axios.ts";
import {IFunctionality} from "../commons/interfaces.ts";

const findAll = () => {
    return api.get('/functionalities');
}

const save = (functionalities: IFunctionality) => {
    return api.post('/functionalities', functionalities);
}

const update = (functionalities: IFunctionality) => {
    return api.post(`/functionalities/${functionalities.id}`, functionalities);
}

const findById = (id: number) => {
    return api.get(`/functionalities/${id}`);
}

const remove = (id: number) => {
    return api.delete(`/functionalities/${id}`);
}

const functionalityService = {
    findAll,
    save,
    findById,
    remove,
    update
}

export default functionalityService;