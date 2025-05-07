const API_BASE = "http://localhost:8080/api/navigation";
let map;
let routeLayer;
let routingControl;

function initMap() {
  map = L.map('map').setView([28.61, 77.20], 17);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  routeLayer = L.layerGroup().addTo(map);
}

async function loadLocations() {
  try {
    const res = await fetch(`${API_BASE}/locations`);
    const locations = await res.json();

    const source = document.getElementById("source");
    const dest = document.getElementById("destination");

    locations.forEach(loc => {
      let opt1 = new Option(loc.name, JSON.stringify({ lat: loc.latitude, lng: loc.longitude }));
      let opt2 = new Option(loc.name, JSON.stringify({ lat: loc.latitude, lng: loc.longitude }));
      source.add(opt1);
      dest.add(opt2);
    });
  } catch (err) {
    console.error("Error loading locations:", err);
  }
}

function calcDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;
  const a = Math.sin(Δφ/2)**2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (R * c / 1000).toFixed(2);
}

async function getRoute() {
  const sourceVal = document.getElementById("source").value;
  const destVal = document.getElementById("destination").value;

  if (!sourceVal || !destVal) return;

  const source = JSON.parse(sourceVal);
  const dest = JSON.parse(destVal);

  try {
    if (routingControl) {
      map.removeControl(routingControl);
    }

    routingControl = L.Routing.control({
      waypoints: [
        L.latLng(source.lat, source.lng),
        L.latLng(dest.lat, dest.lng)
      ],
      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,
      show: false,
      createMarker: function(i, wp) {
        return L.marker(wp.latLng).bindPopup(i === 0 ? "Start" : "End");
      }
    }).addTo(map);

    document.getElementById("map").style.display = "block";
    setTimeout(() => map.invalidateSize(), 200);

  } catch (err) {
    console.error("Error fetching route:", err);
  }
}

initMap();
loadLocations();
