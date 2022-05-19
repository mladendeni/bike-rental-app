import { useEffect, useRef } from 'react';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj.js';
import { Vector as VectorSource } from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Icon, Style } from 'ol/style';

import bikeIcon from './bike-icon.png';

function OpenLayersMap() {
    let mapInstance: React.MutableRefObject<null | Map> = useRef(null);
    const mapEl = useRef(null);

    useEffect(() => {
        if (mapInstance.current) {
            return;
        }

        // TODO: refactor this code

        const source = new VectorSource<Point>();
        const features: Feature<Point>[] = [];
        const newFeaturesCoords = [
            [22.8737, 43.9916],
            [22.8747, 43.9911],
            [22.8757, 43.9906],
            [22.8731, 43.9936],
            [22.8739, 43.9926],
            [22.8769, 43.9929],
            [22.8709, 43.9909]
        ];

        const iconStyle = new Style({
            image: new Icon({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                scale: 0.5,
                src: bikeIcon
            })
        });

        newFeaturesCoords.forEach(coords => {
            const newFeature = new Feature({
                mass: 20,
                year: 2022,
                geometry: new Point(fromLonLat(coords))
            });

            newFeature.setStyle(iconStyle);

            features.push(newFeature);
        });

        source.addFeatures(features);

        const bikes = new VectorLayer({
            source: source
        });

        mapInstance.current = new Map({
            target: mapEl?.current || undefined,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    })
                }),
                bikes
            ],
            view: new View({
                center: fromLonLat([22.8737, 43.9916]),
                zoom: 14
            })
        });

        if (bikes) {
            const bikeSources = bikes.getSource();

            if (bikeSources) {
                mapInstance.current.getView().fit(bikeSources.getExtent(), {
                    size: mapInstance.current.getSize(),
                    maxZoom: 16
                });
            }
        }
    }, []);

    return (
        <div>
            <div
                ref={mapEl}
                style={{ width: '600px', height: '400px', maxWidth: '100%', maxHeight: '100%' }}
                id='open-layers-map'>
            </div>
        </div>
    );
}

export default OpenLayersMap;