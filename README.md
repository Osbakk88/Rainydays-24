# Rainydays - Outdoor Jacket Store

![Rainydays Website Preview](https://github.com/user-attachments/assets/5fc011e0-e5f6-4111-8c72-74b8b3e926de)

## Description

A responsive e-commerce website for Norwegian outdoor jackets, featuring different styles for hiking, skiing, and everyday use. Built with HTML, CSS, and JavaScript.

This project demonstrates:

- Semantic HTML5 structure
- Modern CSS design with Grid and Flexbox
- API Integration - Fetching product data from Noroff API
- Dynamic product display with JavaScript
- Mobile-first responsive design
- Clean, modular CSS architecture

## Key Features

### Dynamic Product Pages

- JavaScript-powered product listings for men's and women's jackets
- Individual product detail pages
- Shopping cart functionality
- Responsive product grid layout

### Responsive Navigation

- Mobile-friendly hamburger menu
- Smooth sidebar navigation
- Consistent header and footer across all pages

### Page Structure

- **Home** - Hero section with brand introduction
- **Men's & Women's** - Product catalog pages with dynamic content
- **Product Details** - Individual product information
- **Cart/Checkout** - Shopping cart with form validation
- **About** - Company information and contact form

## Built With

- **HTML5** - For semantic page structure
- **CSS3** - Grid and Flexbox for responsive layouts
- **JavaScript** - Dynamic product display and cart functionality
- **Noroff API** - Product data endpoint (`https://v2.api.noroff.dev/rainy-days`)
- **GitHub** - Version control

## API Integration

This project uses the **Noroff Rainy Days API** to fetch product data dynamically:

- **Endpoint**: `https://v2.api.noroff.dev/rainy-days`
- **Features**:
  - Fetches all products with filtering by gender (Male/Female)
  - Retrieves individual product details by ID
  - Displays product images, titles, prices, and descriptions
  - Powers the shopping cart functionality

This was my **first project using an API**, demonstrating:

- Asynchronous JavaScript (async/await)
- Fetch API for HTTP requests
- Error handling and loading states
- Dynamic DOM manipulation based on API responses

## File Structure

```
Rainydays-24/
│
├── index.html
├── about.html
├── men.html
├── woman.html
│
├── checkout/
│   └── index.html
│
├── product/
│   └── index.html
│
├── css/
│   ├── style.css          # Main stylesheet
│   ├── variables.css      # Colors and spacing
│   ├── base.css           # Base styles and cards
│   ├── typography.css     # Font styles
│   ├── header.css         # Header layout
│   ├── nav.css            # Navigation styles
│   ├── home.css           # Homepage sections
│   ├── men.css            # Men's product page
│   ├── products.css       # Product details
│   └── cart.css           # Shopping cart
│
├── js/
│   ├── cart.js
│   ├── femaleproducts.js
│   ├── maleproducts.js
│   └── product.js
│
├── images/
│
└── README.md
```

## Getting Started

### Installing

1. Clone the repo:

```bash
git clone https://github.com/Osbakk88/Rainydays-24.git
```

2. Navigate to the project directory:

```bash
cd Rainydays-24
```

### Running

To run the project locally:

1. Open `index.html` in your web browser
2. No build process or dependencies required
3. JavaScript files load dynamically

## School Assignment

This is a project for Noroff School of Technology and Digital Media.

Assignment requirements:

- Multi-page website using HTML, CSS, and JavaScript
- Responsive design
- Semantic HTML
- Dynamic content loading
- E-commerce functionality

## Contributing

This is a student project for Noroff. Feedback and suggestions are welcome.

## Contact

Christina Anett Osbakk

## Acknowledgments

- GitHub Copilot for code assistance
- Noroff School of Technology and Digital Media
- Figma design inspiration

---

**Student**: Christina Anett Osbakk  
**Course**: FED1JAN24PT Front end developer  
**Year**: 2024/2025
