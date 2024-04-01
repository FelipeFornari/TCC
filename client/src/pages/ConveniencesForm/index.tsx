import {IConvenience} from "../../commons/interfaces.ts";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import convenienceService from "../../services/ConvenienceService.ts";

export function ConveniencesFormPage () {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<IConvenience>();
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [entity, setEntity] = useState<IConvenience>({
        id: undefined,
        description: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        reset(entity);
    }, [entity, reset]);

    const loadData = async () => {
        if (id) {
            convenienceService.findById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setEntity({
                            id: response.data.id,
                            description: response.data.description
                        });
                        setApiError("");
                    } else {
                        setApiError("Falha ao carregar a comodidade");
                    }
                })
                .catch(() => {
                    setApiError("Falha ao carregar a comodidade");
                });
        } else {
            setEntity((previousEntity) => {
                return {
                    ...previousEntity,
                };
            });
        }
    };

    const onSubmit = (data: IConvenience) => {
        const convenience: IConvenience = {
            ...data,
            id: entity.id,
        };

        convenienceService.save(convenience)
            .then(() => {
                navigate("/cadastro");
            })
            .catch(() => {
                setApiError("Falha ao salvar a comodidade.");
            });
    };
    return (
        <>
            <div className="container">
                <h1 className="fs-2 text-center">Cadastro de Comodidades</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormControl isInvalid={errors?.description && true}>
                        <FormLabel htmlFor="description">comodidade</FormLabel>
                        <Input
                            id="description"
                            placeholder="Comodidade"
                            {...register("description", {
                                required: "O campo comodidade é obrigatório",
                            })}
                        />
                        <FormErrorMessage>
                            {errors?.description && errors.description.message}
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