import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';
import MapsApi from 'maps-api';

class CartoTileLayer {
  constructor(options = {}) {
    const { mapOptions, deckInstance } = options;

    this.deck = window.deck || deckInstance;
    this.mapsApi = new MapsApi(mapOptions.apiKey, mapOptions.username);

    this.map = this.mapsApi.instantiateMap(mapOptions);
  }

  createTileLayer() {
    const deck = this.deck;

    return new deck.TileLayer({
      getLineColor: [192, 0, 0],
      getFillColor: [200, 120, 80],
      lineWidthMinPixels: 1,
      pointRadiusMinPixels: 5,
      
      getTileData: (tileProperties) => {
          const templateReplacer = (match, property) => tileProperties[property];
      
          return this.map
            .then(templateURL => templateURL.replace(/\{ *([\w_-]+) *\}/g, templateReplacer))
            .then(tileTemplateURL => fetch(tileTemplateURL))
            .then(response => response.arrayBuffer()) 
            .then(buffer => bufferToGeoJSON(buffer, tileProperties));
      }
    });
  }
}


function bufferToGeoJSON(buffer, tileProperties) {
  const tile = new VectorTile(new Protobuf(buffer));
  const features = [];
  
  for (const layerName in tile.layers) {
    const vectorTileLayer = tile.layers[layerName];
    
    for (let i = 0; i < vectorTileLayer.length; i++) {
      const vectorTileFeature = vectorTileLayer.feature(i);
      const feature = vectorTileFeature.toGeoJSON(tileProperties.x, tileProperties.y, tileProperties.z);
      
      features.push(feature);
    }
  }

  return features;
}

export default CartoTileLayer;
