    function addTime() {
      var startTime = document.getElementById("start-time").value;
      var endTime = document.getElementById("end-time").value;

      var startParts = startTime.split(":");
      var endParts = endTime.split(":");

      var startHours = parseInt(startParts[0]);
      var startMinutes = parseInt(startParts[1].substr(0, 2));
      var startPeriod = startParts[1].substr(3, 2);

      var endHours = parseInt(endParts[0]);
      var endMinutes = parseInt(endParts[1].substr(0, 2));
      var endPeriod = endParts[1].substr(3, 2);

      // Convert to 24-hour format
      if (startPeriod === "PM" && startHours !== 12) {
        startHours += 12;
      }
      if (endPeriod === "PM" && endHours !== 12) {
        endHours += 12;
      }
      if (startPeriod === "AM" && startHours === 12) {
        startHours = 0;
      }
      if (endPeriod === "AM" && endHours === 12) {
        endHours = 0;
      }

      var totalHours = 0;
      var totalMinutes = 0;

      // Calculate the total time
      totalHours = endHours - startHours;
      totalMinutes = endMinutes - startMinutes;

      // Adjust minutes if they are negative
      if (totalMinutes < 0) {
        totalHours--;
        totalMinutes += 60;
      }

      // Display the time entry in the list
      var entry = document.createElement("li");
      entry.textContent = startTime + " - " + endTime + " = " + totalHours.toString().padStart(2, "0") + ":" + totalMinutes.toString().padStart(2, "0");
      entry.onclick = function() {
        editTime(entry, startTime, endTime);
      };

      var timeList = document.getElementById("time-list");
      timeList.appendChild(entry);

      // Update the total time
      updateTotalTime(totalHours, totalMinutes);
    }

 function editTime(entry, startTime, endTime) {
  var startParts = startTime.split(":");
  var endParts = endTime.split(":");

  var startHours = parseInt(startParts[0]);
  var startMinutes = parseInt(startParts[1]);

  var endHours = parseInt(endParts[0]);
  var endMinutes = parseInt(endParts[1]);

  var totalHours = endHours - startHours;
  var totalMinutes = endMinutes - startMinutes;

  // Adjust minutes if they are negative
  if (totalMinutes < 0) {
    totalHours--;
    totalMinutes += 60;
  }

  // Remove the clicked entry from the list
  entry.remove();

  // Update the total time
  updateTotalTime(-totalHours, -totalMinutes);

  // Set the input values for editing
  document.getElementById("start-time").value = startTime;
  document.getElementById("end-time").value = endTime;
}


    function updateTotalTime(hours, minutes) {
      var totalHoursElement = document.getElementById("total-hours");
      var totalMinutesElement = document.getElementById("total-minutes");

      var currentTotalHours = parseInt(totalHoursElement.textContent);
      var currentTotalMinutes = parseInt(totalMinutesElement.textContent);

      // Add the current time to the total
      currentTotalHours += hours;
      currentTotalMinutes += minutes;

      // Adjust hours if minutes exceed 60
      if (currentTotalMinutes >= 60) {
        currentTotalHours += Math.floor(currentTotalMinutes / 60);
        currentTotalMinutes = currentTotalMinutes % 60;
      }

      // Update the total time
      totalHoursElement.textContent = currentTotalHours;
      totalMinutesElement.textContent = currentTotalMinutes;
    }
