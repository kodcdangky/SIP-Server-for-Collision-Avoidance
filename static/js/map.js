document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([60.18575, 24.82730], 15); // Undergrad coords

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let points = []
    let markers = []

    document.getElementById('calcBtn').addEventListener('click', function () {
        function isNotNumeric(str) {
            return (isNaN(str) || isNaN(parseFloat(str)))
        }

        const coords = ['lat1', 'lng1', 'lat2', 'lng2'].map(
            (id) => document.getElementById(id).value
        )
        if (coords.some(isNotNumeric)) {
            document.getElementById('res').innerHTML = "Invalid input"
            return
        }

        // Remove old markers, if there's any
        markers.forEach((marker) => marker.remove())

        points = [L.latLng(coords.slice(0, 2)), L.latLng(coords.slice(2))]

        markers = points.map(L.marker)
        markers.forEach((marker, i) => {
            marker.bindPopup('Position ' + (i + 1))
            marker.addTo(map)
        })

        map.fitBounds(points)
        const distInMeter = map.distance(points[0], points[1])
        const displayDist = (distInMeter > 1000 ? distInMeter / 1000 : distInMeter).toFixed(2)
        const unit = distInMeter > 1000 ? 'km' : 'm'

        document.getElementById('res').innerHTML = `Distance between 2 points: ${displayDist} ${unit}`
    })
})
