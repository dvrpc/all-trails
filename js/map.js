//Changed accessToken to reflect keriklinges account
mapboxgl.accessToken = 'pk.eyJ1Ijoia2VyaWtsaW5nZXMiLCJhIjoiY2s4YnYwc3AxMGN0MjNra2F0a3k0cWNrayJ9.ueaghC1N7GY5FI9ArXr8wg'
/* Old token: pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA*/
const initMap = () => {
    return new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10', 
        clickTolerance:5,
        // style: 'mapbox://styles/mapbox/satellite-streets-v11',
        // center: [-74.777760,39.982220],
        // zoom: 8.5
        bounds: [[-75.467, 39.509],[-74.467, 40.437]]
  })
}

const makeRegionalExtentControl = map => {
    // coordinates and zoom level for regional extent
    // const dvrpcExtent = {
    //     bounds: [[-75.467, 39.509],[-74.467, 40.437]] 
    //     // center: [-74.777760,39.982220], 
    //     // zoom: 8.5
    // }

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

    // button.onclick = () => map.flyTo({center: dvrpcExtent.center, zoom: dvrpcExtent.zoom}) 
    button.onclick = () => {
        map.fitBounds([
            [-75.467, 39.509], // southwestern corner of the bounds
            [-74.467, 40.437] // northeastern corner of the bounds
        ]);
    }

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