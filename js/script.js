const form = document.getElementById('form');
    const schedule = document.getElementById('schedule');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      schedule.innerHTML = 'Looking for the bus...';

      const stopNumber = form.elements.stopNumber.value;
      const url = `https://api.octranspo1.com/v1.2/GetNextTripsForStop?appID=9a2774f4&apiKey=0d6cc9a3dfac0c656f5e0cca4a26f01c&stopNo=${stopNumber}&format=json`;

      const response = await fetch(url);
      const data = await response.json();
      const trips = data.GetNextTripsForStopResult.Route;

      let scheduleHTML = '<h2>Schedule:</h2><ul>';
      for (const trip of trips) {
        const tripInfo = `
          <li>
            Route No: ${trip.RouteNo} - Destination: ${trip.Destination} - 
            Departure Time: ${trip.DepartureTime}
          </li>
        `;
        scheduleHTML += tripInfo;
      }
      scheduleHTML += '</ul>';

      schedule.innerHTML = scheduleHTML;
    });