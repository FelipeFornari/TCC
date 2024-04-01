import {IConvenience, IEntrusted, ILocal, IModality, IUse} from "../../commons/interfaces.ts";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea} from "@chakra-ui/react";
import {Point} from "ol/geom";
import useService from "../../services/UseService.ts";
import {useGeographic} from "ol/proj";
import EntrustedService from "../../services/EntrustedService.ts";
import LocalService from "../../services/LocalService.ts";
import ConvenienceService from "../../services/ConvenienceService.ts";
import ModalityService from "../../services/ModalityService.ts";

export function UseFormPage () {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<IUse>();
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const cord = new Point([-52.67188958131138, -26.227052900970108]);
    const [entrusteds, setEntrusteds] = useState<IEntrusted[]>([]);
    const [conveniences, setConveniences] = useState<IConvenience[]>([]);
    const [locals, setLocals] = useState<ILocal[]>([]);
    const [modalities, setModalities] = useState<IModality[]>([]);
    useGeographic();

    const [entity, setEntity] = useState<IUse>({
        id: undefined,
        ageGroup: "",
        closingTime: "",
        convenience: {
            id: undefined,
            description: ""
        },
        creationDate: "",
        entrusted: {
            id: undefined,
            name: "",
            phoneNumber: ""
        },
        local:{
            id: undefined,
            name: "",
            street: "",
            number: "",
            CEP: "",
            district: "",
            city: {
                id: undefined,
                city: "",
                uF: ""
            },
            coordinate: cord,
            description: "",
            imageName: "",
        },
        maximumCapacity: 0,
        modality: {
            id: undefined,
            description: ""
        },
        openingTime: "",
        petAllowed: false,
        reformDate: "",
        scheduling: "",
        specialMaximumCapacity: 0,
        termsOfUse: "",
        usageFee: 0
    });

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        reset(entity);
    }, [entity, reset]);

    const loadData = async () => {
        await EntrustedService.findAll()
            .then((response) => {
                setEntrusteds(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a combo de responsáveis.");
            });

        await LocalService.findAll()
            .then((response) => {
                setLocals(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a combo de locais.");
            });

        await ConvenienceService.findAll()
            .then((response) => {
                setConveniences(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a combo de comodidades.");
            });

        await ModalityService.findAll()
            .then((response) => {
                setModalities(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a combo de modalidades.");
            });

        if (id) {
            useService.findById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setEntity({
                            id: response.data.id,
                            ageGroup: response.data.ageGroup,
                            closingTime: response.data.closingTime,
                            convenience: {
                                id: response.data.convenience.id,
                                description: response.data.convenience.description,
                            },
                            creationDate: response.data.creationDate,
                            entrusted: {
                                id: response.data.entrusted.id,
                                name: response.data.entrusted.name,
                                phoneNumber: response.data.entrusted.phoneNumber
                            },
                            local: {
                                id: response.data.local.id,
                                name: response.data.local.name,
                                street: response.data.local.street,
                                number: response.data.local.number,
                                CEP: response.data.local.CEP,
                                district: response.data.local.district,
                                city: {
                                    id: response.data.local.city.id,
                                    city: response.data.local.city.city,
                                    uF: response.data.local.city.uF
                                },
                                coordinate: response.data.local.coordinate,
                                description: response.data.local.description,
                                imageName: response.data.local.imageName
                            },
                            maximumCapacity: response.data.maximumCapacity,
                            modality: {
                                    id: response.data.modality.id,
                                    description: response.data.modality.description
                            },
                            openingTime: response.data.openingTime,
                            petAllowed: response.data.petAllowed,
                            reformDate: response.data.reformDate,
                            scheduling: response.data.scheduling,
                            specialMaximumCapacity: response.data.specialMaximumCapacity,
                            termsOfUse: response.data.termsOfUse,
                            usageFee: response.data.usageFee
                        });
                        setApiError("");
                    } else {
                        setApiError("Falha ao carregar a utilização");
                    }
                })
                .catch(() => {
                    setApiError("Falha ao carregar a utilização");
                });
        } else {
            setEntity(
                (previousEntity) => {
                return {
                    ...previousEntity,
                    entrusted: { id: entrusteds[0]?.id,
                        name: "",
                        phoneNumber: "" },
                    local: {id: locals[0]?.id,
                        street: "",
                        number: "",
                        CEP: "",
                        district: "",
                        city: {
                            id: undefined,
                            city: "",
                            uF: ""
                        },
                        coordinate: cord,
                        description: "",
                        bluePrint: "",
                        imageName: "",
                    },
                    modality: {id: modalities[0]?.id,
                        description: ""},
                    convenience: { id: conveniences[0]?.id,
                        description: "" },
                };
            });
        }
    };

    const onSubmit = (data: IUse) => {
        const use: IUse = {
            ...data,
            id: entity.id,
        };

        useService.save(use)
            .then(() => {
                navigate("/cadastro");
            })
            .catch(() => {
                setApiError("Falha ao salvar a utilização.");
            });
    };

    return (
        <>
            <div className="container">
                <h1 className="fs-2 text-center">Cadastro de Utilizações</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormControl isInvalid={errors.openingTime && true}>
                        <FormLabel htmlFor="openingTime">Horário de abertura</FormLabel>
                        <Input
                            id="openingTime"
                            placeholder="0000"
                            {...register("openingTime", {
                                required: "O campo horário de abertura é obrigatório",
                            })}
                        />
                        <FormErrorMessage>
                            {errors.openingTime && errors.openingTime.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.closingTime && true}>
                        <FormLabel htmlFor="closingTime">Horário de fechamento</FormLabel>
                        <Input
                            id="closingTime"
                            placeholder="0000"
                            {...register("closingTime", {
                                required: "O campo horário de fechamento é obrigatório",
                            })}
                        />
                        <FormErrorMessage>
                            {errors.closingTime && errors.closingTime.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.usageFee && true}>
                        <FormLabel htmlFor="usagerFee">Taxa de utilização</FormLabel>
                        <Input
                            id="usageFee"
                            placeholder="0.0"
                            {...register("usageFee", {})}
                        />
                        <FormErrorMessage>
                            {errors.usageFee && errors.usageFee.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.entrusted && true}>
                        <FormLabel htmlFor="entrusted">Responsável</FormLabel>
                        <Select
                            id="entrusted"
                            {...register("entrusted.id", {
                                required: "O campo responsável é obrigatório",
                            })}
                            size="sm"
                        >
                            {entrusteds.map((entrusted: IEntrusted) => (
                                <option key={entrusted.id} value={entrusted.id}>
                                    {entrusted.name}
                                </option>
                            ))}
                        </Select>

                        <FormErrorMessage>
                            {errors.entrusted && errors.entrusted.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.ageGroup && true}>
                        <FormLabel htmlFor="ageGroup">Faixa etária</FormLabel>
                        <Input
                            id="ageGroup"
                            placeholder="00"
                            {...register("ageGroup", {})}
                        />
                        <FormErrorMessage>
                            {errors.ageGroup && errors.ageGroup.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.scheduling && true}>
                        <FormLabel htmlFor="openingTime">Agendamento</FormLabel>
                        <Checkbox
                            id="scheduling"
                            {...register("scheduling", {})}
                        />
                        <FormErrorMessage>
                            {errors.scheduling && errors.scheduling.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.termsOfUse && true}>
                        <FormLabel htmlFor="termsOfUse">Termos de uso</FormLabel>
                        <Textarea
                            id="termsOfUse"
                            maxLength={1024}
                            placeholder="termos de uso"
                            {...register("termsOfUse", {
                                required: "O campo termos de uso é obrigatório",
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
                            {errors.termsOfUse && errors.termsOfUse.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.creationDate && true}>
                        <FormLabel htmlFor="creationDate">Data de criação</FormLabel>
                        <Input
                            id="creationDate"
                            placeholder="00/00/0000"
                            {...register("creationDate", {
                                required: "O campo data de criação é obrigatório",
                            })}
                        />
                        <FormErrorMessage>
                            {errors.creationDate && errors.creationDate.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.reformDate && true}>
                        <FormLabel htmlFor="reformDate">Data de reforma</FormLabel>
                        <Input
                            id="reformDate"
                            placeholder="00/00/0000"
                            {...register("reformDate", {})}
                        />
                        <FormErrorMessage>
                            {errors.reformDate && errors.reformDate.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.maximumCapacity && true}>
                        <FormLabel htmlFor="maximumCapacity">Capacidade máxima</FormLabel>
                        <Input
                            id="maximumCapacity"
                            placeholder="0000"
                            {...register("maximumCapacity", {
                                required: "O campo capacidade máxima é obrigatório",
                            })}
                        />
                        <FormErrorMessage>
                            {errors.maximumCapacity && errors.maximumCapacity.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.specialMaximumCapacity && true}>
                        <FormLabel htmlFor="specialMaximumCapacity">Capacidade Máxima especial</FormLabel>
                        <Input
                            id="specialMaximumCapacity"
                            placeholder="000"
                            {...register("specialMaximumCapacity", {})}
                        />
                        <FormErrorMessage>
                            {errors.specialMaximumCapacity && errors.specialMaximumCapacity.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.petAllowed && true}>
                        <FormLabel htmlFor="petAllowed">Permitido pet</FormLabel>
                        <Checkbox
                            id="petAllowed"
                            placeholder="Permitido pet"
                            {...register("petAllowed", {})}
                        />
                        <FormErrorMessage>
                            {errors.petAllowed && errors.petAllowed.message}
                        </FormErrorMessage>
                    </FormControl>

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
                <div className="text-center">
                    <Link to="/cadastro">Voltar</Link>
                </div>
            </div>
        </>
    );
}