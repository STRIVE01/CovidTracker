const apiUrl = "https://corona.lmao.ninja/v2/countries/"
const btn = document.getElementById('btn');
const input = document.getElementById('input');
const displayCountryCase = document.getElementById('display-country-case')



async function getApiUrl(){
    const response = await fetch(apiUrl)
    if(!response.ok){
        throw new Error("Can't fetch data")
    }
    const data = response.json();
    return data;
}
// Checking api if error or good to go
getApiUrl()
    .then(data => console.log("ok!"))
    .catch(err => console.log(err.message))

async function getWorldPh(){
    const responses = await getApiUrl();
    const phStatEl = document.getElementById('philStat')
    

    const worldsStatEl = document.getElementById('worldStat')
    let worldCase = 0;
    let worldDeath = 0
    let worldRecovered = 0;
    let worldData = "";
    
    // Philippine Data
    responses.forEach(data => {
        if(data.country === "Philippines"){
            phStatEl.innerHTML = `
             <h1>Philippine Covid Statistics</h1>
            <div class="details">
                <div>
                    <h2>Confirmed Cases</h2>
                    <p id="pcases">${data.cases}</p>
                </div>
                <div>
                    <h2>Deaths</h2>
                    <p id="pdeaths">${data.deaths}</p>
                </div>
                <div>
                    <h2>Recovered</h2>
                    <p id="precovered">${data.recovered}</p>
                </div>
            </div>
            `
            philNumStatEffect( { pcases, pdeaths, precovered }, data);
        }  
    })

    // World Data
    for (const data of responses) {
        worldData = {
            cases: (worldCase += data.cases),
            deaths: (worldDeath += data.deaths),
            recovered: (worldRecovered += data.recovered)
        }

        
    }
   
    // Post in dom the world data
    worldsStatEl.innerHTML = `
     <h1>Worldwide Covid Statistics</h1>
            <div class="details">
                <div>
                    <h2>Confirmed Cases</h2>
                    <p id="wcases">${worldData.cases}</p>
                </div>
                <div>
                    <h2>Deaths</h2>
                    <p id="wdeaths">${worldData.deaths}</p>
                </div>
                <div>
                    <h2>Recovered</h2>
                    <p id="wrecovered">${worldData.recovered}</p>
                </div>
            </div>
        </header>
         `
       worldNumStatEffect({ wcases, wdeaths, wrecovered }, worldData)
}
function philNumStatEffect(id, data) {
  const confirmed = new CountUp(id.pcases, 0, data.cases);
  const deaths = new CountUp(id.pdeaths, 0, data.deaths);
  const recovered = new CountUp(id.precovered, 0, data.recovered);
  confirmed.start();
  deaths.start();
  recovered.start();
}

function worldNumStatEffect(id, data) {
 const confirmed = new CountUp(id.wcases, 0, data.cases);
  const deaths = new CountUp(id.wdeaths, 0, data.deaths);
  const recovered = new CountUp(id.wrecovered, 0, data.recovered);
  confirmed.start();
  deaths.start();
  recovered.start();
}

function invalidCountry(){
    alert('the country input is wrong')
}

async function displayCountryDetails(country){
    const response = await fetch(`https://corona.lmao.ninja/v2/countries/${country}`)
    const data = await response.json()
        
    displayCountryCase.innerHTML = `
    <div class="country-container">    
            <h3 class="country-name" id="country-name">${data.country}</h3>
            <img class="country-flag" src="${data.countryInfo.flag}" alt="CountryFlag">
        </div>   
        <div class="country-cases">        
            <p>
                Cases: ${data.cases} | Today: ${data.todayCases}  <br>
                Active: ${data.active} | Deaths: ${data.deaths} <br>
                Recovered: ${data.recovered}
            </p>
        </div>
        `
        input.value = "";
}



btn.addEventListener('click',(x) => {
x.preventDefault();
    const country = input.value;
    if(!country){
        alert("Input a valid country name")
    }else {
        displayCountryDetails(country);
        
    }
})

// Count up effects

document.addEventListener('DOMContentLoaded', getWorldPh()) 