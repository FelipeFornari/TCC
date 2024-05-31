import {useEffect, useMemo, useState} from "react";
import {ILocal} from "../../commons/interfaces.ts";
import localService from "../../services/LocalService.ts";
import {MultiPoint, Point} from "ol/geom";
import {Feature, View} from "ol";
import Map, {Controls, Layers, TileLayer, VectorLayer } from "../../components/Map";
import {osm, vector } from "../../components/Map/Source";
import FullScreenControl from "../../components/Map/Controls/FullScreenControl.ts";
import {useGeographic} from "ol/proj";
import {Fill, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import {Button, Input} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Refresh, Search} from "@mui/icons-material";

export function MapDisplayPage() {
    const [data, setData] = useState<ILocal[]>([]);
    const [dataCord, setDataCord] = useState<ILocal>();
    const [apiError, setApiError] = useState("");
    const [nomeLocal, setNomeLocal] = useState("");
    const cord = new Point([-52.67188958131138, -26.227052900970108]);
    const mPoint = new MultiPoint( []);
    const [zoom] = useState(13);
    const positionFeature = useMemo(() => new Feature(), []);
    const num = data.map((map: ILocal) => (map.coordinate));
    const accuracyFeature = useMemo(() => new Feature(), []);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    mPoint.setCoordinates(num);
    accuracyFeature.setGeometry(mPoint);
    useGeographic();

    useEffect(() => {
        loadData();
    }, []);

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

    function searchLocal(name: string) {
        localService.findAllByName(name)
            .then((response) => {
                setData(response.data);
                mPoint.setCoordinates(response.data.coordinate);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar local");
            })
    }

    const handleClose = () => {
        setShow(false)
        window. location. reload();
    };
    const handleShow = () => setShow(true);

    return (
        <>
            <Row>
                <Navbar className="bg-body-tertiary justify-content-between">
                    {/*<form onSubmit={handleSubmit(onFind())}>*/}
                    <Row>
                        <Col xs="auto">
                            <Input
                                id="searchName"
                                name="searchName"
                                type="search"
                                className="search-input"
                                placeholder="Nome do local"
                                style={{width: 500}}
                                onChange={(e) => setNomeLocal(e.target.value)}
                            />
                        </Col>
                        <Col xs="auto">
                            <Button
                                leftIcon={<Search />}
                                onClick={() =>searchLocal(nomeLocal)}>Buscar</Button>
                        </Col>
                        <Col xs="auto">
                            <Button
                                leftIcon={<Refresh />}
                                onClick={() =>loadData()}>Recarregar</Button>
                        </Col>
                    </Row>
                    {/*</form>*/}
                </Navbar>
            </Row>
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
                            Fechar
                        </Button>
                        <Button variant="primary" onClick={() => onSearch(`/local/${dataCord?.id}`)}>
                            Ver local
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Map>

            <Accordion >
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
