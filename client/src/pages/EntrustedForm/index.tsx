import {IEntrusted} from "../../commons/interfaces.ts";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import entrustedService from "../../services/EntrustedService.ts";

export function EntrustedFormPage () {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<IEntrusted>();
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [entity, setEntity] = useState<IEntrusted>({
        id: undefined,
        name: "",
        phoneNumber: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        reset(entity);
    }, [entity, reset]);

    const loadData = async () => {
        if (id) {
            entrustedService.findById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setEntity({
                            id: response.data.id,
                            name: response.data.name,
                            phoneNumber: response.data.phoneNumber
                        });
                        setApiError("");
                    } else {
                        setApiError("Falha ao carregar o responsável");
                    }
                })
                .catch(() => {
                    setApiError("Falha ao carregar o responsável");
                });
        } else {
            setEntity((previousEntity) => {
                return {
                    ...previousEntity,
                };
            });
        }
    };

    const onSubmit = (data: IEntrusted) => {
        const entrusted: IEntrusted = {
            ...data,
            id: entity.id,
        };

        entrustedService.save(entrusted)
            .then(() => {
                navigate("/cadastro/responsaveis/list");
            })
            .catch(() => {
                setApiError("Falha ao salvar o responsável.");
            });
    };
    return (
        <>
            <div className="container">
                <h1 className="fs-2 text-center">Cadastro de Responsáveis</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <FormControl isInvalid={errors?.name && true}>
                        <FormLabel htmlFor="name">Nome</FormLabel>
                        <Input
                            id="name"
                            placeholder="Nome do responsável"
                            {...register("name", {
                                required: "O campo nome é obrigatório",
                            })}
                        />
                        <FormErrorMessage>
                            {errors?.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors?.phoneNumber && true}>
                        <FormLabel htmlFor="phoneNumber">Fone</FormLabel>
                        <Input
                            id="phoneNumber"
                            placeholder="Fone"
                            {...register("phoneNumber", {
                            })}
                        />
                        <FormErrorMessage>
                            {errors?.phoneNumber && errors.phoneNumber.message}
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