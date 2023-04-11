import makeMap from './map.js'
import sources from './mapSources.js'
import layers from './mapLayers.js'
import handleModal from './modal.js'
import { toggleLayers } from "./forms.js";
// add additional imports here (popups, forms, etc)
const modal = document.getElementById('modal')
const modalToggle = document.getElementById('modal-toggle')
const closeModal = document.getElementById('close-modal')
// get additional elements here (forms, etc)
$(document).ready(function(){
     $("#about").modal('show');
});
// toggle base and basemap layers 
const toggleLayerForms = Array.from(
    document.querySelectorAll(".sidebar-form-toggle")
  );
// map
const map = makeMap()

map.on('load', () => {
    for(const source in sources) map.addSource(source, sources[source])
    for(const layer in layers) map.addLayer(layers[layer]);

     // Wire all checkbox layer toggles to an on-click event
     toggleLayerForms.forEach((form) => toggleLayers(form, map));
    //KK added//
    map.addSource(
        'nj_trails',
        {'type':'geojson',
        'data': 'https://arcgis.dvrpc.org/portal/rest/services/Transportation/All_Trails/FeatureServer/0/query?where=1=1&oursr=4326&returnDistinctValues=true&outfields=*&f=geojson'
    });
    map.addLayer({
        'id':'nj_trails',
        'type':'line',
        'source':'nj_trails',
        'paint':{
            'line-width':
            ['step', ['zoom'],
            ['case',['boolean', ['feature-state', 'hover'], false],5,2],
            10,
            ['case',['boolean', ['feature-state', 'hover'], false],6,3],
            13,
            ['case',['boolean', ['feature-state', 'hover'], false],7,4]
            ],
            'line-color': ['case',
                ['boolean', ['feature-state', 'hover'], false],
                '#FFF01F',
                ['match',['get', 'surface'],
                    'S',
                    '#D8BC96',
                    'CSG',
                    '#0078AE',
                    'D',
                    '#fa751f',
                    'G',
                    '#349000',
                    'P',
                    '#D882C8',
                    'SD',
                    '#67ABD1',
                    'V',
                    '#ffdb00',
                    /* other */ '#FFF01F'
                ]
                ],
            'line-opacity':1},
            'layout':{
                // 'text-field': ['get', 'name'],
                // 'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                // 'text-radial-offset': 0.5,
                // 'text-justify': 'auto',
                'visibility': 'visible'}
    });
    // Grey Mask for PA Counties
    map.addLayer({
    "id": "county2",
    "type": "fill",
    "source": {
        type: 'vector',
        url: 'https://tiles.dvrpc.org/data/dvrpc-municipal.json'
    },
    "source-layer": "county",
    "layout": {},
    paint: {
    // 'fill-outline-color': '#f7c59f',
        'fill-color': 'rgba(0,0,0,0.1)'
    },
    "filter": 
    //["==","dvrpc","Yes"]
    ["all",["!=","name","Bucks"],["!=","name","Burlington"],["!=","name","Camden"],["!=","name","Mercer"],["!=","name","Gloucester"]]
    });

    map.addSource('cnty', {
    'type': 'geojson',
        'data':"https://arcgis.dvrpc.org/portal/rest/services/Boundaries/CountyBoundaries/FeatureServer/0/query?where=co_name+%3D+%27Chester%27+or+co_name+%3D+%27Delaware%27+or+co_name+%3D+%27Montgomery%27+or+co_name+%3D+%27Philadelphia%27&outFields=*&returnGeometry=true&geometryPrecision=8&outSR=4326&f=geojson"
    });
  
   // add map events here (click, mousemove, etc)
   // Add NearMap Imagery, it is added here do to neediung to place layer below road-street layer
   map.addLayer(
    {
    'id': 'nearmap',
    'type': 'raster',
    'source': 'nearmap',
    'maxzoom':20,
    'paint': {},
    "layout": {"visibility":"none"}
    },
    'road-label'
    );
});

