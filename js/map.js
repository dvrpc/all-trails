//Changed accessToken to reflect keriklinges account
mapboxgl.accessToken = 'pk.eyJ1Ijoia2VyaWtsaW5nZXMiLCJhIjoiY2s4YnYwc3AxMGN0MjNra2F0a3k0cWNrayJ9.ueaghC1N7GY5FI9ArXr8wg'
/* Old token: pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA*/
const initMap = () => {
    return new mapboxgl.Map({
        container: 'map',
     //   style: 'mapbox://styles/keriklinges/ckn8y5ydm0lx717p8stlssl5a',
        style: 'mapbox://styles/mapbox/light-v10', 
     //   style: 'mapbox://styles/mapbox/satellite-streets-v11',
       //dvrpc center: [-75.2273, 40.071],
        center: [-74.777760,39.982220],
        zoom: 8
    //    bounds: [[-76.09405517578125, 39.49211914385648],[-74.32525634765625,40.614734298694216]],
    })
}

const makeRegionalExtentControl = map => {
    // coordinates and zoom level for regional extent
    const dvrpcExtent = {
     //   center: [-75.142241, 40.0518322],
        center: [-74.777760,39.982220], 
        zoom: 8.25
    }

    const navigationControl = new mapboxgl.NavigationControl();

    // create custom button elements
    const button = document.createElement('button')
    const icon = document.createElement('img')

    button.type = 'button'
    icon.id = 'regional-extent-img'
    icon.alt = 'DVRPC Alternative Logo'
    icon.src = 'https://www.dvrpc.org/img/banner/new/bug-favicon.png'

    button.classList.add('mapboxgl-ctrl-icon')
    button.classList.add('mapboxgl-ctrl-dvrpc')

    button.setAttribute('aria-label', 'Default DVRPC Extent')

    button.onclick = () => map.flyTo({center: dvrpcExtent.center, zoom: dvrpcExtent.zoom}) 

    button.appendChild(icon)

    // plug into mapbox fncs
    navigationControl._extent = button
    navigationControl._container.appendChild(button)

    return navigationControl
}

const makeMap = () => {
    const map = initMap()
    const control = makeRegionalExtentControl(map)

    map.addControl(control);

    return map
}

export default makeMap