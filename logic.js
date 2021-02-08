// Function to determine marker size based on earthquake magnitude
function markerSize(feature) {
    return Math.sqrt(Math.abs(feature.properties.mag)) * 5;
  }
  
  // Function to determine marker color based on earthquake magnitude
  var colors = ["#7FFF00", "#dfedbe", "#eede9f", "#FF8C00", "	#FA8072", "#FF0000"]
  function fillColor(feature) {
    var mag = feature.properties.mag;
    if (mag <= 1) {
      return colors[0]
    }
    else if (mag <= 2) {
      return colors[1]
    }
    else if (mag <= 3) {
      return colors[2]
    }
    else if (mag <= 4) {
      return colors[3]
    }
    else if (mag <= 5) {
      return colors[4]
    }
    else {
      return colors[5]
    }
  }

  // Base layers for maps (no data yet)
var attribution = "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>";

var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: attribution,
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

var lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: attribution,
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var outdoorsMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: attribution,
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: API_KEY
});

// Create a baseMaps object
var baseMaps = {
  "Satellite": satelliteMap,
  "Grayscale": lightMap,
  "Outdoors": outdoorsMap
};

// Store API endpoint as queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var platesPath = "GeoJSON/PB2002_boundaries.json";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    d3.json(platesPath, function(platesData) {

        // Earthquake layer
        var earthquakes = L.geoJSON(data, {

        // Create circle markers
        pointToLayer: function (feature, latlng) {
          var geojsonMarkerOptions = {
            radius: 8,
            stroke: false,
            //fillColor: "#ff7800",
            radius: markerSize(feature),
            fillColor: fillColor(feature),
            //color: "white",
            weight: 5,
            opacity: .8,
            fillOpacity: .8
          };
          return L.circleMarker(latlng, geojsonMarkerOptions);
        },
  
        // Create popups
        onEachFeature: function (feature, layer) {
          return layer.bindPopup(`<strong>Place:</strong> ${feature.properties.place}<br><strong>Magnitude:</strong> ${feature.properties.mag}`);
        }
    });

          // Tectonic plates layer
        var platesStyle = {
            "color": "white",
            "weight": 2,
            "opacity": 1,
            fillOpacity: 0,
        };
        
        var plates = L.geoJSON(platesData, {
            style: platesStyle
        });
  
        // Create an overlay object
        var overlayMaps = {
            "Fault lines": plates,
            "Earthquakes": earthquakes,
        };