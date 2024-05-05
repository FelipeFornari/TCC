import {useEffect, useMemo, useState} from "react";
import {ICities, ILocal} from "../../commons/interfaces.ts";
import localService from "../../services/LocalService.ts";
import {MultiPoint, Point} from "ol/geom";
import {Feature, View} from "ol";
import Map, {Controls, Layers, TileLayer, VectorLayer } from "../../components/Map";
import {osm, vector } from "../../components/Map/Source";
import FullScreenControl from "../../components/Map/Controls/FullScreenControl.ts";
import {useGeographic} from "ol/proj";
import {Fill, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import {Button, FormControl, Input} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import citiesService from "../../services/CitiesService.ts";

export function MapDisplayPage() {
    const {
        register,
    } = useForm<ILocal>();
    const [data, setData] = useState<ILocal[]>([]);
    const [dataCord, setDataCord] = useState<ILocal>();
    const [apiError, setApiError] = useState("");
    const cord = new Point([-52.67188958131138, -26.227052900970108]);
    const mPoint = new MultiPoint( []);
    const [zoom] = useState(13);
    const positionFeature = useMemo(() => new Feature(), []);
    const num = data.map((map: ILocal) => (map.coordinate));
    const accuracyFeature = useMemo(() => new Feature(), []);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    useGeographic();

    mPoint.setCoordinates(num);
    accuracyFeature.setGeometry(mPoint);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        localService.findAll()
            .then((response) => {
                setData(response.data);
                mPoint.setCoordinates(response.data.coordinate);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a lista de locais");
            });
    };

    const view = useMemo(
        () =>
            new View({
                center:[cord.getCoordinates()[0], cord.getCoordinates()[1]],
                zoom,
            }),
        [cord, zoom]
    );

    positionFeature.setStyle(
        new Style({
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({
                    color: "#FF0000",
                }),
            }),
        })
    );

    const loadLocal = (cord: number[]) => {
        localService.findAllByCoordinate(cord)
            .then((response) => {
                setDataCord(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar local");
            });
    };

    const onSearch = (path: string) => {
        navigate(path);
    };

    // const onFind = (name: string) => {
    //     localService.findAllByName(name)
    //         .then(() => {
    //             //recerrega pagina com resultados
    //         })
    //         .catch(() => {
    //             //dialog local não encontrado
    //         });
    // };


    const handleClose = () => {
        setShow(false)
        window. location. reload();
    };
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar className="bg-body-tertiary justify-content-between">
                {/*<form onSubmit={handleSubmit(onFind())}>*/}
                    <Form>
                        <Row>
                            <Col xs="auto">
                                <FormControl>
                                    <Input
                                        id="city"
                                        placeholder="Nome do local"
                                        {...register("name", {
                                            required: "Digite o nome do local",
                                        })}
                                    />
                                </FormControl>
                            </Col>
                            <Col xs="auto">
                                <Button type="submit">Buscar</Button>
                            </Col>
                        </Row>
                    </Form>
                {/*</form>*/}
            </Navbar>
            <Map
                center={[cord.getCoordinates()[0], cord.getCoordinates()[1]]} zoom={13} view={view}
                callBack={map => map.on('click', function (event) {
                    const feature = map.getFeaturesAtPixel(event.pixel)[0];
                    if (!feature) {
                        return;
                    }
                    const p = new Point(mPoint.getClosestPoint(event.coordinate));
                    loadLocal(p.getCoordinates());
                    handleShow();
                })}
            >
                <Layers>
                    <TileLayer source={osm()} zIndex={0}/>
                    <VectorLayer
                        source={vector({
                            features: [accuracyFeature, positionFeature],
                        })}
                    />
                </Layers>
                <Controls>
                    <FullScreenControl/>
                </Controls>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{dataCord?.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Endereço: {dataCord?.street} nº {dataCord?.number}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => onSearch(`/local/${dataCord?.id}`)}>
                            Ver local
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Map>
            <Accordion defaultActiveKey="0">
                {data.map((map: ILocal, i) => (
                <Accordion.Item eventKey={i.toString()}>
                    <Accordion.Header>{map.name}</Accordion.Header>
                    <Accordion.Body onClick={() => onSearch(`/local/${map.id}`)}>
                        {map.description}
                    </Accordion.Body>
                </Accordion.Item>
                ))}
            </Accordion>
            {apiError && <div className="alert alert-danger">{apiError}</div>}
        </>
    );
}