map.on('zoom', () => {
    if (map.getZoom() > 20) {
    // stateLegendEl.style.display = 'none';
    // countyLegendEl.style.display = 'block';
    } else {
    // stateLegendEl.style.display = 'block';
    // countyLegendEl.style.display = 'none';
    }
});
var trailID = null;
// When a click event occurs on a feature in the states layer, open a popup at the
// location of the click, with description HTML from its properties.
map.on('click', 'nj_trails', function (e) {
    if (e.features[0].properties["multi_use"] === "N"){ var mu_status = "<br/><b>Multi-Use:</b> No"   ;}
    else if (e.features[0].properties["multi_use"] === "Y"){ var mu_status = "<br/><b>Multi-Use:</b> Yes";}
    else if (e.features[0].properties["multi_use"] === "Yes"){ var mu_status = "<br/><b>Multi-Use:</b> Yes";}
    else if (e.features[0].properties["multi_use"] === "No"){ var mu_status = "<br/><b>Multi-Use:</b> No"   ;}
    else { var mu_status = "";}

    if (e.features[0].properties["owner"] === "null"){ var owner_txt = "<br><b>Owner:</b> Unknown" ;}
    else if (e.features[0].properties["owner"] === "0"){ var owner_txt = "<br><b>Owner:</b> Unknown" ;}
    else {var owner_txt="<br><b>Owner: </b>" + e.features[0].properties["owner"];}
    
    let lookup = {
        "S": "<br/><b>Surface Material : </b>Sand",
        "CSG": "<br/><b>Surface Material : </b>Crushed Stone/Gravel",
        "D": "<br/><b>Surface Material : </b>Dirt",
        "G":"<br/><b>Surface Material : </b>Grass",
        "P":"<br/><b>Surface Material : </b>Paved",
        "SD":"<br/><b>Surface Material : </b>Stone Dust",
        "Unverified":"<br/><b>Surface Material : </b>Unverified",
        "V":"<br/><b>Surface Material : </b>Varies"
    }
    let surface = lookup[e.features[0].properties["surface"]];

    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML('<b>NJ Trail Name: </b>' + e.features[0].properties["name"]
    +  surface
    +  mu_status
    +  owner_txt)
    .addTo(map);
    });

// Change the cursor to a pointer when the mouse is over the trails layer.
map.on('mouseenter', 'nj_trails', function (e) {
    map.getCanvas().style.cursor = 'pointer';

    var content = e.features[0].properties["name"];
    document.getElementById('shield').innerHTML  ='';
    document.getElementById('mag').innerHTML = content;
 // When the mouse moves over the earthquakes-viz layer, update the
            // feature state for the feature under the mouse
        if (trailID) {
            map.removeFeatureState({
                source: 'nj_trails',
                id: trailID
            });
            }

            trailID = e.features[0].id;

            map.setFeatureState(
            {
                source: 'nj_trails',
                id: trailID
            },
            {
                hover: true
            }
            );
        
    });

// Change it back to default when it leaves.
map.on('mouseleave', 'nj_trails', function (e) {
    document.getElementById('shield').innerHTML  ='Hover over a trail to view name and click trail for more information.';
    document.getElementById('mag').innerHTML = "";
    map.getCanvas().style.cursor = '';
    if (trailID) {
        map.setFeatureState(
          {
            source: 'nj_trails',
            id: trailID
          },
          {
            hover: false
          }
        );
      }
      trailID = null;
    });

//Click Circuit Trails
    map.on('click', 'circuit_trails', function (e) {
        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<b>Circuit Trail Name: </b>' + e.features[0].properties["name"]+
        '<br/><b>Surface Material: </b>'+ e.features[0].properties["surface"] +
        '<br/><b>Multi-Use:</b> Yes')
        //  + '<br>' + "<b>Status: </b>" + e.features[0].properties["circuit"])
        .addTo(map);
        });
    // Change the cursor to a pointer when the mouse is over the trails layer.
    map.on('mouseenter', 'circuit_trails', function (e) {
        map.getCanvas().style.cursor = 'pointer';
        var content = e.features[0].properties["name"];
        document.getElementById('shield').innerHTML  ='';
        document.getElementById('mag').innerHTML = content;
     // When the mouse moves over the earthquakes-viz layer, update the
                // feature state for the feature under the mouse
            if (trailID) {
                map.removeFeatureState({
                    source: 'circuit_trails',
                    id: trailID
                });
                }
    
                trailID = e.features[0].id;
    
                map.setFeatureState(
                {
                    source: 'circuit_trails',
                    id: trailID
                },
                {
                    hover: true
                }
                );
        });
    
    // Change it back to default when it leaves.
    map.on('mouseleave', 'circuit_trails', function (e) {
        map.getCanvas().style.cursor = '';
        document.getElementById('shield').innerHTML  ='Hover over a trail to view name and click trail for more information.';
        document.getElementById('mag').innerHTML = "";
        map.getCanvas().style.cursor = '';
        if (trailID) {
            map.setFeatureState(
              {
                source: 'circuit_trails',
                id: trailID
              },
              {
                hover: false
              }
            );
          }
          trailID = null;
        });

// modal
// handleModal(modal, modalToggle, closeModal)