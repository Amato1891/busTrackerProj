var locations;

// get bus data 
async function run() {    
	 locations = await getBusLocations();
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations() {
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1hdG8xODkxIiwiYSI6ImNrczZ2aHR1OTA0dGozMXBlbzJuOTFrM3gifQ.s8bp_uGHVr4ETiAl5s245A';
    
     const map = new mapboxgl.Map({
         container: 'map',
         style: 'mapbox://styles/amato1891/cksbaaszz1ukh17t21x75ct65',
        center: [-71.08371719, 42.32987855], // starting position [lng, lat]
        zoom: 13 // starting zoom    
        });

  markers = [];

   // Creates a marker for each bus
 setTimeout(() => {
    for (let i = 0; i < locations.length; i++) {
       markers.push(new mapboxgl.Marker({
         color : 'red'
      }).setLngLat([-71.06416583, 42.342309929])
        .addTo(map))
}}, 2000);
 
   // Updates the bus locations every 5 seconds
      function move(){
        setTimeout(() =>{
           for(let i = 0; i < markers.length; i++) {
            markers[i].setLngLat([locations[i].attributes.longitude, locations[i].attributes.latitude]);
           }
         move();
        }, 5000);
      }
     move();
      