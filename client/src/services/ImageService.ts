import {api} from "../lib/axios.ts";
import {IImage} from "../commons/interfaces.ts";

const findAll = () => {
    return api.get('/images');
}

// const save = (local: ILocal) => {
//     return api.post('/locals', local);
// }

const save = (formData: FormData) => {
    return api.post("/images/upload-db", formData);
};

const update = (image: IImage) => {
    return api.post(`/images/${image.id}`, image);
}

const findById = (id: number) => {
    return api.get(`/images/${id}`);
}

const remove = (id: number) => {
    return api.delete(`/images/${id}`);
}

const findAllByLocalsId = (id: number) => {
    return api.get(`/images/list/${id}`);
};

const imageService = {
    findAll,
    save,
    findById,
    remove,
    update,
    findAllByLocalsId
}
export default imageService;