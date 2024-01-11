
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRpdHlhczEyIiwiYSI6ImNscjNkNHBxazBuamkybHFqMzk5NXBrN3UifQ.gi9HEW2AVlvl9-ey4PrIig';
const map = new mapboxgl.Map({
container: 'map', // container ID
center: listing.geometry.coordinates, // starting position [lng, lat]
zoom: 9 // starting zoom
});

// console.log(coordinates);
// Create a default Marker and add it to the map.
const marker = new mapboxgl.Marker({color:"red"})
.setLngLat(listing.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({offset:25}).setHTML(
        `<h4>${listing.title}</h4><p>Extact Location will be provided after booking</p>`
    )
)
.addTo(map);