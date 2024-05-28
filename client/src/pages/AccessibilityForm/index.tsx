import {IAccessibility} from "../../commons/interfaces.ts";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import AccessibilitiesService from "../../services/AccessibilitiesService.ts";

export function AccessibilityFormPage () {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<IAccessibility>();
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [entity, setEntity] = useState<IAccessibility>({
        id: undefined,
        type: "",
    });

    const loadData = async () => {
        if (id) {
            AccessibilitiesService.findById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setEntity({
                            id: response.data.id,
                            type: response.data.type,
                        });
                        setApiError("");
                    } else {
                        setApiError("Falha ao carregar a acessibilidade");
                    }
                })
                .catch(() => {
                    setApiError("Falha ao carregar a acessibilidade");
                });
        } else {
            setEntity((previousEntity) => {
                return {
                    ...previousEntity,
                };
            });
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        reset(entity);
    }, [entity, reset]);

    const onSubmit = (data: IAccessibility) => {
        const accessibility: IAccessibility = {
            ...data,
            id: entity.id,
        };
        AccessibilitiesService.save(accessibility)
            .then(() => {
                navigate("/cadastro/acessibilidades/list");
            })
            .catch(() => {
                setApiError("Falha ao salvar a acessibilidade.");
            });
    };

    return (
        <>
            <div className="container">
                <h1 className="fs-2 text-center">Cadastro de Acessibilidade</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormControl isInvalid={errors?.type && true}>
                        <FormLabel htmlFor="type">Tipo</FormLabel>
                        <Input
                            id="type"
                            placeholder="Tipo de acessibilidade"
                            {...register("type", {
                                required: "O campo tipo é obrigatório",
                            })}
                        />
                        <FormErrorMessage>
                            {errors?.type && errors.type.message}
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
                    <Link to="/cadastro/acessibilidades/list">Voltar</Link>
                </div>
            </div>
        </>
    );
}