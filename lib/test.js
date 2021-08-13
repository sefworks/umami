let path = require('path');
let maxmind = require('maxmind');

async function read() {
  let lookup = await maxmind.open(path.resolve('../public/geo/GeoLite2-City.mmdb'));

  // const result = lookup.get('204.124.181.103');
  // const result = lookup.get('223.73.1.20')
  const result = lookup.get('23.199.240.58');

  console.log(result);
}

read();

// print("IP Address: ", ip)
// print("Country:", data.country.name)
// print("Subdivisions: ", data.subdivisions.most_specific.name)
// print("City: ", data.city.name)
// print("Latitude: ", data.location.latitude)
// print("Longitude: ", data.location.longitude)

// IP Address:  172.104.68.126
// Country: Japan
// Subdivisions:  Tokyo
// City:  Tokyo
// Latitude:  35.6882
// Longitude:  139.7532
