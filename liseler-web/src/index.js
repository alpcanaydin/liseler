import './css/sfUi.css';
import './css/snazzyInfoWindow.css';
import './css/index.css';

import { createMap, getMarkersData, createMarkers, createCluster } from './map';
import getCurrentLocation from './getCurrentLocation';

const main = async () => {
  const mapNode = document.getElementById('map');
  const map = createMap(mapNode);

  const markersData = await getMarkersData();
  const markers = createMarkers(markersData);
  let cluster = createCluster(map, markers);

  const loading = document.getElementById('loading');
  loading.remove();

  // Filter Cluster & And counts
  const filterLinks = document.querySelectorAll('.high-school-type');
  Array.from(filterLinks).forEach(filterLink => {
    const type = filterLink.getAttribute('data-type');
    const newMarkers = markers.filter(marker => marker.schoolData.schoolType === type);

    filterLink.setAttribute('data-balloon', `${newMarkers.length} tane bulunuyor.`);
    filterLink.setAttribute('data-balloon-pos', 'down');

    filterLink.addEventListener('click', event => {
      event.preventDefault();

      markers.forEach(marker => {
        marker.info.close();
      });

      cluster.clearMarkers();
      cluster = createCluster(map, newMarkers);
      document.querySelector('.show-all-high-schools-container').style.display = 'block';
    });
  });

  // Show all markers on cluster
  const showAll = document.getElementById('show-all-high-schools');
  showAll.addEventListener('click', event => {
    event.preventDefault();
    cluster.clearMarkers();

    markers.forEach(marker => {
      marker.info.close();
    });

    cluster = createCluster(map, markers);
    document.querySelector('.show-all-high-schools-container').style.display = 'none';
  });

  // Get near location
  const nearLocationButton = document.getElementById('nearHighSchools');
  nearLocationButton.addEventListener('click', async () => {
    try {
      nearLocationButton.textContent = 'Bulunuyor...';
      nearLocationButton.disabled = true;

      const position = await getCurrentLocation();
      map.panTo(new google.maps.LatLng(position.lat, position.lon));
      map.setZoom(17);

      nearLocationButton.textContent = 'Yakınımdaki Okulları Bul';
      nearLocationButton.disabled = false;
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err.message);
    } finally {
      nearLocationButton.textContent = 'Yakınımdaki Okulları Bul';
      nearLocationButton.disabled = false;
    }
  });
};

window.onload = main;
