const cafesDOM = document.querySelector("#cafes");

// Når hjemmeside bliver startet, vis alle cafeer.
showAllCafes();


function showAllCafes() {
    cafesDOM.innerHTML = "";
    fetch("http://localhost:3000/cafes")
        .then(response => response.json())
        .then(data => {
            data.forEach(cafe => {
                showCafe(cafe.name, cafe.address, cafe.city, cafe.rating, cafe.size, cafe.price_range, cafe.wifi);
            });
        });
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