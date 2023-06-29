//Changed accessToken to reflect keriklinges account
mapboxgl.accessToken = 'pk.eyJ1IjoiY3J2YW5wb2xsYXJkIiwiYSI6Ii00ZklVS28ifQ.Ht4KwAM3ZUjo1dT2Erskgg'

const initMap = () => {
    return new mapboxgl.Map({
        container: 'map',
        // style: 'mapbox://styles/mapbox/light-v10', 
        //   Plain Grey
           style:'css/grey/grey.json',
        // style:'mapbox://styles/crvanpollard/ck5fpyqti0v971itf7edp2eyd',
        clickTolerance:5,
        // http://bboxfinder.com/#0.000000,0.000000,0.000000,0.000000
        center: [-75.140535,40.020247],
        zoom: 8.5,
        minZoom: 7, 
        // bounds: [[-75.467, 39.509],[-74.467, 40.437]]
    //    bounds: [[ -76.025391,39.255651],[-73.490295,41.033787]]
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