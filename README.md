# The Gaming Arena - Website Documentation

A modern, high-performance, dark cyberpunk-themed website built for **The Gaming Arena** gaming café. Designed to showcase next-generation console gaming (PlayStation 5 & PlayStation 4), Tekken arcade cabinets, community tournaments, transparent pricing, and instant contact options via WhatsApp and direct calling.

---

## 🚀 Quick Start / How to Run

Because this website is built with clean, zero-dependency HTML5, CSS3, and modern vanilla JavaScript, no complex Node.js build steps or npm installations are required!

### Option 1: Direct Double-Click
Simply double-click `index.html` in your file explorer to open it in any web browser (Chrome, Edge, Safari, Firefox, Opera).

### Option 2: Local Python Server (Recommended for testing)
Open terminal / command prompt in this folder and run:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000` in your browser.

---

## ⚙️ Central Business Configuration (`config.js`)

All essential business information is centralized in **`config.js`**. You don't need to hunt through HTML to update prices, phone numbers, or opening hours!

### 1. Updating Address
In `config.js`, find `ARENA_CONFIG.contact.address`:
```javascript
address: "Shop No. 12, Cyber Mall, Near Metro Station, [Your City]",
```
When updated, the address changes automatically across the Hero, Location, Contact, and Footer sections!

### 2. Updating Phone & WhatsApp
In `config.js`:
```javascript
phone: "+91 98765 43210",
phoneDisplay: "+91 98765 43210",
whatsapp: "919876543210", // Country code + 10 digits without '+' or '-'
whatsappDisplay: "+91 98765 43210",
```
This automatically updates:
- Desktop & mobile "Call Now" buttons (`tel:` links)
- One-tap WhatsApp chat buttons with pre-filled greeting message
- Mobile sticky quick-action bar at the bottom of the screen

### 3. Updating Opening Hours & Live Status
In `config.js`:
```javascript
openingHours: {
  displayDays: "Monday – Sunday",
  displayTime: "11:00 AM – 10:00 PM",
  openHour24: 11, // Opening hour (24h format)
  closeHour24: 22, // Closing hour (24h format: 22 = 10 PM)
}
```
The website automatically compares your system's current time with these values to display a live `🟢 OPEN NOW • Closes 10:00 PM` or `🔴 CLOSED NOW • Opens 11:00 AM` badge in the header and schedule card!

### 4. Updating Game Prices
In `config.js`:
```javascript
pricing: {
  ps5: { rate: 50 }, // PS5 ₹50 / hour
  ps4: { rate: 50 }, // PS4 ₹50 / hour
  tekken: {
    packages: [
      { price: 10, coins: 6, label: "Starter Pack" },
      { price: 20, coins: 12, label: "Fighter Pack" },
      { price: 50, coins: 30, label: "Brawler Pack", popular: true },
      { price: 100, coins: 60, label: "Arcade Champion", bestValue: true }
    ]
  }
}
```

### 5. Managing Tournaments
In `config.js`, you can add, edit, or remove tournaments under `ARENA_CONFIG.tournaments`. When a visitor clicks **"Join Tournament"**, an interactive registration modal appears and generates a formatted WhatsApp message with player details and entry fee!

### 6. Updating Gallery Photos
In `config.js`, modify `ARENA_CONFIG.gallery` with paths to your real café photos (e.g. `images/ps5-setup.jpg`). Each image includes click-to-zoom Lightbox preview.

### 7. Google Maps Integration
In `config.js`, update:
```javascript
maps: {
  embedUrl: "YOUR_GOOGLE_MAPS_IFRAME_SRC",
  directionsUrl: "YOUR_GOOGLE_MAPS_DIRECTIONS_LINK"
}
```

---

## 📱 Mobile-First Features
- **Mobile Quick Action Bar**: Persistent bar docked at the bottom of smartphone screens with one-touch **"Call Now"** and **"WhatsApp"** buttons.
- **Responsive at 375px**: Fully tested on 375px (iPhone SE / standard compact mobile) up to 4K ultra-wide monitors with zero horizontal overflow.
- **Smooth Navigation Drawer**: Fast hamburger menu with smooth transitions and auto-close upon selecting a section.

---

## 🎨 Design System
- **Theme**: Dark Cyberpunk / Gaming Lounge
- **Colors**:
  - Background: Deep Carbon Void (`#07090e`, `#0c101a`)
  - Accent 1: Electric Cyan (`#00f0ff`)
  - Accent 2: Neon Purple (`#a855f7`)
  - Accent 3: Toxic Emerald Green (`#00ff88`)
  - Accent 4: Arcade Gold (`#ffaa00`)
- **Typography**: Google Fonts `Orbitron` (Futuristic Gaming Headings) & `Outfit` (Clean, High-Readability Body).
- **Icons**: Inline scalable SVGs and gaming emojis.

---

## 🌐 Deployment
This website is ready for deployment on:
- **Netlify**: Drag and drop the `thegamingarena` folder into Netlify Drop.
- **Vercel**: Deploy with 1 click.
- **GitHub Pages**: Push to repository and enable GitHub Pages on the `main` branch.
- **Hostinger / cPanel / Shared Hosting**: Upload files into `public_html`.
