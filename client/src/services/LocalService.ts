import {api} from "../lib/axios.ts";
import {ILocal} from "../commons/interfaces.ts";

const findAll = () => {
    return api.get('/locals');
}

const findAllImages = (id: number) => {
    return api.get(`/images/list/${id}`)
}

const save = (formData: FormData) => {
    return api.post("/locals/save-and-upload", formData);
};

// const update = (formData: FormData) => {
//     return api.patch("/locals/update-and-upload", formData);
// };

const update = (locals: ILocal) => {
    return api.post(`/locals/${locals.id}`, locals);
}

const findById = (id: number) => {
    return api.get(`/locals/${id}`);
}

const findAllByName = (name: string) => {
    return api.get(`/locals/search/name?name=${name}`);
}

const findAllByCoordinate = (coordinate: number[]) => {
    return api.get(`/locals/search/coordinate?coordinate=${coordinate}`);
}

const remove = (id: number) => {
    return api.delete(`/locals/${id}`);
}

const localService = {
    findAll,
    save,
    findById,findAllByName,
    remove,
    update,
    findAllImages,
    findAllByCoordinate
}
export default localService;