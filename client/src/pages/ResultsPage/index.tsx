import {ICities, ILocal, IUse} from "../../commons/interfaces.ts";
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
                        loadService(response.data?.id);
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

    const loadService = (id: number) => {
        console.log(id);
        useService.findAllByLocalId(id)
            .then((response) => {
                setDataUse(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a lista de atrativos");
            });
    };

    return (
        <>
            <Row>
                <Col>
                    <h1>{entity?.name}</h1>
                    <p>{entity?.description}</p>
                    <p>Endereço: {entity?.street} nº {entity?.number}</p>
                    <p>Bairro: {entity?.district}</p>
                </Col>
                <Col>
                    <Carousel>
                        {dataImages.map((image: any) => (
                            <Carousel.Item>
                                <Image
                                    key={image.id}
                                    style={{width: "650", height: "400"}}
                                    src={`data:image;base64,${image.image}`}
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
                            <Tab eventKey={use.functionality.description} title={use.functionality.description}>
                                <TabContent key={use.id}>

                                    <p>{use.termsOfUse}</p>
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