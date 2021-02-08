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

  