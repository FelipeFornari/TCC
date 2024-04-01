import { memo, useContext, useEffect } from "react";
import OLVectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import MapContext from "../MapContext";
import { Style } from "ol/style";
import {MultiPoint} from "ol/geom";
import {Feature} from "ol";

type VectorLayerProps = {
  // @ts-ignore
  source: VectorSource<Feature<MultiPoint>>;
  zIndex?: number;
  style?: Style;
};

const VectorLayer = ({ source, style, zIndex = 0 }: VectorLayerProps) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;


    let vectorLayer = new OLVectorLayer({
      // @ts-ignore
      source,
      style,
    });

    map?.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map?.removeLayer(vectorLayer);
      }
    };
  }, [map, source, style, zIndex]);

  return null;
};

export default memo(VectorLayer);
