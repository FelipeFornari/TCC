import {IAccessibility, ICities, IConvenience, ILocal, IUse} from "../../commons/interfaces.ts";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import citiesService from "../../services/CitiesService.ts";
import localService from "../../services/LocalService.ts";
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useService from "../../services/UseService.ts";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {Image, TabContent} from "react-bootstrap";
export function ResultsPage () {
    const {
        reset,
    } = useForm<ILocal>();
    const [dataImages, setDataImages] = useState([]);
    const [dataUse, setDataUse] = useState<IUse[]>([]);
    const [apiError, setApiError] = useState("");
    const {id } = useParams();
    const [cities, setCities] = useState<ICities[]>([]);
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

    const loadData = async () => {
        await citiesService.findAll()
            .then((response) => {
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
                        loadImg(response.data?.id);
                        loadUse(response.data?.id);
                        setApiError("");
                    } else {
                        setApiError("Falha ao carregar o local");
                    }
                })
                .catch(() => {
                    setApiError("Falha ao carregar o local");
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

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        reset(entity);
    }, [entity, reset]);

    const loadImg = (id: number) => {
        localService.findAllImages(id)
            .then((response) => {
                setDataImages(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar imagens");
            });
    };

    const loadUse = (id: number) => {
        useService.findAllByLocalId(id)
            .then((response) => {
                setDataUse(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a lista de atrativos");
            });
    };

    const scheduling = ( schd: boolean ) =>{
        if(schd)
            return 'Necessário agendamento';
        else return 'Não é necessário agendar';
    };

    const petAllowed = ( pet: boolean ) =>{
        if(!pet)
            return 'Não permitido';
        else return 'Permitido com guia';
    };

    const usageFee = (fee: number) => {
        if (fee > 0)
            return fee.toString();
        else return "Gratuito";
    };

    const ageGroup = (age: string) => {
      if (age == null || age == "")
          return "Livre";
      else return age;
    };

    const maximumCapacity = (capacity: number) => {
        if (capacity == 0)
            return "Livre";
        else return capacity.toString();
    };

    return (
        <>
            <Row>
                <Col>
                    <Row>
                        <h1>{entity?.name}</h1>
                        <p>Endereço: {entity?.street} nº {entity?.number}</p>
                        <p>Bairro: {entity?.district}</p>
                    </Row>
                    <Row>
                        <Col>
                        <p>{entity.description}</p>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Carousel>
                        {dataImages.map((image: any) => (
                            <Carousel.Item>
                                <Image
                                    key={image.id}
                                    style={{width: 710, height: 550}}
                                    src={`data:image;base64,${image.image}`}
                                    fluid
                                />
                                <Carousel.Caption>
                                    {/*<h3>First slide label</h3>*/}
                                    {/*<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tabs
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        {dataUse.map((use: IUse) => (
                            <Tab eventKey={use.functionality.id}
                                 title={use.functionality.description}

                            >
                                <TabContent key={use.id}>
                                    <Row>
                                        <Col>
                                            <p>Abertura: {use.openingTime}</p>
                                        </Col>
                                        <Col>
                                            <p>Fechamento: {use.closingTime}</p>
                                        </Col>
                                        <Col>
                                            <p>Agendamento: {scheduling(use.scheduling)}</p>
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>Responsável: {use.entrusted.name}</p>
                                        </Col>
                                        <Col>
                                            <p>Contato: {use.entrusted.phoneNumber}</p>
                                        </Col>
                                        <Col>
                                            <p>Acessibilidades: </p>
                                            {/*{use.accessibility.map((acc: IAccessibility) => (*/}
                                            {/*    <p>{acc.type}</p>*/}
                                            {/*))}*/}
                                        </Col>
                                        <Col>
                                            <p>Comodidades: </p>
                                            {use.convenience.map((conv: IConvenience) => (
                                                <p>{conv.description}</p>
                                            ))}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p>Permitido animais: {petAllowed(use.petAllowed)}</p>
                                        </Col>
                                        <Col>
                                            <p>Taxa de utilização: {usageFee(use.usageFee)}</p>
                                        </Col>
                                        <Col>
                                            <p>Faixa etária: {ageGroup(use.ageGroup)}</p>
                                        </Col>
                                        <Col>
                                            <p>Capacidade máxima: {maximumCapacity(use.maximumCapacity)}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <p>Termos de uso: {use.termsOfUse}</p>
                                    </Row>
                                </TabContent>
                            </Tab>
                        ))}
                    </Tabs>
                </Col>
            </Row>
            {apiError && <div className="alert alert-danger">{apiError}</div>}
            <div className="text-center">
                <Link to="/">Voltar</Link>
            </div>
        </>
    );
}