import {IModality} from "../../commons/interfaces.ts";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import FunctionalitiesService from "../../services/ModalityService.ts";
import {Button, FormControl, FormErrorMessage, FormLabel, Textarea} from "@chakra-ui/react";

export function FunctionalitiesFormPage () {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<IModality>();
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [entity, setEntity] = useState<IModality>({
        id: undefined,
        description: "",
    });

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        reset(entity);
    }, [entity, reset]);

    const loadData = async () => {
        if (id) {
            FunctionalitiesService.findById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setEntity({
                            id: response.data.id,
                            description: response.data.description,
                        });
                        setApiError("");
                    } else {
                        setApiError("Falha ao carregar a funcionalidade");
                    }
                })
                .catch(() => {
                    setApiError("Falha ao carregar a funcionalidade");
                });
        } else {
            setEntity((previousEntity) => {
                return {
                    ...previousEntity,
                };
            });
        }
    };

    const onSubmit = (data: IModality) => {
        const product: IModality = {
            ...data,
            id: entity.id,
        };

        FunctionalitiesService.save(product)
            .then(() => {
                navigate("/cadastro");
            })
            .catch(() => {
                setApiError("Falha ao salvar a funcionalidade.");
            });
    };
    return (
        <>
            <div className="container">
                <h1 className="fs-2 text-center">Cadastro de Funcionalidades</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormControl isInvalid={errors.description && true}>
                        <FormLabel htmlFor="description">Descrição</FormLabel>
                        <Textarea
                            id="description"
                            maxLength={1024}
                            placeholder="Descrição da funcionalidade"
                            {...register("description", {
                                required: "O campo descrição é obrigatório",
                                minLength: {
                                    value: 2,
                                    message: "O tamanho deve ser entre 2 e 30 caracteres",
                                },
                                maxLength: {
                                    value: 30,
                                    message: "O tamanho deve ser entre 2 e 30 caracteres",
                                },
                            })}
                            size="sm"
                        />
                        <FormErrorMessage>
                            {errors.description && errors.description.message}
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