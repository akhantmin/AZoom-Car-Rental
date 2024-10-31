// Mapping for display names
const locationNames = {
    "azclementi": "AZ Clementi",
    "aztampines": "AZ Tampines"
};

// Function to get display name for a location
function getDisplayName(locationKey) {
    return locationNames[locationKey] || locationKey; // Fallback to key if no mapping found
}

var prevScrollpos = window.scrollY;
var navbar = document.getElementById("navbar");

window.onscroll = function() {
    var currentScrollPos = window.scrollY;

    console.log('Current Scroll Position:', currentScrollPos); // Log scroll position

    // Show or hide the navbar based on scroll direction
    if (prevScrollpos > currentScrollPos) {
        navbar.style.top = "0"; // Show navbar
        navbar.classList.add('visible'); // Add class for white background
        console.log('Scrolling Up: Navbar Visible');
    } else {
        navbar.style.top = "-100px"; // Hide navbar
        navbar.classList.remove('visible'); // Remove class for transparent background
        console.log('Scrolling Down: Navbar Hidden');
    }

    // When the scroll position is at the top, make the navbar transparent
    if (currentScrollPos === 0) {
        navbar.style.top = "0"; // Show navbar
        navbar.classList.remove('visible'); // Remove class to make it transparent
    }

    prevScrollpos = currentScrollPos; // Update previous scroll position
}

function toggleImage(carId) {
    const frontImage = document.getElementById(`${carId}-image`);
    const currentSrc = frontImage.src;

    // Toggle between front and side view images (use your own URLs)
    if (currentSrc.includes("front")) {
        frontImage.src = currentSrc.replace("front", "side");
    } else {
        frontImage.src = currentSrc.replace("side", "front");
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Retrieve car and other information from URL parameters
    const car = urlParams.get('car');
    const pickupLocation = getDisplayName(urlParams.get('pickupLocation'));
    const dropoffLocation = getDisplayName(urlParams.get('dropoffLocation'));
    const pickupDate = urlParams.get('pickupDate');
    const rentalDuration = urlParams.get('rentalDuration');

    // Populate the fields in the form
    document.getElementById('car-info').textContent = car;
    document.getElementById('pickup-info').textContent = pickupLocation;
    document.getElementById('dropoff-info').textContent = dropoffLocation;
    document.getElementById('date-info').textContent = pickupDate;
    document.getElementById('duration-info').textContent = rentalDuration;
});

// Car data
const carData = {
    "azclementi": [
        { name: "Tesla Model 3", seats: "5", doors: "4", range: "358 miles", battery: "54 kWh", image: "images/Tesla_front.png", price: 223.76 },
        { name: "BYD Atto 3", seats: "5", doors: "4", range: "259 miles", battery: "66 kWh", image: "images/BYDAtto3_front.png", price: 231.76 },
        { name: "Volkswagen ID.4", seats: "5", doors: "4", range: "250 miles", battery: "82 kWh", image: "images/VW_front.png", price: 239.76 },
        { name: "Hyundai Kona", seats: "5", doors: "4", range: "258 miles", battery: "64 kWh", image: "images/HyundaiKona_front.png", price: 220.76 }
    ],
    "aztampines": [
        { name: "BYD Seal", seats: "5", doors: "4", range: "226 miles", battery: "40 kWh", image: "images/BYDSeal_front.png", price: 210.76 },
        { name: "Hyundai Ioniq 5", seats: "5", doors: "4", range: "153 miles", battery: "42 kWh", image: "images/Hyundai_front.png", price: 215.76 },
        { name: "MG4 EV", seats: "5", doors: "4", range: "300 miles", battery: "75.7 kWh", image: "images/MG4_front.png", price: 240.76 },
        { name: "Rivian R1S", seats: "7", doors: "4", range: "314 miles", battery: "105 kWh", image: "images/Rivian_front.png", price: 300.76 }
    ]
};

// Function to show available cars based on the pick-up location
function showAvailableCars() {
    const pickupLocationKey = document.getElementById("pickup-location").value;
    const pickupLocation = getDisplayName(pickupLocationKey);
    const carsList = document.getElementById("cars-list");

    carsList.innerHTML = ""; // Clear existing content

    if (carData[pickupLocationKey]) {
        carData[pickupLocationKey].forEach(car => {
            const carCard = document.createElement("div");
            carCard.classList.add("car-card");

            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.name}" class="car-image">
                <h3>${car.name}</h3>
                <p><strong>Seats:</strong> ${car.seats}</p>
                <p><strong>Doors:</strong> ${car.doors}</p>
                <p><strong>Range:</strong> ${car.range}</p>
                <p><strong>Battery:</strong> ${car.battery}</p>
                <p><strong>Price:</strong> SGD ${car.price.toFixed(2)}</p>
                <button onclick="selectCar('${car.name}', '${pickupLocation}')">Choose</button>
            `;

            carsList.appendChild(carCard);
        });

        document.getElementById("available-cars").style.display = "block";
    } else {
        console.error('No cars available for this location:', pickupLocation);
    }
}

// Function to handle car selection and redirect to insurance/payment page
function selectCar(car, pickupLocation) {
    const pickupLocationKey = document.getElementById("pickup-location").value;
    const selectedCar = carData[pickupLocationKey].find(c => c.name === car);
    
    if (selectedCar) {
        const params = new URLSearchParams({
            car: selectedCar.name,
            seats: selectedCar.seats,
            doors: selectedCar.doors,
            range: selectedCar.range,
            battery: selectedCar.battery,
            price: selectedCar.price,
            pickupLocation: pickupLocation,
            dropoffLocation: getDisplayName(document.getElementById('dropoff-location').value),
            pickupDate: document.getElementById('pickup-date').value,
            rentalDuration: document.getElementById('rental-duration').value
        });

        window.location.href = `coverage.html?${params.toString()}`;
    }
}
