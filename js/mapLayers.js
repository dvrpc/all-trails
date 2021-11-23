const layers = {
    // countyOutline: {
    //     "id": "county-outline",
    //     "type": "line",
    //     "source": "boundaries",
    //     "source-layer": "county",
    //     "paint": {
    //         'line-width': 2.5,
    //         'line-color': '#f3f4f5'
    //     },
    //     "filter": [
    //         "==",
    //         "dvrpc",
    //         "Yes"
    //     ]
    // },
    countyOutline: {
        "id": "county-outline",
        "type": "line",
        "source": "boundaries",
        "source-layer": "county",
        "paint": {
            'line-width': 2.5,
            'line-color': '#f3f4f5'
        },
        "filter": [
            "==",
            "dvrpc",
            "Yes"
        ]
    },
    cnty_NJ: {
        "id": "cnty_NJ",
        "type": "line",
        "source": "cnty_NJ",
         'layout':{'visibility': 'visible'},
        "paint": {
            'line-width': 2.5,
            'line-color': '#616162'
        }
    },
    muniOutline: {
        "id": "municipality-outline",
        "type": "line",
        "source": "boundaries",
        "source-layer": "municipalities",
        "paint": {
            'line-width': 0.25,
            'line-color': '#dee1e3'
        }
    },
    circuit_trails: {
        'id':'circuit_trails',
        'type':'line',
        'source':'circuit_trails',
        'layout':{'visibility': 'visible'},
        'paint':{
        'line-width':  {
            "base": 9,
            "stops": [
              [10, 2],
              [12, 3],
              [13, 4]
            ] 
        },
        'line-color':'#4fe314'
        }
    },  
    // add more layers here
}

export default layers