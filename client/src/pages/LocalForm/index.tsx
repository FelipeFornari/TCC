import {useEffect, useMemo, useState} from "react";
import {View} from "ol";
import {osm} from "../../components/Map/Source";
import {Layers, TileLayer} from "../../components/Map/Layers";
import Map from "../../components/Map";
import FullScreenControl from "../../components/Map/Controls/FullScreenControl.ts";
import {Controls} from "../../components/Map/Controls/";
import {useGeographic} from "ol/proj";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input, Select,
    Textarea
} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ILocal, ICities, IImage} from "../../commons/interfaces.ts";
import localService from "../../services/LocalService.ts";
import {Point} from "ol/geom";
import Modal from "../../components/Modal/modal.jsx";
import TitleCord from "../../components/TitleCord/titleCord.jsx";
import citiesService from "../../services/CitiesService.ts";
import imageService from "../../services/ImageService.ts";

export function MapFormPage () {

    useGeographic();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ILocal>();
    const [zoom] = useState(13);
    const cord = new Point([-52.67188958131138, -26.227052900970108]);
    //const [coordinates, setCoordinates] = useState([-52.6716, -26.2295])
    const [apiError, setApiError] = useState("");
    const [cities, setCities] = useState<ICities[]>([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [entity, setEntity] = useState<ILocal>({
        id: undefined,
        CEP: "",
        city: {
            id: undefined,
            city: "",
            uF: ""
        },
        coordinate: cord,
        description: "",
        district: "",
        name: "",
        number: "",
        street: "",
        image:[],
    });
    const [openModal, setOpenModal] = useState(false)

    const loadData = async () => {
        await citiesService.findAll().then((response) => {
            setCities(response.data);
            setApiError("");
        })
            .catch(() => {
                setApiError("Falha ao carregar a combo de cidades.");
            });

        if (id) {
            localService.findById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setEntity({
                            id: response.data.id,
                            CEP: response.data.CEP,
                            city: {
                                id: response.data.city.id,
                                city: response.data.city.city,
                                uF: response.data.city.uF
                            },
                            coordinate: cord,
                            description: response.data.description,
                            district: response.data.district,
                            name: response.data.name,
                            number: response.data.number,
                            street: response.data.street,
                            image: [],
                        });
                        setApiError("");
                    } else {
                        setApiError("Falha ao carregar o utilização");
                    }
                })
                .catch(() => {
                    setApiError("Falha ao carregar o utilização");
                });
        } else {
            setEntity((previousEntity) => {
                return {
                    ...previousEntity,
                    city: { id: cities[0]?.id, city: "", uF: "" },
                };
            });
        }
    };

    const view = useMemo(
        () =>
            new View({
                center:[cord.getCoordinates()[0], cord.getCoordinates()[1]],
                zoom,
            }),
        [cord, zoom]
    );

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        reset(entity);
    }, [entity, reset]);

    const onSubmit = (data: ILocal) => {
        const local: ILocal = {
            ...data,
            id: entity.id,
        };

        localService.save(local)
            .then(() => {
                navigate("/cadastro/locais/list");
            })
            .catch(() => {
                setApiError("Falha ao salvar o local.");
            });

        const image: IImage = {
            ...data,
            id: entity.id,
        };

        imageService.save(image)
            .then(() => {
                navigate("/cadastro/locais/list");
            })
            .catch(() => {
                setApiError("Falha ao salvar a imagem.");
            });
    };

    return (
        <>
            <Map center={[cord.getCoordinates()[0], cord.getCoordinates()[1]]} zoom={13} view={view}
                 callBack={map => map.on('click', function (ev) {
                     cord.setCoordinates(ev.coordinate);
                     console.log(cord);
                     setOpenModal(true);
                 })}
            >
                <Layers>
                    <TileLayer source={osm()} zIndex={0}/>
                </Layers>
                <Controls>
                    <FullScreenControl/>
                </Controls>
            </Map>

            <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
                <TitleCord c1={cord.getCoordinates()[0].toString()} c2={cord.getCoordinates()[1].toString()}/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors?.name && true}>
                        <FormLabel htmlFor="name">Nome</FormLabel>
                        <Input
                            id="name"
                            placeholder="Nome do local"
                            {...register("name", {
                                required: "O campo nome é obrigatório",
                            })}
                        />
                        <FormErrorMessage>
                            {errors?.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.city && true}>
                        <FormLabel htmlFor="city">Cidade</FormLabel>
                        <Select
                            id="city"
                            {...register("city.id", {
                                required: "O campo cidade é obrigatório",
                            })}
                            size="sm"
                        >
                            {cities.map((city: ICities) => (
                                <option key={city.id} value={city.id}>
                                    {city.city}
                                </option>
                            ))}
                        </Select>
                        <FormErrorMessage>
                            {errors.city && errors.city.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors?.street && true}>
                        <FormLabel htmlFor="street">Logradouro</FormLabel>
                        <Input
                            id="street"
                            placeholder="Nome do logradouro"
                            {...register("street", {
                                required: "O campo logradouro é obrigatório",
                            })}
                        />
                        <FormErrorMessage>
                            {errors?.street && errors.street.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors?.number && true}>
                        <FormLabel htmlFor="number">Número</FormLabel>
                        <Input
                            id="number"
                            placeholder="000"
                            {...register("number", {
                                required: "O campo número é obrigatório",
                            })}
                        />
                        <FormErrorMessage>
                            {errors?.number && errors.number.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors?.CEP && true}>
                        <FormLabel htmlFor="CEP">CEP</FormLabel>
                        <Input
                            id="CEP"
                            placeholder="00000000"
                            {...register("CEP", {
                                required: "O campo CEP é obrigatório",
                            })}
                        />
                        <FormErrorMessage>
                            {errors?.CEP && errors.CEP.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors?.district && true}>
                        <FormLabel htmlFor="district">Bairro</FormLabel>
                        <Input
                            id="district"
                            placeholder="Nome do bairro"
                            {...register("district", {
                                required: "O campo bairro é obrigatório",
                            })}
                        />
                        <FormErrorMessage>
                            {errors?.district && errors.district.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors?.description && true}>
                        <FormLabel htmlFor="description">Descrição</FormLabel>
                        <Textarea
                            id="description"
                            maxLength={1024}
                            placeholder="Descrição do local"
                            {...register("description", {
                                required: "O campo descrição é obrigatório",
                                minLength: {
                                    value: 2,
                                    message: "O tamanho deve ser entre 2 e 1024 caracteres",
                                },
                                maxLength: {
                                    value: 1024,
                                    message: "O tamanho deve ser entre 2 e 1024 caracteres",
                                },
                            })}
                            size="sm"
                        />
                        <FormErrorMessage>
                            {errors?.description && errors.description.message}
                        </FormErrorMessage>
                    </FormControl>
                    
                    <FormControl isInvalid={errors.image && true}>
                        <FormLabel htmlFor="imageName">
                            Imagem</FormLabel>
                        <Input type="file"
                               id={"imageName"}
                               {...register("imageName",{})}/>
                        <FormErrorMessage>
                            {errors.imageName && errors.imageName.message}
                        </FormErrorMessage>
                    </FormControl>

                    {/*<FormControl isInvalid={errors.image && true}>*/}
                    {/*    <FormLabel htmlFor="image">*/}
                    {/*        Imagem</FormLabel>*/}
                    {/*    <Input type="file"*/}
                    {/*           id={"image"}*/}
                    {/*           {...register("image",{})}/>*/}
                    {/*    <FormErrorMessage>*/}
                    {/*        {errors.image && errors.image.message}*/}
                    {/*    </FormErrorMessage>*/}
                    {/*</FormControl>*/}

                    {/*<FormControl isInvalid={errors.image && true}>*/}
                    {/*    <FormLabel htmlFor="image">*/}
                    {/*        Imagem</FormLabel>*/}
                    {/*    <Input type="file"*/}
                    {/*           id={"image"}*/}
                    {/*           {...register("image",{})}/>*/}
                    {/*    <FormErrorMessage>*/}
                    {/*        {errors.image && errors.image.message}*/}
                    {/*    </FormErrorMessage>*/}
                    {/*</FormControl>*/}

                    {/*<FormControl isInvalid={errors.image && true}>*/}
                    {/*    <FormLabel htmlFor="image">*/}
                    {/*        Imagem</FormLabel>*/}
                    {/*    <Input type="file"*/}
                    {/*           id={"image"}*/}
                    {/*           {...register("image",{})}/>*/}
                    {/*    <FormErrorMessage>*/}
                    {/*        {errors.image && errors.image.message}*/}
                    {/*    </FormErrorMessage>*/}
                    {/*</FormControl>*/}

                    {/*<FormControl isInvalid={errors.image && true}>*/}
                    {/*    <FormLabel htmlFor="image">*/}
                    {/*        Planta Baixa</FormLabel>*/}
                    {/*    <Input type="file"*/}
                    {/*           id={"image"}*/}
                    {/*           {...register("image",{})}/>*/}
                    {/*    <FormErrorMessage>*/}
                    {/*        {errors.image && errors.image.message}*/}
                    {/*    </FormErrorMessage>*/}
                    {/*</FormControl>*/}
                    
                    <div className="text-center">
                        <Button
                            mt={4}
                            colorScheme="teal"
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            Salvar
                        </Button>
                    </div>
                </form>
                {apiError && <div className="alert alert-danger">{apiError}</div>}
            </Modal>
        </>
    );
}
