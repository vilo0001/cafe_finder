const cafesDOM = document.querySelector("#cafes");

// Når hjemmeside bliver startet, vis alle cafeer.
showAllCafes();

// Cafeer vist på siden.
let currentCafes = [];

// Cities fra databasen.
let cities = [];

// Boolean til sortering. Når man klikker "sortér", skifter den mellem descending og ascending.
let ratingAscending = true;

const filtersDOM = document.querySelector("#filter");
const ratingSortButtonDOM = document.querySelector("#sort-rating");
const pricesSelectDOM = document.querySelector("#prices");
const searchBarDOM = document.querySelector("#search-bar");
const sizesSelectDOM = document.querySelector("#sizes");
const wifiSelectDOM = document.querySelector("#wifi");
// Cities bliver initialiseret senere.
let citiesSelectDOM;

ratingSortButtonDOM.addEventListener("click", ()=> {
    sortByRating();
});
searchBarDOM.addEventListener("input", ()=> {
    searchInCurrentCafes();
});
pricesSelectDOM.addEventListener("change", ()=> {
    showFilteredCafes();
    searchBarDOM.value = "";
});
sizesSelectDOM.addEventListener("change", ()=> {
    showFilteredCafes();
    searchBarDOM.value = "";
});
wifiSelectDOM.addEventListener("change", ()=> {
    showFilteredCafes();
    searchBarDOM.value = "";
});

function showAllCafes() {
    cafesDOM.innerHTML = "";
    fetch("http://localhost:3000/cafes")
        .then(response => response.json())
        .then(data => {
            currentCafes = data;
            data.forEach(cafe => {
                showCafe(cafe.name, cafe.address, cafe.city, cafe.rating, cafe.size, cafe.price_range, cafe.wifi);
                // tilføj unikke byer til array.
                if(!cities.includes(cafe.city)) {
                    cities.push(cafe.city);
                }
            });
            createCitiesDropDownMenu();
        });
}

function showFilteredCafes() {
    cafesDOM.innerHTML = "";
    fetch(`http://localhost:3000/cafes?price_range=${pricesSelectDOM.value}&size=${sizesSelectDOM.value}&wifi=${wifiSelectDOM.value}&city=${citiesSelectDOM.value}`)
        .then(response => response.json())
        .then(data => {
            currentCafes = data;
            data.forEach(cafe => {
                showCafe(cafe.name, cafe.address, cafe.city, cafe.rating, cafe.size, cafe.price_range, cafe.wifi);
                // tilføj unikke byer til array.
                if(!cities.includes(cafe.city)) {
                    cities.push(cafe.city);
                }
            });
        });
}

function searchInCurrentCafes() {
    cafesDOM.innerHTML = "";
    const searchRegex = new RegExp(searchBarDOM.value.toLowerCase());
    currentCafes.forEach(cafe => {
        if(searchRegex.test(cafe.name.toLowerCase()) || searchRegex.test(cafe.address.toLowerCase()) || searchRegex.test(cafe.city.toLowerCase())) {
            showCafe(cafe.name, cafe.address, cafe.city, cafe.rating, cafe.size, cafe.price_range, cafe.wifi);
        }
    })
}

function createCitiesDropDownMenu() {
    const selectElement = document.createElement("select");
    selectElement.setAttribute("id", "cities");
    selectElement.setAttribute('name', 'cities');
    const optionElement = document.createElement("option");
    optionElement.innerText = "Any";
    optionElement.setAttribute('value', '');
    optionElement.setAttribute('selected', 'selected');
    selectElement.appendChild(optionElement);

    cities.forEach(city => {
        const optionElement = document.createElement("option");
        optionElement.innerText = city;
        optionElement.setAttribute('value', city);
        selectElement.appendChild(optionElement);
    });
    const labelElement = document.createElement("label");
    labelElement.innerText = "Cities ";
    labelElement.setAttribute("for", "cities");
    filtersDOM.appendChild(labelElement);
    filtersDOM.appendChild(selectElement);

    citiesSelectDOM = document.querySelector("#cities");
    citiesSelectDOM.addEventListener("change", ()=> {
        showFilteredCafes();
        searchBarDOM.value = "";
    });
}

function sortByRating() {
    cafesDOM.innerHTML = "";

    if(ratingAscending) {
        currentCafes.sort((a, b) => {
            const ratingA = a.rating;
            const ratingB = b.rating;
            if (ratingA < ratingB) {
                return -1;
            }
            if (ratingA > ratingB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
    }
    else {
        currentCafes.sort((a, b) => {
            const ratingA = a.rating;
            const ratingB = b.rating;
            if (ratingA > ratingB) {
                return -1;
            }
            if (ratingA < ratingB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
    }
    currentCafes.forEach(cafe => {
        showCafe(cafe.name, cafe.address, cafe.city, cafe.rating, cafe.size, cafe.price_range, cafe.wifi);
    });
    ratingAscending = !ratingAscending;
}

// Vis en café i "cafes" div. Husk at cleare "cafes", hvis du viser ny data.
function showCafe(name, address, city, rating, size, price, wifi) {
    const cafeDiv = document.createElement("div");

    const nameElement = document.createElement("h3");
    const addressCityElement = document.createElement("p");

    const ulElement = document.createElement("ul");
    const ratingElement = document.createElement("li");
    const sizeElement = document.createElement("li");
    const priceElement = document.createElement("li");
    const wifiElement = document.createElement("li");

    // Inner text to elements.
    nameElement.innerText = name;
    addressCityElement.innerText = `${address}, ${city}`;
    ratingElement.innerText = rating;
    sizeElement.innerText = size;
    priceElement.innerText = price;
    if(wifi === 1) {
        wifiElement.innerText = "WiFi";
    }
    else {
        wifiElement.innerText = "No WiFi";
    }

    // Append "li" elements to "ul".
    ulElement.appendChild(ratingElement);
    ulElement.appendChild(sizeElement);
    ulElement.appendChild(priceElement);
    ulElement.appendChild(wifiElement);

    // Append elements to div.
    cafeDiv.appendChild(nameElement);
    cafeDiv.appendChild(addressCityElement);
    cafeDiv.appendChild(ulElement);

    // Append cafe to "cafes".
    cafesDOM.appendChild(cafeDiv);
}