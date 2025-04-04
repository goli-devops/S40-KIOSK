setInterval(() => {
  let date = new Date()

  // Options for formatting the date and time
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }

  // Format the date and time according to the options
  let newDate = date.toLocaleString("en-US", options)
  document.getElementById("date-el").textContent = newDate

  // Determine rate logic
  const currentDay = date.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const currentHour = date.getHours() // 17 = 5pm, 18 = 6pm

  // Get the elements for weekday and weekend rates
  let weekdayRateElement = document.getElementById("weekday")
  let driveinWeekdayElement = document.getElementById("weekday-drivein")
  let weekendRateElement = document.getElementById("weekend")
  let driveinWeekendElement = document.getElementById("weekend-drivein")
  let onp = document.getElementById("onp")
  let regularTen = document.getElementById("regular-ten")
  let driveinRegularTen = document.getElementById("drivein-regular-ten")
  let driveinOnp = document.getElementById("drivein-onp")

  // Weekend Rate: from Friday 6:00am to Sunday 6:00pm
  if (
    (currentDay === 5 && currentHour >= 6) || // Friday from 6:00 am onwards
    currentDay === 6 || // Saturday all day
    (currentDay === 0 && currentHour < 18)
  ) {
    // Sunday before 6:00 pm
    // Show Weekend Rate
    weekendRateElement.style.display = "block"
    driveinWeekendElement.style.display = "block"
    weekdayRateElement.style.display = "none"
    driveinWeekdayElement.style.display = "none"
  } else {
    // Show Weekday Rate
    weekdayRateElement.style.display = "block"
    driveinWeekdayElement.style.display = "block"
    weekendRateElement.style.display = "none"
    driveinWeekendElement.style.display = "none"
  }
  //Show ONP every 8:00 pm to 6:00 am Monday to Friday and Sunday
  if (
    // Sunday from 8 PM onwards
    (currentDay === 0 && currentHour >= 20) ||
    // Monday to Thursday from 8 PM to 6 AM (next day)
    (currentDay >= 1 &&
      currentDay <= 4 &&
      (currentHour >= 20 || currentHour < 6)) ||
    // Friday before 6 AM
    (currentDay === 5 && currentHour < 6)
  ) {
    regularTen.style.display = "none"
    driveinRegularTen.style.display = "none"
    onp.style.display = "table-row"
    driveinOnp.style.display = "table-row"
  } else {
    onp.style.display = "none"
    driveinOnp.style.display = "none"
    regularTen.style.display = "table-row"
    driveinRegularTen.style.display = "table-row"
  }
}, 1000) // Update every second

// DRIVEIN FUNCTIONS

let driveinBtn = document.getElementById("drivein")
let driveinContainer = document.getElementById("drivein-container")
let container = document.getElementById("container")
let walkinBanner = document.getElementById("walkin-banner")

driveinBtn.addEventListener("click", function () {
  let modal = document.getElementById("modal")
  if (driveinContainer.style.display === "block") {
    // Hide driveinContainer and show container
    driveinContainer.style.display = "none"
    container.style.filter = "none"
    driveinBtn.textContent = "DRIVE IN" // Change back to original text
    modal.style.display = "block" // display walk-in
  } else {
    // Show driveinContainer and blur container
    driveinContainer.style.display = "block"
    // container.style.filter = "blur(100px)" // Adjust blur intensity
    driveinBtn.textContent = "WALK-IN" // Change text
    modal.style.display = "none"
  }
})

// ZOOM WEBPAGE IF CLICK ANYWHERE
document.addEventListener("click", function () {
  if (!document.fullscreenElement) {
    // If not in fullscreen, enter fullscreen mode
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(`Error: ${err.message}`)
    })
  }
  // If already in fullscreen, do nothing
})

// DISABLE RIGHT CLICK
document.addEventListener("contextmenu", function (e) {
  e.preventDefault()
})
