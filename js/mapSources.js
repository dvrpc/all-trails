const sources = {  
    'boundaries': {
        type: 'vector',
        url: 'https://tiles.dvrpc.org/data/dvrpc-municipal.json'
    },
    'nearmap': {
        'type': 'raster',
        // use the tiles option to specify a WMS tile source URL
        // https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/
        'tiles': [
      //  'https://img.nj.gov/imagerywms/Natural2015?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Natural2015'
        'https://api.nearmap.com/tiles/v3/Vert/{z}/{x}/{y}.png?apikey=NGE1ODI2NDMtYjk1Yi00ZWIxLTg4YWQtM2U0NGFmOTNjMDgy'    
         ],
        'tileSize': 256
    },
    'circuit_trails': {
        type:'geojson',
        data:'https://arcgis.dvrpc.org/portal/rest/services/Transportation/CircuitTrails/FeatureServer/0/query?where=circuit+%3D+%27Existing%27&outFields=*&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson',
        generateId: true //    
    },
    'cnty_NJ': {
    type: 'geojson',
    data:'https://arcgis.dvrpc.org/portal/rest/services/Boundaries/CountyBoundaries/FeatureServer/0/query?where=co_name+%3D+%27Burlington%27+or+co_name+%3D+%27Camden%27+or+co_name+%3D+%27Gloucester%27+or+co_name+%3D+%27Mercer%27&outFields=*&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson'
    }
    // add more sources here
};

export default sources