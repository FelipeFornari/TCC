import {useEffect, useMemo, useState} from "react";
import {ILocal} from "../../commons/interfaces.ts";
import localService from "../../services/LocalService.ts";
import {Point} from "ol/geom";
import {View} from "ol";
import Map, {Controls, Layers, TileLayer} from "../../components/Map";
import {osm} from "../../components/Map/Source";
import FullScreenControl from "../../components/Map/Controls/FullScreenControl.ts";
import {useGeographic} from "ol/proj";

export function MapDisplayPage() {
    const [data, setData] = useState<ILocal[]>([]);
    const [apiError, setApiError] = useState("");
    const cord = new Point([-52.67188958131138, -26.227052900970108]);
    //const [mPoint, setMPoint] = useState("")
    const [zoom] = useState(13);
    useGeographic();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        localService.findAll()
            .then((response) => {
                setData(response.data);
                //setMPoint(response.data.coordinates);
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


    // const style = new Style({
    //     image: new Circle({
    //         radius: 10,
    //         stroke: new Stroke({
    //             width: 2,
    //             color: '#444',
    //         }),
    //         fill: new Fill({
    //             color: 'rgb(255, 255, 255)',
    //         }),
    //     }),
    // });

    return (
        <>
            <Map center={[cord.getCoordinates()[0], cord.getCoordinates()[1]]} zoom={13} view={view}>
                <Layers>
                    <TileLayer source={osm()} zIndex={0}/>
                    {/*<VectorLayer */}
                    {/*    source={new VectorSource({*/}
                    {/*        features: [new Feature(new MultiPoint([JSON.parse(mPoint)]))]*/}
                    {/*    })} style={style}*/}
                    {/*/>*/}
                </Layers>
                <Controls>
                    <FullScreenControl/>
                </Controls>
            </Map>
            {apiError && <div className="alert alert-danger">{apiError}</div>}
        </>
    );
}
