// let countryName = document.getElementById("name");
// let countryFlag = document.getElementById("flag");
// let countryCapital = document.getElementById("capital");
// let countryPopulation = document.getElementById("population");
// let countryCurrency = document.getElementById("currency");

let cards = document.querySelector(".cards")
console.log(cards)

class Country{

  constructor(name, flag, capital, population, currency,  currencyFullName, currencySymbol){
    this.name = name;
    this.flag = flag;
    this.capital = capital;
    this.population = population;
    this.currency = currency;
    this.currencySymbol = currencySymbol;
    this.currencyFullName  = currencyFullName
 
    
  }

}

let countryArray  = []
async function getCountryData() {
    let response = await fetch("https://countryapi.io/api/all?apikey=TyA3hReepJyNfxW0WQkfOzAQp6NPnxw6xOWYC76L");
    let countries = await response.json();
    const sortedCountries = Object.keys(countries).sort((a, b) => countries[a].name.localeCompare(countries[b].name));
    
    
    for (const countryKey of sortedCountries) {
        const country = countries[countryKey];
        let currency = Object.keys(country.currencies)[0];
        countryArray.push( new Country(country.name, country.flag.large, country.capital, country.population, currency, country.currencies[currency].name,country.currencies[currency].symbol));
    }
}



function renderCountryData(array){
  cards.innerHTML="";
  console.log(array)
  for (let i = 0; i < array.length; i++) {
    let cardHtml = `
    <li class="cards_item">
        <div class="card">
            <div class="card_content">
                <div id="flag" class="card_image"><img src="${array[i].flag}" alt="" /></div>
                <div class="card-body">
                    <h1 id="name" class="card-header">${array[i].name}</h1>
                    <h2 id="capital" class="card_title card-text"><span style="font-weight:bold">Capital:</span> ${array[i].capital}</h2>
                    <h2 id="population" class="card_title card-text"><span style="font-weight:bold">Population:</span> ${array[i].population}</h2>
                    <h2 id="currency" class="card_title card-text"><span style="font-weight:bold">Currency:</span> ${array[i].currency} (${array[i].currencySymbol})</h2>
                </div>
            </div>  
        </div>
    </li>`;
    cards.innerHTML += cardHtml;
  }
  
}

async function fetchAndRenderData() {
  await getCountryData();
  renderCountryData(countryArray);
}



function searchCountry(searchValue) {
  
  let results = []
  results = countryArray.filter(x => x.name.toLowerCase().startsWith(searchValue.toLowerCase()));

  if(results.length === 0){
    results = countryArray.filter(x => x.name.toLowerCase().includes(searchValue.toLowerCase()));
  }
  return results
}


fetchAndRenderData();

let button = document.querySelector("#searchButton");
let searchInput = document.querySelector("#searchInput")
button.addEventListener("click", () => {
  renderCountryData( searchCountry(searchInput.value));
});
searchInput.addEventListener("keyup", (e) => {
   if(e.key === "Enter"){
  renderCountryData( searchCountry(searchInput.value));
   }
  
})


let renderAllCountries = document.getElementById("renderAllCountries")

if(renderAllCountries!=null){
  renderAllCountries.addEventListener("click", () => {
    renderCountryData(countryArray)
  })
}


//! To Top
const toTop = document.querySelector(".to_top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 412) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})