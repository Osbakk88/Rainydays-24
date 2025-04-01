const container = document.getElementById("cart");
const API_URL = "https://v2.api.noroff.dev/rainy-days";

async function fetchAndCreateProduct() {
  try {
    if (!container) return;
    const param = new URLSearchParams(window.location.search);
    const id = param.get("id");

    let product = {
      id: "",
      title: "No product selected",
      price: 0,
    }; // Default product object

    if (id !== null) {
      const response = await fetch(API_URL + `/${id}`);

      const data = await response.json();
      product = data.data;
    }

    const productDiv = document.createElement("div");
    const backButton = document.createElement("a");

    productDiv.className = "product-details";
    backButton.className = "nice-button";
    backButton.textContent = "Back to Products";
    if (id !== null) {
      backButton.href = "../product/index.html" + `?id=${product.id}`;
    } else {
      backButton.href = "../index.html";
    }

    // Create a table for product details
    const table = document.createElement("table");
    table.className = "product-table";

    // Add table headers
    const headerRow = document.createElement("tr");
    const headerProduct = document.createElement("th");
    const headerPrice = document.createElement("th");
    headerProduct.textContent = "Product";
    headerProduct.className = "table-header-left"; // Apply the CSS class
    headerPrice.textContent = "Price";
    headerPrice.className = "table-header-left"; // Apply the CSS class
    headerRow.appendChild(headerProduct);
    headerRow.appendChild(headerPrice);
    table.appendChild(headerRow);

    // Retrieve existing cart items from sessionStorage
    let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

    if (id !== null) {
      // Add the new product to the cart
      cartItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
      });
    }

    // Save the updated cart back to sessionStorage
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

    //loop through the cart items and create table rows
    cartItems.forEach((item, index) => {
      const productRow = document.createElement("tr");
      const productCell = document.createElement("td");
      const priceCell = document.createElement("td");
      const removeCell = document.createElement("td");
      const removeButton = document.createElement("button");

      productCell.textContent = item.title;
      priceCell.textContent = "$" + item.price;

      removeButton.textContent = "X";
      removeButton.title = "Remove"; // Add a tooltip
      removeButton.className = "remove-button";
      removeButton.addEventListener("click", () => {
        // Remove the item from the cart
        cartItems.splice(index, 1);

        // Update sessionStorage
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Refresh the UI
        productRow.remove();

        // Recalculate the total price
        const updatedTotalPrice = cartItems.reduce(
          (sum, item) => sum + item.price,
          0
        );
        summaryValueCell.textContent = "$" + updatedTotalPrice.toFixed(2);

        if (cartItems.length === 0) {
          // If the cart is empty, remove the table
          window.location.href = "index.html"; // Refresh to empty page
        }
      });

      removeCell.appendChild(removeButton);
      productRow.appendChild(productCell);
      productRow.appendChild(priceCell);
      productRow.appendChild(removeCell);
      table.appendChild(productRow);
    });

    // Calculate the total price of all items in the cart
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    // Create an empty row just for spacing
    const emptyRow = document.createElement("tr");
    const emptyCell1 = document.createElement("td");
    const emptyCell2 = document.createElement("td");

    emptyCell1.textContent = ""; // Empty cell for spacing
    // Add empty cells to the empty row
    emptyRow.appendChild(emptyCell1);
    emptyRow.appendChild(emptyCell2);

    // Append the empty row to the table
    table.appendChild(emptyRow);

    // Add summary row
    const summaryRow = document.createElement("tr");
    const summaryLabelCell = document.createElement("td");
    const summaryValueCell = document.createElement("td");

    summaryLabelCell.textContent = "Total";
    summaryValueCell.textContent = "$" + totalPrice.toFixed(2);
    summaryValueCell.style.fontWeight = "bold";
    summaryLabelCell.style.fontWeight = "bold";

    summaryRow.appendChild(summaryLabelCell);
    summaryRow.appendChild(summaryValueCell);
    table.appendChild(summaryRow);

    // Append the table and other elements to the productDiv
    productDiv.appendChild(table);

    // Add "Empty Cart" and "Checkout" buttons below the table
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";

    // Create "Empty Cart" button
    const emptyCartButton = document.createElement("button");
    emptyCartButton.textContent = "Empty Cart";
    emptyCartButton.className = "nice-button"; // Apply the same class as "Back to Products"
    emptyCartButton.addEventListener("click", () => {
      // Clear the cart
      cartItems = [];
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Refresh the UI
      table.innerHTML = ""; // Clear the table
      summaryValueCell.textContent = "$0.00"; // Reset total price

      // Navigate to cart.html
      window.location.href = "index.html";
    });

    // Create "Checkout" button
    const checkoutButton = document.createElement("button");
    checkoutButton.textContent = "Checkout";
    checkoutButton.className = "nice-button"; // Apply the same class as "Back to Products"

    // Append buttons to the container
    buttonContainer.appendChild(emptyCartButton);

    // Append the "Back to Products" button to the button container
    buttonContainer.appendChild(backButton);

    // Append the button container (with "Empty Cart" and "Back to Products" buttons) below the table
    productDiv.appendChild(buttonContainer);

    // Add a form for shipping and payment details
    const form = document.createElement("form");
    form.className = "checkout-form";

    // Create input fields for name, address, email, and payment details
    const nameField = document.createElement("input");
    nameField.type = "text";
    nameField.placeholder = "Full Name";
    nameField.required = true;
    nameField.className = "form-input";

    const addressField = document.createElement("input");
    addressField.type = "text";
    addressField.placeholder = "Shipping Address";
    addressField.required = true;
    addressField.className = "form-input";

    const emailField = document.createElement("input");
    emailField.type = "email";
    emailField.placeholder = "Email Address";
    emailField.required = true;
    emailField.className = "form-input";

    const paymentField = document.createElement("input");
    paymentField.type = "text";
    paymentField.placeholder = "Payment Details (e.g., Card Number)";
    paymentField.required = true;
    paymentField.className = "form-input";
    

    // Append input fields to the form
    form.appendChild(nameField);
    form.appendChild(addressField);
    form.appendChild(emailField); 
    form.appendChild(paymentField);

    // Add the form below the table
    productDiv.appendChild(form);

    // Move the "Checkout" button after the form
    form.appendChild(checkoutButton); // Append the checkout button to the form

    // Update the "Checkout" button to validate the form
    checkoutButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent the form from submitting

      if (form.checkValidity()) {
        // Clear the cart
        cartItems = [];
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Hide the form and table
        productDiv.innerHTML = "";

        // Display the order confirmation message
        const confirmationMessage = document.createElement("div");
        confirmationMessage.className = "order-confirmation";
        confirmationMessage.innerHTML = `
          <h2>Thank you for your order!</h2>
          <p>Your order has been successfully placed and will be shipped to:</p>
          <p><strong>Name:</strong> ${nameField.value}</p>
          <p><strong>Address:</strong> ${addressField.value}</p>
          <p><strong>Email:</strong> ${emailField.value}</p>
          <p>We will send you a confirmation email shortly.</p>
        `;

        // Append the confirmation message to the productDiv
        productDiv.appendChild(confirmationMessage);
      } else {
        alert("Please fill out all required fields.");
      }
    });

    container.appendChild(productDiv);
  } catch (error) {
    container.textContent = "Failed to load products. Please try again later.";
  }
}

fetchAndCreateProduct();
