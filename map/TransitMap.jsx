import React from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';
import BaseLayerControl from './BaseLayerControl.jsx';

const mapCenter = [39.9528, -75.1638];
const zoomLevel = 12;

const xstamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a' +
' href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const xstamenXTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';

/*
 TODO:
   - switch between tilesets
   a) configuration + default point and zoom, etc...
   - make a layer control
   c) make a pan control
   d) add search
   e) add overlays (routes)
   f) add vehicles (separate component lib)
   g) localize
*/

class TransitMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: zoomLevel,
      leafletMap: null,
      url: xstamenXTiles,
    };
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    this.setState({leafletMap: leafletMap});
    leafletMap.on('zoomend', () => {
      const updatedZoomLevel = leafletMap.getZoom();
      this.handleZoomLevelChange(updatedZoomLevel);
    });
  }

  handleZoomLevelChange(newZoomLevel) {
    this.setState({zoom: newZoomLevel});
  }

  render() {
    window.console.log('this.state.zoom ->', this.state.zoom);

    return (
      <div>
        <Map
          ref={m => { this.leafletMap = m; }}
          center={mapCenter}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution={xstamenTonerAttr}
            url={this.state.url}
          />
          <Control position="topright">
            <BaseLayerControl map={this} />
          </Control>
        </Map>
      </div>
    );
  }
}

render(
  <TransitMap />,
  document.getElementById('mount'),
);
