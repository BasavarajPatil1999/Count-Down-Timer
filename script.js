let countdownTimer; // Variable to store the interval

document.getElementById("start-button").addEventListener("click", function () {
    const dateInput = document.getElementById("date").value;
    const timeInput = document.getElementById("time").value;

    if (!dateInput || !timeInput) {
        alert("Please enter a valid date and time.");
        return;
    }

    const targetDate = new Date(`${dateInput}T${timeInput}:00`);
    if (isNaN(targetDate)) {
        alert("Invalid date or time format. Please try again.");
        return;
    }

    clearInterval(countdownTimer); // Clear any existing timer
    countdownTimer = setInterval(() => updateCountdown(targetDate), 1000);
});

function updateCountdown(targetDate) {
    const now = new Date();
    const timeDifference = targetDate - now;

    const isPast = timeDifference < 0; 
    const absoluteTime = Math.abs(timeDifference); 


    const days = Math.floor(absoluteTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absoluteTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((absoluteTime / (1000 * 60)) % 60);
    const seconds = Math.floor((absoluteTime / 1000) % 60);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

    const message = isPast
        ? "This event started:"
        : "Time remaining until the event:";
    document.querySelector(".description").textContent = message;

    if (!isPast && timeDifference <= 1000) {
        clearInterval(countdownTimer); 
        alert("The event is happening now!");
    }
}

document.getElementById("reset-button").addEventListener("click", resetCountdown);

function resetCountdown() {
    clearInterval(countdownTimer);


    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";


    document.querySelector(".description").textContent =
        "Enter the date and time for your event:";

   
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
}
