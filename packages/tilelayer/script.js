const tl = new cartoTileLayer({
  mapOptions: {
    username: 'roman-carto',
    apiKey: 'default_public',
    dataset: 'ne_10m_airports'
  }
});

window.deckInstance = new window.deck.DeckGL({
  container: 'container',
  mapboxApiAccessToken: '',
  mapStyle: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  longitude: 0,
  latitude: 0,
  zoom: 1,
  layers: [ tl.createTileLayer() ]
});
