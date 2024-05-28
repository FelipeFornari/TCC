import {api} from "../lib/axios.ts";
import {IAccessibility} from "../commons/interfaces.ts";

const findAll = () => {
    return api.get('/accessibility');
}

const save = (accessibilities: IAccessibility) => {
    return api.post('/accessibility', accessibilities);
}

const update = (accessibilities: IAccessibility) => {
    return api.post(`/accessibility/${accessibilities.id}`, accessibilities);
}

const findById = (id: number) => {
    return api.get(`/accessibility/${id}`);
}

const remove = (id: number) => {
    return api.delete(`/accessibility/${id}`);
}


const AccessibilitiesService = {
    findAll,
    save,
    findById,
    remove,
    update,
}

export default AccessibilitiesService;