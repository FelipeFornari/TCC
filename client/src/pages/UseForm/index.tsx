import {
    IConvenience,
    IEntrusted,
    ILocal,
    IFunctionality,
    IUse,
    ICities,
    IAccessibility
} from "../../commons/interfaces.ts";
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
    Select,
    Textarea,
} from "@chakra-ui/react";
import UseService from "../../services/UseService.ts";
import {useGeographic} from "ol/proj";
import EntrustedService from "../../services/EntrustedService.ts";
import LocalService from "../../services/LocalService.ts";
import ConvenienceService from "../../services/ConvenienceService.ts";
import FunctionalityService from "../../services/FunctionalityService.ts";
import CitiesService from "../../services/CitiesService.ts";
import AccessibilitiesService from "../../services/AccessibilitiesService.ts";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Multiselect} from "multiselect-react-dropdown";

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
    const [accessibilities, setAccessibilities] = useState<IAccessibility[]>([]);
    const [locals, setLocals] = useState<ILocal[]>([]);
    const [functionalities, setFunctionalities] = useState<IFunctionality[]>([]);
    const [cities, setCities] = useState<ICities[]>([]);
    const [selectedConveniences, setSelectedConveniences] = useState<IConvenience[]>([]);
    const [selectedAccessibilities, setSelectedAccessibilities] = useState<IAccessibility[]>([]);
    const [cDate, setcDate] = useState("");
    const [rDate, setrDate] = useState("");
    const [dpCreationDate, setdpCreationDate] = useState(new Date());
    const [dpReformDate, setdpReformDate] = useState(new Date());
    const [dpOppeningTime, setdpOppeningTime] = useState( new Date());
    const [dpClosingTime, setdpClosingTime] = useState(new Date());
    const [entity, setEntity] = useState<IUse>({
        id: undefined,
        ageGroupInf: "",
        ageGroupSup: "",
        closingTime: "",
        convenience: selectedConveniences,
        accessibility: selectedAccessibilities,
        creationDate: "",
        entrusted: {
            id: undefined,
            name: "",
            phoneNumber: "",
            email: "",
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
        },
        maximumCapacity: 0,
        functionality: {
            id: undefined,
            description: ""
        },
        openingTime: "",
        petAllowed: false,
        reformDate: "",
        scheduling: false,
        specialMaximumCapacity: 0,
        termsOfUse: "",
        usageFee: 0
    });
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

        await CitiesService.findAll()
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

        await AccessibilitiesService.findAll()
            .then((response) => {
                setAccessibilities(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a combo de acessibilidades.");
            });

        if (id) {
            UseService.findById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setEntity({
                            id: response.data.id,
                            ageGroupInf: response.data.ageGroupInf,
                            ageGroupSup: response.data.ageGroupSup,
                            closingTime: response.data.closingTime,
                            convenience: response.data.convenience,
                            accessibility: response.data.accessibility,
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
                        convenience: selectedConveniences,
                        accessibility: selectedAccessibilities,
                    };
                });
        }
    };

    const onSubmit = (data: IUse) => {
        const use: IUse = {
            ...data,
            id: entity.id,
            creationDate: cDate,
            reformDate: rDate,
            openingTime: dpOppeningTime.toLocaleTimeString(),
            closingTime: dpClosingTime.toLocaleTimeString(),
            convenience: selectedConveniences,
            accessibility: selectedAccessibilities,
            entrusted: {
                id: data.entrusted.id,
                name: "",
                phoneNumber: "",
                email: "",
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

        UseService.save(use)
            .then(() => {
                navigate("/cadastro/atrativos/list");
            })
            .catch(() => {
                setApiError("Falha ao salvar a utilização.");
            });
    };

    // @ts-expect-error Parameter 'date' implicitly has an 'any' type.
    const handlecDateSelect = (date) => {
        setcDate(date.toLocaleDateString());
    };

    // @ts-expect-error Parameter 'date' implicitly has an 'any' type.
    const handlerDateSelect = (date) => {
        setrDate(date.toLocaleDateString());
    };

    // @ts-expect-error Parameter 'acc' implicitly has an 'any' type.
    const handleAccessibilitiesSelecteds = (acc) => {
        setSelectedAccessibilities(acc);
    };

    // @ts-expect-error Parameter 'con' implicitly has an 'any' type.
    const handleConveniencesSelecteds = (con) => {
        setSelectedConveniences(con);
    };

    return (
        <>
            <div className="container">
                <h1 className="fs-2 text-center">Cadastro de Utilizações</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <FormControl isInvalid={errors.local && true}>
                                <FormLabel htmlFor="local">Local</FormLabel>
                                <Select
                                    id="local"
                                    {...register("local.id", {
                                        required: "O campo local é obrigatório",
                                    })}
                                    size="sm"
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
                        </Col>
                        <Col>
                            <FormControl isInvalid={errors.functionality && true}>
                                <FormLabel htmlFor="local">Funcionalidades</FormLabel>
                                <Select
                                    id="local"
                                    {...register("functionality.id", {
                                        required: "O campo funcionalidades é obrigatório",
                                    })}
                                    size="sm"
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
                        </Col>
                        <Col>
                            <FormControl isInvalid={errors.ageGroupInf && true}>
                                <FormLabel htmlFor="ageGroupInf">Faixa etária inicial</FormLabel>
                                <Input
                                    id="ageGroupInf"
                                    placeholder="00"
                                    type="number"
                                    {...register("ageGroupInf", {})}
                                />
                                <FormErrorMessage>
                                    {errors.ageGroupInf && errors.ageGroupInf.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Col>
                        <Col>
                            <FormControl isInvalid={errors.ageGroupSup && true}>
                                <FormLabel htmlFor="ageGroupSup">Faixa etária final</FormLabel>
                                <Input
                                    id="ageGroupSup"
                                    placeholder="00"
                                    {...register("ageGroupSup", {})}
                                />
                                <FormErrorMessage>
                                    {errors.ageGroupSup && errors.ageGroupSup.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormControl isInvalid={errors.openingTime && true}>
                                <FormLabel htmlFor="openingTime">Horário de abertura</FormLabel>
                                {/*<Input*/}
                                {/*    id="openingTime"*/}
                                {/*    placeholder="0000"*/}
                                {/*    {...register("openingTime", {*/}
                                {/*        required: "O campo horário de abertura é obrigatório",*/}
                                {/*    })}*/}
                                {/*/>*/}
                                <DatePicker
                                    selected={dpOppeningTime}
                                    onChange={(date) => setdpOppeningTime(date)}
                                    //onSelect = { handleoTimeSelect(getSelection()) }
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    timeCaption="Horário"
                                    dateFormat="hh:mm aa"
                                    isClearable
                                    placeholderText="Selecione o horário"

                                />
                                <FormErrorMessage>
                                    {errors.openingTime && errors.openingTime.message}
                                </FormErrorMessage>
                            </FormControl>
                    </Col>
                        <Col>
                            <FormControl isInvalid={errors.closingTime && true}>
                                <FormLabel htmlFor="closingTime">Horário de fechamento</FormLabel>
                                {/*<Input*/}
                                {/*    id="closingTime"*/}
                                {/*    placeholder="0000"*/}
                                {/*    {...register("closingTime", {*/}
                                {/*        required: "O campo horário de fechamento é obrigatório",*/}
                                {/*    })}*/}
                                {/*/>*/}
                                <DatePicker
                                    selected={dpClosingTime}
                                    onChange={(date) => setdpClosingTime(date)}
                                    // onSelect = { handlecTimeSelect(getSelection()) }
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    timeCaption="Time"
                                    dateFormat="hh:mm aa"
                                    isClearable
                                    placeholderText="Selecione o horário"
                                />
                                <FormErrorMessage>
                                    {errors.closingTime && errors.closingTime.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Col>
                        <Col>
                            <FormControl isInvalid={errors.creationDate && true}>
                                {/*<FormLabel htmlFor="creationDate">Data de criação</FormLabel>*/}
                                {/*<Input*/}
                                {/*    id="creationDate"*/}
                                {/*    placeholder="00/00/0000"*/}
                                {/*    {...register("creationDate", {*/}
                                {/*        required: "O campo data de criação é obrigatório",*/}
                                {/*    })}*/}
                                {/*/>*/}
                                <FormLabel htmlFor="creationDate">Data de criação</FormLabel>
                                <DatePicker selected={dpCreationDate}
                                            onChange={(date) => setdpCreationDate(date)}
                                            onSelect = {(date) => handlecDateSelect(date) }
                                            dateFormat={"dd/MM/yyyy"}
                                            isClearable
                                            placeholderText="Selecione a data"/>
                                <FormErrorMessage>
                                    {errors.creationDate && errors.creationDate.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Col>
                        <Col>
                            <FormControl isInvalid={errors.reformDate && true}>
                                <FormLabel htmlFor="reformDate">Data de reforma</FormLabel>
                                {/*<Input*/}
                                {/*    id="reformDate"*/}
                                {/*    placeholder="00/00/0000"*/}
                                {/*    {...register("reformDate", {})}*/}
                                {/*/>*/}
                                <DatePicker selected={dpReformDate}
                                            onChange={(date) => setdpReformDate(date)}
                                            onSelect = {(date) => handlerDateSelect(date) }
                                            dateFormat={"dd/MM/yyyy"}
                                            isClearable
                                            placeholderText="Selecione a data"

                                            />
                                <FormErrorMessage>
                                    {errors.reformDate && errors.reformDate.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
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
                        </Col>
                        <Col>
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
                        </Col>
                        <Col>
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
                        </Col>
                        <Col>
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
                        </Col>
                    </Row>
                    <Row>
                        <Col>
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
                        </Col>
                        <Col>
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
                        </Col>
                        <Col>
                            <FormLabel htmlFor="accessibility">Acessibilidade</FormLabel>
                            {/*<MultiSelect value={selectedAccessibilities}*/}
                            {/*             onChange={(e: MultiSelectChangeEvent) => setSelectedAccessibilities(e.value)}*/}
                            {/*             options={accessibilities} optionLabel="type"*/}
                            {/*             placeholder="Selecione" maxSelectedLabels={2} className="w-full md:w-20rem "/>*/}
                            <Multiselect
                                isObject={true}
                                displayValue="type"
                                onKeyPressFn={function noRefCheck(){}}
                                onRemove={selectedList => handleAccessibilitiesSelecteds(selectedList)}
                                onSearch={function noRefCheck(){}}
                                onSelect={selectedList => handleAccessibilitiesSelecteds(selectedList)}
                                options={accessibilities}
                                placeholder="Selecione"
                                hidePlaceholder={true}
                            />
                        </Col>
                        <Col>
                            <FormLabel htmlFor="convenience">Comodidades</FormLabel>
                            {/*<MultiSelect value={selectedConveniences}*/}
                            {/*             onChange={(e: MultiSelectChangeEvent) => handleConveniencesSelecteds(e.value)}*/}
                            {/*             options={conveniences} optionLabel="description"*/}
                            {/*             placeholder="Selecione" maxSelectedLabels={2} className="w-full md:w-20rem "/>*/}

                            <Multiselect
                                isObject={true}
                                displayValue="description"
                                onKeyPressFn={function noRefCheck(){}}
                                onRemove={selectedList => handleConveniencesSelecteds(selectedList)}
                                onSearch={function noRefCheck(){}}
                                onSelect={
                                selectedList => handleConveniencesSelecteds(selectedList)}
                                options={conveniences}
                                placeholder="Selecione"
                                hidePlaceholder={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
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
                <div className="text-center">
                    <Link to="/cadastro/atrativos/list">Voltar</Link>
                </div>
            </div>
        </>
    );
}