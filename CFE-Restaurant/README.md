# CFE Restaurant — Premium Fine Dining & Café Website

A commercial-grade, fully responsive restaurant web application built **strictly using standard web technologies**:
- **HTML5** (Semantic structure & accessible markup)
- **CSS3** (Custom design system with rich cream, deep emerald green, and champagne gold aesthetics)
- **Vanilla JavaScript** (Modern ES6+ frontend interactivity and state management without frameworks or libraries)

---

## 🏛️ Project Design & Aesthetic

CFE Restaurant was created to evoke the atmosphere of a regal, Michelin-inspired establishment:
- **Backgrounds**: Soft luxury cream (`#FAF7F2`) and warm beige (`#F3EFE6`).
- **Deep Emerald Accents**: `#123826` and `#0A2116` providing royal grounding and high-contrast readability.
- **Champagne Gold Highlights**: `#C5A059` and `#DFBF7B` adding subtle sophistication and warmth.
- **Typography**: Editorial serif headings powered by Google Fonts *Playfair Display* paired with clean, accessible body copy from *Plus Jakarta Sans*.
- **Micro-Interactions**: Hover elevation lifts, smooth backdrop-blur navigation transitions, animated notification toasts, and custom modal overlays.

---

## 📂 Directory Structure

```
CFE-Restaurant/
├── index.html            # Home page (Hero, specials, philosophy, testimonials, gallery, hours)
├── menu.html             # Menu page (8 categories, search, price sorting, veg/non-veg filter)
├── login.html            # User login simulation (show/hide password, forgot password modal)
├── register.html         # User registration (validation, password strength, live avatar preview)
├── profile.html          # User profile (view/edit info, photo upload/replace/remove, order history)
├── cart.html             # Shopping cart (stepper controls, 5% GST, promo code, demo checkout)
├── reservation.html      # Table reservation (date restrictions, time slots, demo booking pass)
├── about.html            # About Us (culinary heritage story, 4 philosophy pillars, chef brigade)
├── contact.html          # Contact Us (validation, placeholder address/phones, interactive map)
├── css/
│   └── style.css         # Master CSS design system, responsive breakpoints, cards & modals
├── js/
│   ├── main.js           # Shared navigation, mobile drawer, cart storage engine, toasts, user session
│   ├── menu.js           # Menu dataset (24+ dishes across 8 categories), search, filter & quick view
│   ├── auth.js           # Auth validation, password toggles, strength meter, avatar preview
│   ├── profile.js        # Profile state, editing, file preview reader, photo remove, demo tabs
│   ├── cart.js           # Cart calculations, promo discounts, quantity adjustments, demo checkout
│   └── reservation.js    # Reservation form validation, time pills, demo booking ticket modal
├── assets/
│   └── images/           # High quality dishes, chef specialities, and café photography
└── README.md             # Project documentation and local execution guide
```

---

## 🍽️ Pages & Functional Capabilities

### 1. Home (`index.html`)
- Hero section with the headline **"Exceptional Taste. Unforgettable Moments."**
- Dual Call-to-Action buttons: **Explore Menu** and **Reserve a Table**.
- Restaurant introduction highlighting farm-to-table culinary craftsmanship.
- Featured dishes grid with direct **Add to Cart** action buttons.
- Customer testimonials and restaurant gallery.
- Operating hours breakdown and footer with contact placeholders.

### 2. Menu (`menu.html`)
- Displays items across **8 distinct categories**:
  1. *Starters*
  2. *South Indian*
  3. *North Indian*
  4. *Biryani*
  5. *Chinese*
  6. *Pizza and Burgers*
  7. *Desserts*
  8. *Beverages*
- **Real-Time Search**: Filters dishes instantly as you type names, ingredients, or spices.
- **Dietary Filter**: Quickly toggle between *All Dishes*, *Veg Only*, or *Non-Veg*.
- **Price & Rating Sorting**: Sort by *Price: Low to High*, *Price: High to Low*, or *Rating: Highest First*.
- **Dish Quick View**: Modal showcasing ingredient profiles, category tags, and direct cart actions.

### 3. Shopping Cart (`cart.html`)
- Live persistent cart synchronized across all pages via `localStorage`.
- Itemized display: Product image, name, category, unit price, and subtotal.
- Interactive quantity controls (`-` and `+` steppers).
- Clear cart and item removal with confirmation.
- Automatic bill calculations:
  - Subtotal
  - GST & Restaurant Tax (5%)
  - Packaging / Delivery fee (Free above ₹1,000)
  - Promotional discount coupon code (`CFE10` for 10% off or `ROYAL100` for ₹100 off)
  - Grand total payable
