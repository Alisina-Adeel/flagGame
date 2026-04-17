

    function filterByRegion(region) {
  if (!region) {
    renderCountries(countryData);
    return;
  }

  const filtered = countryData.filter(c => c.region === region);
  renderCountries(filtered);
}

const countries = [
  "canada",
  "japan",
  "france",
  "germany"

];

let countryData = [];

/* ---------------- WEATHER ---------------- */
function loadWeather(lat, lon) {
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    .then(res => res.json())
    .then(data => {
      const w = data.current_weather;

      document.getElementById("weather").innerHTML = `
        <h3>🌦️ Live Weather</h3>
        <p>🌡️ ${w.temperature}°C</p>
        <p>💨 Wind: ${w.windspeed} km/h</p>
        <p class="small">Updated now</p>
      `;
    })
    .catch(err => {
      document.getElementById("weather").innerHTML = `
        <h3>Weather Error ❌</h3>
      `;
    });
}

/* Get user location */
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      loadWeather(pos.coords.latitude, pos.coords.longitude);
    }, () => {
      // fallback (Toronto)
      loadWeather(43.7, -79.4);
    });
  } else {
    loadWeather(43.7, -79.4);
  }
}

/* Auto refresh every 10 min */
setInterval(getLocationWeather, 600000);
getLocationWeather();

/* ---------------- COUNTRIES ---------------- */
function loadCountries() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  countries.forEach(name => {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then(res => res.json())
      .then(data => {
        const c = data[0];

        const country = {
          name: c.name.common,
          capital: c.capital?.[0] || "N/A",
          region: c.region,
          population: c.population,
          flag: c.flags.png
        };

        countryData.push(country);
        renderCountries(countryData);
      });
  });
}

/* Render */
function renderCountries(list) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  list.forEach(c => {
    grid.innerHTML += `
      <div class="card">
        <img src="${c.flag}" />
        <h2>${c.name}</h2>
        <p>🌆 Capital: ${c.capital}</p>
        <p>🌎 Region: ${c.region}</p>
        <p>👥 Population: ${c.population.toLocaleString()}</p>
        <button onclick="explore('${c.name}')">Explore</button>
      </div>
    `;
  });
}



/* Explore */
function explore(name) {
  alert("Exploring " + name + " 🌍");
}

/* Start */
loadCountries();
function goToGame() {
  const name = document.getElementById("playerName").value;

  if (name.trim() === "") {
    alert("Please enter your name!");
    return;
  }

  // save name
  localStorage.setItem("playerName", name);

  // redirect to game page
  window.location.href = "game.html";
}

function goToGame() {
  const name = document.getElementById("playerName").value;

  if (name.trim() === "") {
    alert("Please enter your name!");
    return;
  }

  // Save name + score
  localStorage.setItem("playerName", name);
  localStorage.setItem("score", 0);

  // Go to new page
  window.location.href = "game.html";
}


function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}

const menuLinks = document.querySelectorAll("#menu a");

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("menu").classList.remove("active");
  });
});