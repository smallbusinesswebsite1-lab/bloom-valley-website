document.addEventListener("DOMContentLoaded", () => {

  // ----- Subscribe Feature -----
  const subForm = document.getElementById("subscribeForm");
  if (subForm) {
    subForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("emailInput").value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|co|io)$/i;
      const msgElem = document.getElementById("subscribeMsg");

      if (!emailPattern.test(email)) {
        msgElem.innerText = "Please enter a valid email address.";
        msgElem.setAttribute("role", "alert");
        return;
      }

      localStorage.setItem("subscribedEmail", email);
      msgElem.innerText = "Subscribed successfully!";
      msgElem.setAttribute("role", "alert");
      subForm.reset();
    });
  }

  // ----- Shopping Cart -----
  if (sessionStorage.getItem("cart")) renderCart();

  // ----- Contact Form -----
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const msgElem = document.getElementById("contactMsg");
      const emailPattern = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|co|io)$/i;


      if (!name || !email || !message) {
        msgElem.innerText = "All fields are required.";
        msgElem.setAttribute("role", "alert");
        return;
      }
      if (!emailPattern.test(email)) {
        msgElem.innerText = "Please enter a valid email address.";
        msgElem.setAttribute("role", "alert");
        return;
      }

      localStorage.setItem("contactInfo", JSON.stringify({ name, email, message }));
      msgElem.innerText = "Message saved locally!";
      msgElem.setAttribute("role", "alert");
      contactForm.reset();
    });
  }

  
// ----- Cart Functions -----
function addToCart(name, price) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.push({ name, price });
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const list = document.getElementById("cartList");
  const totalElem = document.getElementById("cartTotal");
  if (!list) return;
  list.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    list.appendChild(li);
    total += item.price;
  });
  totalElem.textContent = total.toFixed(2);
}

function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
  alert("Cart cleared!");
}

function processOrder() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  if (cart.length === 0) return alert("Your cart is empty.");
  alert("Order processed successfully!");
  sessionStorage.removeItem("cart");
  renderCart();
}

// ----- Custom Page -----
 // Custom Order Form
const customForm = document.getElementById("customForm");
if (customForm) {
  customForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const plantType = document.getElementById("plantType").value;
    const potStyle = document.getElementById("potStyle").value;
    const size = document.getElementById("size").value;
    const resultDiv = document.getElementById("customResult");

    if (!plantType || !potStyle || !size) {
      resultDiv.textContent = "Please select all options before generating your plan.";
      resultDiv.setAttribute("role", "alert");
      return;
    }

    const summary = `
      <h3>Your Custom Plant Package:</h3>
      <ul>
        <li><strong>Plant Type:</strong> ${plantType}</li>
        <li><strong>Pot Style:</strong> ${potStyle}</li>
        <li><strong>Size:</strong> ${size}</li>
      </ul>
      <p>We’ll prepare your personalized collection soon!</p>
    `;

    resultDiv.innerHTML = summary;
    resultDiv.setAttribute("role", "status");
  });
}




