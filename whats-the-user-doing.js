// via https://stackoverflow.com/questions/9050345/
if (!Array.prototype.last) {
  Array.prototype.last = function() {
    return this[this.length - 1];
  }

  var historicMotion = {
    "x": [],
    "y": [],
    "z": []
  }
  var historicOrientation = {
    "x": [],
    "y": [],
    "z": []
  }

  function setStatus(status, code) {
    var event = new CustomEvent("doing", { "detail": {message: status, code} });
    window.dispatchEvent(event);
  }

  function updateStatus() {
    let movement = mostRecentMovementOverall(75)
    // Below some stupid, very basic code to guess what the user is doing
    // As described in the README, this is just a proof of concept
    if (mostRecentMovementOverall(4000) > 40) { // TODO: haven't tested this, 1,000 so it's a longer time
      setStatus("driving or other form of transportation", 0)
    } else if (historicOrientation["z"].last() > 70 || historicOrientation["z"].last() < -70) {
      setStatus("lying in bed sideways, or taking a landscape picture", 1)
    } else if (historicOrientation["y"].last() > 160 || historicOrientation["y"].last() < -160) {
      setStatus("lying on your back, with your phone up", 2)
    } else if (historicOrientation["y"].last() >= 30 && historicOrientation["y"].last() < 70) {
      if (movement > 18) {
        setStatus("using your phone while walking", 3)
      } else {
        setStatus("using your phone, sitting or standing", 4)
      }
    } else if (historicOrientation["y"].last() >= 70 && historicOrientation["y"].last() < 95) {
      if (movement > 18) {
        setStatus("using your phone while walking", 3)
      } else {
        setStatus("taking a picture", 5)
      }
    } else if (historicOrientation["y"].last() >= 95 && historicOrientation["y"].last() < 120) {
      setStatus("taking a selfie", 6)
    } else if (Math.round(historicOrientation["z"].last()) == 0 && Math.round(historicOrientation["y"].last()) == 0) {
      setStatus("using the phone on a table", 7)
    } else {
      if (movement > 18) {
        setStatus("using your phone while walking", 3)
      } else {
        setStatus("using your phone, sitting or standing", 4)
      }
    }
  }

  function mostRecentMovementOverall(numberOfHistoricPoints) {
    return (mostRecentMovement(historicMotion["x"], numberOfHistoricPoints, true) +
      mostRecentMovement(historicMotion["y"], numberOfHistoricPoints, true) +
      mostRecentMovement(historicMotion["z"], numberOfHistoricPoints, true)) / 3.0
  }

  // numberOfHistoricPoints: 100 is about 3 seconds
  function mostRecentMovement(array, numberOfHistoricPoints, removeNegatives) {
    if (array.length > numberOfHistoricPoints) {
      totalSum = 0
      for (var toCount = 0; toCount < numberOfHistoricPoints; toCount++) {
        currentElement = array[array.length - toCount - 1]
        currentElement *= (1 - toCount / numberOfHistoricPoints) // weight the most recent data more
        if (currentElement < 0 && removeNegatives) currentElement = currentElement * -1
        if (currentElement > 0.1 || currentElement < -0.1) totalSum += currentElement
      }
      return totalSum * 100 / numberOfHistoricPoints
    }
    return 0 // not enough data yet
  }


  var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/);
  if (isMobile != null) {
    window.addEventListener("devicemotion", motion, false);

    function motion(event) {
      historicMotion["x"].push(event.acceleration.x)
      historicMotion["y"].push(event.acceleration.y)
      historicMotion["z"].push(event.acceleration.z)
    }

    window.addEventListener("deviceorientation", orientation, false);

    function orientation(event) {
      historicOrientation["x"].push(event.alpha)
      historicOrientation["y"].push(event.beta)
      historicOrientation["z"].push(event.gamma)
    }
    setInterval(updateStatus, 100)
  } else {
    setStatus("Please open this site on your smartphone", -1)
  }
} else {
  setStatus('Error occured when array prototyping.')
}
