const API_BASE = "http://localhost:8080/api/navigation";
let map;
let routeLayer;

function initMap() {
  map = L.map("map").setView([28.61, 77.20], 17);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
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
      const opt1 = new Option(loc.name, loc.id);
      const opt2 = new Option(loc.name, loc.id);
      source.add(opt1);
      dest.add(opt2);
    });
  } catch (err) {
    console.error("Failed to load locations:", err);
  }
}

async function getRoute() {
  const sourceId = document.getElementById("source").value;
  const destId = document.getElementById("destination").value;

  if (!sourceId || !destId) {
    alert("Please select both source and destination.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/route?sourceId=${sourceId}&destinationId=${destId}`);
    const routeData = await res.json();

    if (!routeData.length) {
      alert("No route found!");
      return;
    }

    routeLayer.clearLayers();

    const latlngs = routeData.map(loc => [loc.latitude, loc.longitude]);
    L.polyline(latlngs, { color: "blue" }).addTo(routeLayer);

    routeData.forEach(loc => {
      L.marker([loc.latitude, loc.longitude])
        .addTo(routeLayer)
        .bindPopup(loc.name);
    });

    map.fitBounds(L.latLngBounds(latlngs));
  } catch (err) {
    console.error("Error fetching route:", err);
  }
}

initMap();
loadLocations();
