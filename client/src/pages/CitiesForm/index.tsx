import {ICities} from "../../commons/interfaces.ts";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import citiesService from "../../services/CitiesService.ts";

export function CityFormPage () {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ICities>();
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [entity, setEntity] = useState<ICities>({
        id: undefined,
        city: "",
        uF: "",
    });

    const loadData = async () => {
        if (id) {
            citiesService.findById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setEntity({
                            id: response.data.id,
                            city: response.data.city,
                            uF: response.data.uF,
                        });
                        setApiError("");
                    } else {
                        setApiError("Falha ao carregar a cidade");
                    }
                })
                .catch(() => {
                    setApiError("Falha ao carregar a cidade");
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

    const onSubmit = (data: ICities) => {
        const city: ICities = {
            ...data,
            id: entity.id,
        };
        console.log(city.city)
        console.log(city.uF)
        citiesService.save(city)
            .then(() => {
                navigate("/cadastro");
            })
            .catch(() => {
                setApiError("Falha ao salvar a cidade.");
            });
    };

    return (
        <>
            <div className="container">
                <h1 className="fs-2 text-center">Cadastro de Cidades</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormControl isInvalid={errors?.city && true}>
                        <FormLabel htmlFor="city">Cidade</FormLabel>
                        <Input
                            id="city"
                            placeholder="Nome da cidade"
                            {...register("city", {
                                required: "O campo cidade é obrigatório",
                            })}
                        />
                        <FormErrorMessage>
                            {errors?.city && errors.city.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors?.uF && true}>
                        <FormLabel htmlFor="uF">UF</FormLabel>
                        <Input
                            id="uF"
                            placeholder="UF"
                            {...register("uF", {
                                required: "O campo uf é obrigatório",
                            })}
                        />
                        <FormErrorMessage>
                            {errors?.uF && errors.uF.message}
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