const container = document.getElementById("product");
const API_URL = "https://v2.api.noroff.dev/rainy-days";

const MESSAGES = {
  loading: "Loading...",
  noProduct: "No product found.",
  error: "Failed to load product details. Please try again later.",
};

async function fetchAndCreateProduct() {
  try {
    if (!container) return;
    const param = new URLSearchParams(window.location.search);
    const id = param.get("id");
    if (!id) {
      container.textContent = "No product found";
      return;
    }

    const loadingIndicator = document.createElement("div");
    loadingIndicator.textContent = MESSAGES.loading;
    container.appendChild(loadingIndicator);

    try {
      const response = await fetch(API_URL + `/${id}`);
      const data = await response.json();
      const product = data.data;

      if (!id || !product) {
        container.innerHTML = `
          <p>No product found. <a href="../index.html">Return to product list</a>.</p>
        `;
        return;
      }

      loadingIndicator.remove(); // Remove after successful fetch

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

      productDiv.setAttribute("role", "region");
      productDiv.setAttribute("aria-labelledby", "product-title");
      title.id = "product-title";

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
      } else {
        backButton.href = "../index.html"; // Default fallback
      }

      productDiv.appendChild(image);
      productDiv.appendChild(title);
      productDiv.appendChild(price);
      productDiv.appendChild(description);
      productDiv.appendChild(addToCartButton);
      productDiv.appendChild(backButton);

      container.appendChild(productDiv);
    } catch (error) {
      loadingIndicator.remove(); // Remove even if an error occurs
      container.textContent =
        "Failed to load product details. Please try again later.";
    }
  } catch (error) {
    container.textContent = "Failed to load products. Please try again later.";
    container.setAttribute("aria-live", "polite");
  }
}

fetchAndCreateProduct();
