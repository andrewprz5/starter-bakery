const now = new Date();
const hour = now.getHours();
const minute = now.getMinutes();
const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
const statusText = document.querySelector('.open-status');

// Determine today's hours
let openHour, openMinute, closeHour, closeMinute;

if (day === 0) { // Sunday
    openHour = 7;
    openMinute = 0;
    closeHour = 17;
    closeMinute = 0;
} else {
    openHour = 5;
    openMinute = 30;
    closeHour = 18;
    closeMinute = 0;
}

// Helper to format time
function formatTime(hour, minute) {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hr = hour % 12 || 12;
    const min = minute.toString().padStart(2, '0');
    return `${hr}:${min} ${ampm}`;
}

// Compare current time to today's open/close
const afterOpen = hour > openHour || (hour === openHour && minute >= openMinute);
const beforeClose = hour < closeHour || (hour === closeHour && minute <= closeMinute);

if (afterOpen && beforeClose) {
    const closingTime = formatTime(closeHour, closeMinute);
    statusText.textContent = `Open Now – Closes at ${closingTime}`;
} else if (!afterOpen) {
    // Before today's opening
    const openingTime = formatTime(openHour, openMinute);
    statusText.textContent = `Closed – Opens today at ${openingTime}`;
} else {
    // After today's closing – find next open day
    let nextDay = (day + 1) % 7;
    let daysAhead = 1;

    while (true) {
        const isSunday = nextDay === 0;
        const nextOpenHour = isSunday ? 7 : 5;
        const nextOpenMinute = isSunday ? 0 : 30;

        // Found the next valid open day
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const nextOpenTime = formatTime(nextOpenHour, nextOpenMinute);
        const nextDayName = daysAhead === 1 ? 'tomorrow' : dayNames[nextDay];

        statusText.textContent = `Closed – Opens ${nextDayName} at ${nextOpenTime}`;
        break;
    }
}
/*
// testimonials

    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');

    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    setInterval(nextTestimonial, 7000);
    
    fetch('menu.json')
    .then(res => res.json())
    .then(data => {
      const categories = {
        "Specials": document.querySelector('#specials'),
        "BYO Pizza": document.querySelector('#pizza'),
        "Specialty Pizzas": document.querySelector('#specialty-pizzas'),
        "Appetizers": document.querySelector('#apps'),
        "Salads": document.querySelector('#salads'),
        "Jumbo Wings": document.querySelector('#wings'),
        "Hot Sandwiches": document.querySelector('#hot-sandwiches'),
        "Club Sandwiches": document.querySelector('#club-sandwiches'),
        "Hoagies": document.querySelector('#hoagies'),
        "Pizza Turnover": document.querySelector('#pizza-turnover'),
        "Chicken Steaks": document.querySelector('#chicken-steaks'),
        "Cheese Steaks": document.querySelector('#cheese-steaks'),
        "Burgers": document.querySelector('#burgers'),
        "Wraps": document.querySelector('#wraps'),
        "Calzones & Strombolis": document.querySelector('#calzones-strombolis'),
        "Beverages": document.querySelector('#beverages'),
      };

      data.forEach(item => {
        if (!categories[item.category]) {
          console.warn(`Category "${item.category}" not found for item:`, item);
          return;
        }

        const li = document.createElement('li');
        const labelHTML = item.bestSeller ? `<em class="best-seller">Best seller</em>` : '';
        
        li.innerHTML = `
        ${item.image ? `<img src="${item.image}" loading="lazy" alt="${item.name}" style="width: 100px; height: auto; object-fit: cover; margin-right: 10px; border-radius: 4px;">` : ''}
        <div class="menu-item-text">
          <strong>${item.name} ${labelHTML}</strong>
          ${item.description ? `<p>${item.description}</p>` : ''}
        </div>
        <span class="price">${item.price || ''}</span>
        `;
        categories[item.category].appendChild(li);

      });
    });

const form = document.querySelector("form");
const toast = document.getElementById("toast");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form action
    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      toast.innerText = "Order submitted successfully!";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3000);
    } else {
      toast.innerText = "Something went wrong. Please try again.";
      toast.classList.add("show", "error");
      setTimeout(() => toast.classList.remove("show", "error"), 3000);
    }
  });
  */
 