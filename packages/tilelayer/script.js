const hexBinsLayer = new cartoTileLayer({
  mapOptions: {
    username: 'roman-carto',
    apiKey: 'default_public',
    dataset: 'ne_10m_airports'
  }
});

const polygonsLayer = new cartoTileLayer({
  mapOptions: {
    username: 'jbotella',
    apiKey: 'default_public',
    dataset: 'distritos'
  }
});

window.deckInstance = new window.deck.DeckGL({
  container: 'container',
  mapboxApiAccessToken: '',
  mapStyle: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  longitude: 0,
  latitude: 0,
  zoom: 1,
  layers: [
    hexBinsLayer.createTileLayer({
      layerType: window.deck.HexagonLayer,
      radius: 500000,
      extruded: true,
      elevationScale: 5000
    }),

    // polygonsLayer.createTileLayer({
    //   layerType: window.deck.PolygonLayer
    // })
  ]
});
