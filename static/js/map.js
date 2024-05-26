const map = L.map('map', { zoomSnap: 0.5, zoomDelta: 0.5 }).setView([60.18575, 24.82730], 15); // Undergrad coords
const cycle = ['lat1', 'lng1', 'lat2', 'lng2']
let points = []
let markers = []

function calculateAndDisplay() {
    function isNotNumeric(str) {
        return (isNaN(str) || isNaN(parseFloat(str)))
    }

    const coords = cycle.map(
        (id) => document.getElementById(id).value
    )
    if (coords.some(isNotNumeric)) {
        document.getElementById('res').innerHTML = "INVALID INPUT!"
        return
    }

    // Remove old markers, if there's any
    markers.forEach((marker) => marker.remove())

    points = [L.latLng(coords.slice(0, 2)), L.latLng(coords.slice(2))]

    markers = points.map(L.marker)
    markers.forEach((marker, i) => {
        marker.bindPopup('POSITION ' + (i + 1)).addTo(map)
    })

    map.fitBounds(L.latLngBounds(points).pad(0.02))
    const distInMeter = map.distance(points[0], points[1])
    const displayDist = (distInMeter > 1000 ? distInMeter / 1000 : distInMeter).toFixed(2)
    const unit = distInMeter > 1000 ? 'km' : 'm'

    document.getElementById('res').innerHTML = `DISTANCE BETWEEN THE LOCATIONS: ${displayDist} ${unit}`
}

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

document.getElementById('calcBtn').addEventListener('click', calculateAndDisplay)
document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter')
        calculateAndDisplay()
})