- **Demo Checkout Flow**: Modal to select dining format (Dine-In, Takeaway, Delivery) and demo payment method (UPI, Card, Dine counter) with instant order reference receipt generation.

### 4. Table Reservation (`reservation.html`)
- Reservation form requesting: Guest Name, Email, 10-digit Phone, Date, Guests, Seating preference, and Special requests.
- Calendar restricts selection to today or future dates.
- Interactive **Lunch & Dinner time slot selection pills**.
- Client-side validation for phone numbers, email formats, and mandatory fields.
- Generates a demonstration reservation confirmation pass with reference code (`CFE-RES-XXXX`).
- Demonstrates clear disclaimer that reservations are a frontend simulation.

### 5. Registration (`register.html`)
- Fields: Full Name, Username, Email, 10-digit Phone, Password, Confirm Password, and optional Profile Photo.
- **Live Avatar Upload & Preview**: Uses the browser's `FileReader` API to instantly preview any chosen image before submitting.
- **Dynamic Password Strength Indicator**: Evaluates length, numbers, uppercase letters, and symbols with color-coded feedback.
- Confirm password matching validation.
- Saves non-sensitive profile information to `localStorage` and logs the user in.

### 6. Login (`login.html`)
- Email or username authentication form with show/hide password visibility toggle.
- "Remember me" option and "Forgot Password" modal simulation.
- Convenient one-click demo credentials button to easily test the application.
- Sets client mock session and immediately reflects the user's name and avatar in the navigation bar.

### 7. User Profile (`profile.html`)
- Displays current user avatar, full name, username, email, phone, bio, and location.
- **Interactive Edit Mode**:
  - Edit name, username, email, phone, bio, and location.
  - Upload a new avatar photo with instant `FileReader` preview.
  - Replace or remove the photo (reverts to default avatar).
  - Save changes to `localStorage` or Cancel to revert.
- **Tabbed Activity**:
  - Dining overview & membership perks.
  - Demo past orders placed in the shopping cart.
  - Table booking requests placed through the reservation form.
- Sign out button to safely end the demo session.

### 8. About Us (`about.html`)
- Restaurant origin story and culinary heritage.
- Four core philosophy pillars: Stone-Ground Aromatics, Wood-Fired Hearth, Dum Pukht Sealing, and Artisanal Roastery.
- Executive Chef brigade profiles.
- Ambience and kitchen photo gallery.

### 9. Contact Us (`contact.html`)
- Interactive message form with validation.
- Placeholder restaurant contact details:
  - Address: *CFE Restaurant, 42 Royal Promenade, Indiranagar, Bengaluru, KA 560038*
  - Phone: *+91 98765 43210*
  - Email: *reservations@cferestaurant.example.com*
  - Service Hours: *Daily 11:30 AM – 11:30 PM*
- Styled map card preview.

---

## 🚀 How to Run the Project Locally

Because this project is built using standard HTML5, CSS3, and Vanilla JavaScript, it does **not require Node.js, npm, or any backend server**.

### Option 1: VS Code Live Server (Recommended)
1. Open Visual Studio Code.
2. In VS Code, go to **File** &rarr; **Open Folder...** and select the `CFE-Restaurant` folder.
3. Install the **Live Server** extension by *Ritwick Dey* (Extension ID: `ritwickdey.LiveServer`) if not already installed.
4. Right-click on `index.html` in the file explorer and select **"Open with Live Server"**.
5. Your default web browser will open at `http://127.0.0.1:5500/index.html`.

### Option 2: Python HTTP Server (Built-in)
If you have Python installed on your machine:
```bash
# Navigate to the CFE-Restaurant folder in terminal/powershell
cd CFE-Restaurant

# Start the simple server on port 8000
python -m http.server 8000
```
Open your browser and navigate to: `http://localhost:8000`

### Option 3: Direct Browser File Opening
You can simply double-click `index.html` (or drag and drop it into Chrome, Edge, Safari, or Firefox) to view the entire website directly via the `file://` protocol. All features (menu filtering, cart calculations, profile editing, and reservation generation) will function correctly.

---

## 🔒 Security & Demonstration Notice
This project is an advanced client-side frontend demonstration:
- Sensitive passwords, authentication tokens, or credit card numbers are **never stored** in `localStorage`.
- All payments, table bookings, and order receipts are purely illustrative client-side demonstrations.
