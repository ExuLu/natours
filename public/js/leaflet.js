/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);

const map = L.map('map', { zoomControl: false });

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  crossOrigin: '',
}).addTo(map);

const markerIcon = L.icon({
  iconUrl: '../img/pin.png',
  iconSize: [32, 40],
  className: 'marker',
});

const points = [];
locations.forEach((loc) => {
  const [lng, lat] = loc.coordinates;

  points.push([lat, lng]);
  L.marker([lat, lng], { icon: markerIcon })
    .addTo(map)
    .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
      autoClose: false,
    })
    .openPopup();
});

const bounds = L.latLngBounds(points).pad(0.5);
map.fitBounds(bounds);

map.scrollWheelZoom.disable();
