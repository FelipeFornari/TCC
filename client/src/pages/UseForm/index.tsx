import {IConvenience, IEntrusted, ILocal, IFunctionality, IUse, ICities} from "../../commons/interfaces.ts";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Textarea,
    Select,
} from "@chakra-ui/react";
import useService from "../../services/UseService.ts";
import {useGeographic} from "ol/proj";
import EntrustedService from "../../services/EntrustedService.ts";
import LocalService from "../../services/LocalService.ts";
import ConvenienceService from "../../services/ConvenienceService.ts";
import FunctionalityService from "../../services/FunctionalityService.ts";
import citiesService from "../../services/CitiesService.ts";
import MultiSelect, {Option} from "../../components/MultiSelect";

//-----------------------------------------
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };
//----------------------------------------

export function UseFormPage() {
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<IUse>();
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();
    const [entrusteds, setEntrusteds] = useState<IEntrusted[]>([]);
    const [conveniences, setConveniences] = useState<IConvenience[]>([]);
    const [locals, setLocals] = useState<ILocal[]>([]);
    const [functionalities, setFunctionalities] = useState<IFunctionality[]>([]);
    const [cities, setCities] = useState<ICities[]>([]);
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
        local: {
            id: undefined,
            name: "",
            street: "",
            number: "",
            cep: "",
            district: "",
            city: {
                id: undefined,
                city: "",
                uf: ""
            },
            coordinate: [0, 0],
            description: "",
            //imageName: "",
        },
        maximumCapacity: 0,
        functionality: {
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
    //const [desc, setDesc] = useState<string[]>([]);
    useGeographic();

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

        await citiesService.findAll()
            .then((response) => {
                setCities(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a combo de cidades.");
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

        await FunctionalityService.findAll()
            .then((response) => {
                setFunctionalities(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a combo de funcionalidades.");
            });

        if (id) {
            useService.findById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setEntity({
                            id: response.data.id,
                            ageGroup: response.data.ageGroup,
                            closingTime: response.data.closingTime,
                            convenience: response.data.convenience.id,
                            creationDate: response.data.creationDate,
                            entrusted: response.data.entrusted.id,
                            local: {
                                id: response.data.local.id,
                                city: response.data.local.city.id,
                                name: "",
                                street: "",
                                number: "",
                                cep: "",
                                district: "",
                                coordinate: [0, 0],
                                description: ""
                            },
                            maximumCapacity: response.data.maximumCapacity,
                            functionality: response.data.functionality.id,
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
                        entrusted: entrusteds[0],
                        local: locals[0],
                        cities: cities[0],
                        functionality: functionalities[0],
                        convenience: conveniences[0],
                    };
                });
        }
    };

    const onSubmit = (data: IUse) => {
        const use: IUse = {
            ...data,
            id: entity.id,
            convenience: {
                id: data.convenience.id,
                description: ""
            },
            entrusted: {
                id: data.entrusted.id,
                name: "",
                phoneNumber: ""
            },
            local: {
                id: data.local.id,
                name: "",
                street: "",
                number: "",
                cep: "",
                district: "",
                city: {
                    city: "",
                    uf: ""
                },
                coordinate: [0, 0],
                description: "",
            },
            maximumCapacity: 0,
            functionality: {
                id: data.functionality.id,
                description: ""
            },
        };

        useService.save(use)
            .then(() => {
                navigate("/cadastro/atrativos/list");
            })
            .catch(() => {
                setApiError("Falha ao salvar a utilização.");
            });
    };

    // const handleChange = (event: SelectChangeEvent<typeof desc>) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setDesc(
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };

    const [optionSelected, setSelected] = useState<Option[] | null>();
    const handleChange = (selected: Option[]) => {
        setSelected(selected);
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
                            size="small"
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

                    <FormControl isInvalid={errors.convenience && true}>
                        <FormLabel htmlFor="convenience">Comodidades</FormLabel>
                        <Select
                            id="convenience"
                            {...register("convenience.id", {
                                required: "O campo comodidades é obrigatório",
                            })}
                            size="small"
                            multiple={true}
                        >
                            {conveniences.map((convenience: IConvenience) => (
                                <option key={convenience.id} value={convenience.id}>
                                    {convenience.description}
                                </option>
                            ))}
                        </Select>
                        <FormErrorMessage>
                            {errors.entrusted && errors.entrusted.message}
                        </FormErrorMessage>
                    </FormControl>

                    <MultiSelect
                        key="example_id"
                        options={conveniences}
                        onChange={handleChange}
                        value={optionSelected}
                        isSelectAll={true}
                        menuPlacement={"bottom"}
                    />
                    {/*<FormControl sx={{m: 1, width: 300}}>*/}
                    {/*    <Select*/}
                    {/*        id="demo-multiple-checkbox"*/}
                    {/*        multiple*/}
                    {/*        onChange={handleChange}*/}
                    {/*        value={desc}*/}
                    {/*        renderValue={(selected) => selected.join(', ')}*/}
                    {/*        MenuProps={MenuProps}*/}
                    {/*    >*/}
                    {/*        {conveniences.map((convenience: IConvenience)=> (*/}
                    {/*            <MenuItem key={convenience.description} value={convenience.id}>*/}
                    {/*                <Checkbox checked={convenience?.id > -1}/>*/}
                    {/*                <ListItemText primary={convenience.description}/>*/}
                    {/*            </MenuItem>*/}
                    {/*        ))}*/}
                    {/*    </Select>*/}
                    {/*</FormControl>*/}

                    {/*<FormControl sx={{ m: 1, width: 300 }}>*/}
                    {/*    <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        id="demo-multiple-checkbox"*/}
                    {/*        multiple*/}
                    {/*        value={desc}*/}
                    {/*        onChange={handleChange}*/}
                    {/*        input={<OutlinedInput label="Tag" />}*/}
                    {/*        renderValue={(selected) => selected.join(', ')}*/}
                    {/*        MenuProps={MenuProps}*/}
                    {/*    >*/}
                    {/*        {conveniences.map((convenience: IConvenience) => (*/}
                    {/*            <MenuItem key={convenience.id} value={convenience.description}>*/}
                    {/*                <Checkbox checked={convenience.id != undefined } />*/}
                    {/*                <ListItemText primary={convenience.description} />*/}
                    {/*            </MenuItem>*/}
                    {/*        ))}*/}
                    {/*    </Select>*/}
                    {/*</FormControl>*/}

                    <FormControl isInvalid={errors.local && true}>
                        <FormLabel htmlFor="local">Local</FormLabel>
                        <Select
                            id="local"
                            {...register("local.id", {
                                required: "O campo local é obrigatório",
                            })}
                            size="small"
                        >
                            {locals.map((local: ILocal) => (
                                <option key={local.id} value={local.id}>
                                    {local.name}
                                </option>
                            ))}
                        </Select>
                        <FormErrorMessage>
                            {errors.entrusted && errors.entrusted.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.functionality && true}>
                        <FormLabel htmlFor="local">Funcionalidades</FormLabel>
                        <Select
                            id="local"
                            {...register("functionality.id", {
                                required: "O campo funcionalidades é obrigatório",
                            })}
                            size="small"
                        >
                            {functionalities.map((functionality: IFunctionality) => (
                                <option key={functionality.id} value={functionality.id}>
                                    {functionality.description}
                                </option>
                            ))}
                        </Select>
                        <FormErrorMessage>
                            {errors.functionality && errors.functionality.message}
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
                    <Link to="/cadastro/atrativos/list">Voltar</Link>
                </div>
            </div>
        </>
    );
}