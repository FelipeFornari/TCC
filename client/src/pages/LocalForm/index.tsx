import {ChangeEvent, useEffect, useMemo, useState} from "react";
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
import {ILocal, ICities} from "../../commons/interfaces.ts";
import localService from "../../services/LocalService.ts";
import {Point} from "ol/geom";
import CitiesService from "../../services/CitiesService.ts";
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import imageService from "../../services/ImageService.ts";
import {Image} from "react-bootstrap";
import {Delete} from "@mui/icons-material";

export function MapFormPage() {

    useGeographic();
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<ILocal>();
    const [zoom] = useState(13);
    const cord = new Point([-52.67188958131138, -26.227052900970108]);
    const [crd, setcrd] = useState<Point>(cord);
    const [apiError, setApiError] = useState("");
    const [cities, setCities] = useState<ICities[]>([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const [images, setImages] = useState([]);
    const [image, setImage] = useState();
    const [show, setShow] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [entity, setEntity] = useState<ILocal>({
        cep: "",
        city: {
            id: undefined,
            city: "",
            uf: ""
        },
        coordinate: [0, 0],
        description: "",
        district: "",
        id: undefined,
        name: "",
        number: "",
        street: "",
    });

    const view = useMemo(
        () =>
            new View({
                center: [cord.getCoordinates()[0], cord.getCoordinates()[1]],
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

    const loadData = async () => {
        await CitiesService.findAll()
            .then((response) => {
                setCities(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a combo de cidades.");
            });

        if (id) {
            imageService.findAllByLocalsId(parseInt(id))
                .then((response) => {
                    setImages(response.data);
                    setApiError("");
                })
                .catch(() => {
                    setApiError("Falha ao carregar imagens.");
                });

            localService.findById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setEntity({
                            id: response.data.id,
                            cep: response.data.cep,
                            city: {
                                id: response.data.city.id,
                                city: response.data.city.city,
                                uf: response.data.city.uf
                            },
                            coordinate: response.data.coordinate,
                            description: response.data.description,
                            district: response.data.district,
                            name: response.data.name,
                            number: response.data.number,
                            street: response.data.street,
                        });
                        setApiError("");
                    } else {
                        setApiError("Falha ao carregar o local");
                    }
                })
                .catch(() => {
                    setApiError("Falha ao carregar o local e/ou imagens");
                });
        } else {
            setEntity((previousEntity) => {
                return {
                    ...previousEntity,
                    city: {id: cities[0]?.id, city: "", uf: ""},
                };
            });
        }
    };

    const onFileChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const imagesArray = []
            for (let i = 0; i < event.target.files.length; i++) {
                imagesArray.push(event.target.files[i])
            }

            // @ts-expect-error <html>TS2345: Argument of type 'File[]' is not assignable to parameter of type 'SetStateAction&lt;never[]&gt;'.<br/>Type 'File[]' is not assignable to type 'never[]'.<br/>Type 'File' is not assignable to type 'never'.
            setImages(imagesArray);
        }


        // @ts-expect-error <html>TS2345: Argument of type 'File | null' is not assignable to parameter of type 'SetStateAction&lt;undefined&gt;'.<br/>Type 'null' is not assignable to type 'SetStateAction&lt;undefined&gt;'.
        setImage(event.target.files ? event.target.files[0] : null);
        // setImages(event.target.files ? event.target.files[0] : null);
    };

    const onSubmit = (data: ILocal) => {
        const local: ILocal = {
            ...data,
            id: entity.id,
            coordinate: crd.getCoordinates(),
            city: {id: data.city.id, city: "", uf: ""},
        };
        const formData = new FormData();
        if (images) {
            // let index = 0;
            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i]);
            }
        }
        // if (image)
        //     formData.append("images", image);
        const blob = new Blob([JSON.stringify(local)], {
            type: "application/json",
        });
        formData.append("local", blob);

        localService.save(formData)
            .then(() => {
                navigate("/cadastro/locais/list");
            })
            .catch(() => {
                setApiError("Falha ao salvar o local.");
            });
    };

    const handleClose = () => {
        setShow(false)
        window. location. reload();
    };

    const handleShow = () => setShow(true);

    const onRemove = (id: number) => {
        imageService.deleteFile(id)
            .then(() => {
                setShowDeleteMessage(true);
                //loadImagesRow();
                setTimeout(() => {
                    setShowDeleteMessage(false);
                }, 1500);
                setApiError("");
            }).catch(() => {
            setApiError("Falha ao remover a imagem");
        });
    }

    function loadImagesRow() {
        if(id) {
            return(
                images.map((image: any) => (
                    <Row
                        key={image.id}
                    >
                        <Col>
                            <Image
                                style={{width: 100, height: 100}}
                                src={`data:image;base64,${image.image}`}
                                fluid
                            />
                        </Col>
                        <Col>
                            <Button
                                leftIcon={<Delete/>}
                                onClick={() => onRemove(image.id)}
                            >
                            </Button>
                        </Col>
                        <Col>
                            <p>{image.id}</p>
                            <p>{image.imageName}</p>
                        </Col>
                    </Row>
                )));
        }
    }

    return (
        <>
            <Map center={[cord.getCoordinates()[0], cord.getCoordinates()[1]]} zoom={13} view={view}
                 callBack={map => map.on('click', function (ev) {
                     const pt = new Point(ev.coordinate);
                     console.log("ev.coord" + ev.coordinate);
                     setcrd(pt);
                     handleShow();
                 })}
            >
                <Layers>
                    <TileLayer source={osm()} zIndex={0}/>
                </Layers>
                <Controls>
                    <FullScreenControl/>
                </Controls>
            </Map>

            <Modal show={show}
                   onHide={handleClose}
                   fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Cadastrar Coordenadas:
                        {crd.getCoordinates()[0].toString()}
                        {crd.getCoordinates()[1].toString()}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col>
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
                            </Col>
                        </Row>
                        <Row>
                            <Col>
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
                            </Col>
                            <Col>
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
                            </Col>
                            <Col>
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
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormControl isInvalid={errors?.cep && true}>
                                    <FormLabel htmlFor="cep">CEP</FormLabel>
                                    <Input
                                        id="cep"
                                        placeholder="00000000"
                                        {...register("cep", {
                                            required: "O campo CEP é obrigatório",
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.cep && errors.cep.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </Col>
                            <Col>

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
                            </Col>
                        </Row>
                        <Row>
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
                        </Row>
                        <Row>
                            <Col>
                                <FormControl>
                                    <FormLabel htmlFor="image">
                                        Imagem</FormLabel>
                                    <Input type="file"
                                           colorScheme="teal"
                                           multiple={true}
                                           id={"images"}
                                           onChange={onFileChangeHandler}
                                    />
                                    <FormErrorMessage>
                                        {/*{(images?.length == 0) && "Selecione uma imagem"}*/}
                                    </FormErrorMessage>
                                </FormControl>
                            </Col>
                            <Col>
                                {loadImagesRow()}
                            </Col>
                        </Row>
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
                    {showDeleteMessage && <div className="alert alert-success">imagem removida com sucesso!</div>}
                </Modal.Body>
            </Modal>

        </>
    );
}
