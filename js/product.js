const container = document.getElementById("product");
const API_URL = "https://v2.api.noroff.dev/rainy-days";

async function fetchAndCreateProduct() {
  try {
    if (!container) return;
    const param = new URLSearchParams(window.location.search);
    const id = param.get("id");
    if (!id) {
      container.textContent = "No product found";
      return;
    }

    const response = await fetch(API_URL + `/${id}`);
    const data = await response.json();
    const product = data.data;

    // if (products.length === 0) {
    //   container.textContent = "No products available.";
    // }

    const productDiv = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("h3");
    const price = document.createElement("p");
    const description = document.createElement("p");
    const addToCartButton = document.createElement("a");
    const backButton = document.createElement("a");

    productDiv.className = "product-details";
    image.className = "product-image";
    title.className = "product-title";
    price.className = "product-price";
    description.className = "product-description";
    addToCartButton.className = "nice-button";
    backButton.className = "nice-button";

    image.src = product.image.url;
    image.alt = product.image.alt;
    title.textContent = product.title;
    price.textContent = "$" + product.price;
    description.textContent = product.description;
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.href = "../checkout/index.html" + `?id=${product.id}`;
    addToCartButton.setAttribute(
      "aria-label",
      `View details for ${product.title}`
    );

    backButton.textContent = "Back to Products";
    if (product.gender === "Male") {
      backButton.href = "../men.html";
    } else if (product.gender === "Female") {
      backButton.href = "../woman.html";
    }

    productDiv.appendChild(image);
    productDiv.appendChild(title);
    productDiv.appendChild(price);
    productDiv.appendChild(description);
    productDiv.appendChild(addToCartButton);
    productDiv.appendChild(backButton);

    container.appendChild(productDiv);
  } catch (error) {
    container.textContent = "Failed to load products. Please try again later.";
  }
}

fetchAndCreateProduct();
