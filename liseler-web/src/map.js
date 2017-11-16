import SnazzyInfoWindow from 'snazzy-info-window';
import MarkerClusterer from './markerClusterer';

const TURKEY_POSITION = new google.maps.LatLng(38.963745, 35.243322);
const DEFAULT_ZOOM = 6;
const CLUSTER_OPTIONS = { imagePath: 'img/cluster/m' };

export const createMap = domNode => {
  const map = new google.maps.Map(domNode, {
    zoom: DEFAULT_ZOOM,
    center: TURKEY_POSITION,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.RIGHT_TOP,
    },
    streetViewControl: false,
    fullscreenControl: false,
  });

  return map;
};

export const getMarkerIcon = type => {
  switch (type) {
    case 'anadolu_lisesi':
      return 'img/anadolu_lisesi.svg';
    case 'lise':
      return 'img/diger_liseler.svg';
    case 'fen_lisesi':
      return 'img/fen_lisesi.svg';
    case 'imam_hatip':
      return 'img/imam_hatip_lisesi.svg';
    case 'meslek_lisesi':
      return 'img/meslek_lisesi.svg';
    default:
      return 'img/diger_liseler.svg';
  }
};

export const getMarkerInfoStyle = type => {
  switch (type) {
    case 'anadolu_lisesi':
      return { backgroundColor: '#E8A213', color: '#fff' };
    case 'lise':
      return { backgroundColor: '#7C8894', color: '#fff' };
    case 'fen_lisesi':
      return { backgroundColor: '#177BF8', color: '#fff' };
    case 'imam_hatip':
      return { backgroundColor: '#35AD4E', color: '#fff' };
    case 'meslek_lisesi':
      return { backgroundColor: '#AC3434', color: '#fff' };
    default:
      return { backgroundColor: '#7C8894', color: '#fff' };
  }
};

export const getMarkersData = async () => {
  try {
    const response = await fetch('data.json');
    const data = await response.json();

    return data;
  } catch (err) {
    // eslint-disable-next-line no-alert
    alert('Veri çekilirken bir hata meydana geldi.');
    return [];
  }
};

export const createMarkers = markersData => {
  const markers = [];

  markersData.forEach(data => {
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(data.lat, data.lon),
      title: data.schoolName,
      icon: getMarkerIcon(data.schoolType),
      schoolData: data,
    });

    // eslint-disable-next-line no-new
    const info = new SnazzyInfoWindow({
      marker,
      placement: 'up',
      content: `
        <div>
          <p class="pb-3 text-center school-title">${data.schoolName}</p>
          <a href="${
            data.website
          }" target="_blank" class="button button-primary button-small d-block mb-2">Web Sitesi</a>
          <a href="https://www.google.com/search?q=${
            data.fullName
          }" target="_blank" class="button button-secondary button-small d-block">Google'da Ara</a>
        </div>
      `,
      showCloseButton: false,
      closeOnMapClick: true,
      closeWhenOthersOpen: true,
      border: false,
      shadow: false,
      maxWidth: 320,
      padding: '35px',
      ...getMarkerInfoStyle(data.schoolType),
    });

    marker.info = info;

    markers.push(marker);
  });

  return markers;
};

export const createCluster = (map, markers) => new MarkerClusterer(map, markers, CLUSTER_OPTIONS);
