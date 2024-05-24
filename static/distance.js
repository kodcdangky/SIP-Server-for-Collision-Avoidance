document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('calcBtn').addEventListener('click', function () {
        const EARTH_RADIUS = 6371008 // meters
        function deg2Rad(deg) {
            return deg * (Math.PI / 180)
        }

        function isNumeric(str) {
            return (!isNaN(str) && !isNaN(parseFloat(str)))
        }

        let degLat1 = document.getElementById("lat1").value
        let degLon1 = document.getElementById("lon1").value
        let degLat2 = document.getElementById("lat2").value
        let degLon2 = document.getElementById("lon2").value

        if (!isNumeric(degLat1) || !isNumeric(degLat2)
            || !isNumeric(degLon1) || !isNumeric(degLon2)) {
            document.getElementById('res').innerHTML = "Invalid input"
            return
        }

        let lat1 = deg2Rad(degLat1)
        let lat2 = deg2Rad(degLat2)
        let latDiff = deg2Rad(degLat2 - degLat1)
        let lonDiff = deg2Rad(degLon2 - degLon1)

        let haversine = Math.sin(latDiff / 2) ** 2
            + Math.cos(lat1) * Math.cos(lat2) * (Math.sin(lonDiff / 2) ** 2)
        let angularDist = Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine)) * 2

        let dist = EARTH_RADIUS * angularDist

        document.getElementById('res').innerHTML = dist + " meters"
    })
})