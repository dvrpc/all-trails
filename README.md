# all-trails
### Regional Trails Inventory
The Regional Trails Inventory currently includes all off-road trails in DVRPC's four New Jersey counties as well as Bucks and Delaware Counties in Pennsylvania. The inventory captures walking, hiking, multi-use, and biking trails, including trails outside of the Circuit Trails network. The inventory is intended for planning purposes and was compiled using several sources including data from county planners, open data portals, PDF park and trail maps available online, Google Maps' trails layer, and Strava's Global Heatmap. Trails were manually verified and corrected using leaf-off aerial imagery and other sources of reasonable reliability. This map is in the process of being expanded to include the remaining Pennsylvania counties served by DVRPC: Chester, Montgomery, and Philadelphia counties.

## JS library dependencies
- [mapbox-gl.js (v2.0.1)](https://docs.mapbox.com/mapbox-gl-js/api/)

## Geospatial data dependencies
Regional Trails and The Circuit Trails are utilizing DVRPC Open Data Portal GeoJson endpoints.

## Trail Inventory data updates
Regional Trails GIS inventory has an ETL tool that takes all the various complied data and cleans, scrubs, and standardize the data. 