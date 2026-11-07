
// Event Data
const events = [
    {
        id: 1,
        name: "Tech Innovation Summit",
        category: "Technology",
        date: "2026-12-10",
        venue: "Bhubaneswar",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        description: "Explore modern technologies, AI, innovation and future trends."
    },
    {
        id: 2,
        name: "Music Festival",
        category: "Music",
        date: "2026-12-15",
        venue: "Kolkata",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
        description: "Enjoy live performances and unforgettable musical experiences."
    },
    {
        id: 3,
        name: "Web Development Workshop",
        category: "Education",
        date: "2026-12-20",
        venue: "Online",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        description: "Learn HTML, CSS, JavaScript and modern web development."
    },
    {
        id: 4,
        name: "Business Conference",
        category: "Business",
        date: "2026-12-25",
        venue: "Delhi",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
        description: "Connect with entrepreneurs and industry professionals."
    },
    {
        id: 5,
        name: "AI & Robotics Expo",
        category: "Technology",
        date: "2027-01-05",
        venue: "Bengaluru",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
        description: "Discover robotics, artificial intelligence and automation."
    },
    {
        id: 6,
        name: "Creative Learning Fest",
        category: "Education",
        date: "2027-01-12",
        venue: "Mumbai",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
        description: "Participate in creative learning sessions and activities."
    }
];

// Display Events
const eventContainer = document.getElementById("eventContainer");

function displayEvents(list) {

    eventContainer.innerHTML = "";

    if (list.length === 0) {
        eventContainer.innerHTML =
            '<p class="no-events">No events found.</p>';
        return;
    }

    list.forEach(event => {

        eventContainer.innerHTML += `
            <div class="event-card">

                <img src="${event.image}" alt="${event.name}">

                <div class="event-info">

                    <span class="category">
                        ${event.category}
                    </span>

                    <h3>${event.name}</h3>

                    <p>${event.description}</p>

                    <div class="event-meta">
                        📅 ${formatDate(event.date)}<br>
                        📍 ${event.venue}
                    </div>

                    <button class="details-btn"
                        onclick="showDetails(${event.id})">
                        View Details
                    </button>

                </div>
            </div>
        `;
    });
}

// Format Date
function formatDate(date) {
    return new Date(date + "T00:00:00")
        .toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
}

// Search Events
document.getElementById("searchInput")
.addEventListener("input", filterEvents);

// Filter Category
document.getElementById("categoryFilter")
.addEventListener("change", filterEvents);

function filterEvents() {

    const search = document.getElementById("searchInput")
        .value.toLowerCase();

    const category = document.getElementById("categoryFilter")
        .value;

    const filtered = events.filter(event => {

        const matchName = event.name.toLowerCase()
            .includes(search);

        const matchCategory =
            category === "All" || event.category === category;

        return matchName && matchCategory;
    });

    displayEvents(filtered);
}

// Event Details Modal
const modal = document.getElementById("eventModal");

let currentEvent = null;

function showDetails(id) {

    currentEvent = events.find(event => event.id === id);

    document.getElementById("eventDetails").innerHTML = `
        <img src="${currentEvent.image}" alt="${currentEvent.name}">

        <span class="category">
            ${currentEvent.category}
        </span>

        <h2>${currentEvent.name}</h2>

        <p>${currentEvent.description}</p>

        <p>📅 ${formatDate(currentEvent.date)}</p>

        <p>📍 ${currentEvent.venue}</p>
    `;

    modal.style.display = "flex";
}

// Close Modal
document.getElementById("closeModal")
.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Register Button
document.getElementById("registerBtn")
.addEventListener("click", () => {

    document.getElementById("selectedEvent").value =
        String(currentEvent.id);

    modal.style.display = "none";

    document.getElementById("registration")
        .scrollIntoView({ behavior: "smooth" });
});

// Populate Event Dropdown
const eventSelect = document.getElementById("selectedEvent");

events.forEach(event => {

    const option = document.createElement("option");

    option.value = event.id;
    option.textContent = event.name;

    eventSelect.appendChild(option);
});

// Registration Form Validation
document.getElementById("registrationForm")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const selected = eventSelect.value;

    const message = document.getElementById("message");

    // Name Validation
    if (!/^[A-Za-z ]{2,50}$/.test(name)) {
        showMessage("Please enter a valid name.", "red");
        return;
    }

    // Email Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage("Please enter a valid email.", "red");
        return;
    }

    // Phone Validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
        showMessage("Enter a valid 10-digit Indian mobile number.", "red");
        return;
    }

    // Event Validation
    if (!selected) {
        showMessage("Please select an event.", "red");
        return;
    }

    // Successful Registration
    const selectedName = events.find(
        event => event.id === Number(selected)
    ).name;

    showMessage(
        `Registration successful! Thank you, ${name}. Your event is ${selectedName}.`,
        "green"
    );

    this.reset();
});

// Display Messages
function showMessage(text, color) {

    const message = document.getElementById("message");

    message.textContent = text;
    message.style.color = color;
}

// Initial Display
displayEvents(events);
