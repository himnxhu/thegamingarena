/**
 * =============================================================================
 * THE GAMING ARENA - CORE APPLICATION JAVASCRIPT
 * =============================================================================
 * Enhanced with CodePeek & CSSUI Interactive Systems:
 * - CodePeek Command Palette (⌘K / Ctrl+K) & Instant Global Search
 * - CodePeek Filter Pills & Micro-Interactions
 * - CSSUI Range Calculator (Tokens & Hours)
 * - Dynamic config hydration from ARENA_CONFIG
 * - Real-time Open/Closed live status calculator
 * - Navigation drawer & active scroll spy
 * - Tournament registration modal & WhatsApp prefilled messenger
 * - Quick station booking inquiry form
 * - Lightbox gallery viewer
 * =============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof ARENA_CONFIG === "undefined") {
    console.error("ARENA_CONFIG is missing! Please ensure config.js is loaded before app.js.");
    return;
  }

  initBrandAndConfig();
  initLiveHoursStatus();
  initNavigation();
  initGamesCatalog();
  initArcadeCalculator();
  initTournaments();
  initGallery();
  initContactForm();
  initCommandPalette();
  initScrollAnimations();
});

/**
 * Hydrates DOM elements with values from ARENA_CONFIG
 */
function initBrandAndConfig() {
  const cfg = ARENA_CONFIG;

  // Address placeholders
  document.querySelectorAll(".cfg-address").forEach(el => {
    el.textContent = cfg.contact.address;
  });

  // Phone numbers & tel links
  document.querySelectorAll(".cfg-phone-text").forEach(el => {
    el.textContent = cfg.contact.phoneDisplay;
  });
  document.querySelectorAll(".cfg-phone-link").forEach(el => {
    const cleanPhone = cfg.contact.phone.replace(/[^0-9+]/g, '');
    el.setAttribute("href", `tel:${cleanPhone}`);
  });

  // WhatsApp links & texts
  document.querySelectorAll(".cfg-whatsapp-text").forEach(el => {
    el.textContent = cfg.contact.whatsappDisplay;
  });
  document.querySelectorAll(".cfg-whatsapp-link").forEach(el => {
    const cleanWA = cfg.contact.whatsapp.replace(/[^0-9]/g, '');
    const encodedMsg = encodeURIComponent(cfg.contact.whatsappDefaultMessage);
    el.setAttribute("href", `https://wa.me/${cleanWA}?text=${encodedMsg}`);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  // Instagram links & handles
  document.querySelectorAll(".cfg-instagram-text").forEach(el => {
    el.textContent = cfg.contact.instagramHandle;
  });
  document.querySelectorAll(".cfg-instagram-link").forEach(el => {
    let url = cfg.contact.instagram;
    if (!url.startsWith("http")) {
      url = `https://instagram.com/${url.replace("@", "")}`;
    }
    el.setAttribute("href", url);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  // Google Maps directions button
  document.querySelectorAll(".cfg-directions-link").forEach(el => {
    let url = cfg.maps.directionsUrl;
    if (url.includes("[ENTER+GAMING+ARENA+ADDRESS+HERE]")) {
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cfg.contact.address)}`;
    }
    el.setAttribute("href", url);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  // Google Maps Iframe Embed
  const mapIframe = document.getElementById("google-map-iframe");
  if (mapIframe) {
    let embedUrl = cfg.maps.embedUrl;
    if (embedUrl.includes("[ENTER+GAMING+ARENA+ADDRESS+HERE]")) {
      embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(cfg.contact.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
    mapIframe.setAttribute("src", embedUrl);
  }

  // Hours
  document.querySelectorAll(".cfg-hours-days").forEach(el => {
    el.textContent = cfg.openingHours.displayDays;
  });
  document.querySelectorAll(".cfg-hours-timing").forEach(el => {
    el.textContent = cfg.openingHours.displayTime;
  });

  // Prices
  document.querySelectorAll(".cfg-ps5-rate").forEach(el => {
    el.textContent = cfg.pricing.ps5.rate;
  });
  document.querySelectorAll(".cfg-ps4-rate").forEach(el => {
    el.textContent = cfg.pricing.ps4.rate;
  });
}

/**
 * Calculates current open/closed status based on current local time
 */
function initLiveHoursStatus() {
  const { openHour24, closeHour24, displayTime, closedDays } = ARENA_CONFIG.openingHours;
  const closedDayList = closedDays || [];

  function updateStatus() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const isClosedToday = closedDayList.includes(dayOfWeek);

    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeDecimal = currentHour + (currentMinutes / 60);

    const isOpen = !isClosedToday && currentTimeDecimal >= openHour24 && currentTimeDecimal < closeHour24;

    const livePills = document.querySelectorAll(".live-status-pill");
    livePills.forEach(pill => {
      if (isOpen) {
        pill.className = "live-status-badge status-open";
        pill.innerHTML = `<span class="pulse-dot"></span> OPEN NOW • Closes ${formatHourTo12(closeHour24)}`;
      } else if (isClosedToday) {
        pill.className = "live-status-badge status-closed";
        pill.innerHTML = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#ff3366;"></span> CLOSED TODAY (Monday Off)`;
      } else {
        pill.className = "live-status-badge status-closed";
        pill.innerHTML = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#ff3366;"></span> CLOSED NOW • Opens ${formatHourTo12(openHour24)}`;
      }
    });

    // Nav brand status
    const navStatus = document.getElementById("nav-live-status");
    if (navStatus) {
      if (isOpen) {
        navStatus.innerHTML = `<span class="pulse-dot"></span> Open Today (${displayTime})`;
        navStatus.style.color = "var(--neon-green)";
      } else if (isClosedToday) {
        navStatus.innerHTML = `<span style="color:#ff3366;">●</span> Closed Today (Monday Off)`;
        navStatus.style.color = "var(--text-muted)";
      } else {
        navStatus.innerHTML = `<span style="color:#ff3366;">●</span> Closed • Opens ${formatHourTo12(openHour24)}`;
        navStatus.style.color = "var(--text-muted)";
      }
    }
  }

  updateStatus();
  setInterval(updateStatus, 60000);
}

function formatHourTo12(hour24) {
  if (hour24 === 0) return "12:00 AM";
  if (hour24 < 12) return `${hour24}:00 AM`;
  if (hour24 === 12) return "12:00 PM";
  return `${hour24 - 12}:00 PM`;
}

/**
 * Sticky Navigation, Active Scroll Spy & Mobile Drawer
 */
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  // Sticky header shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });

  // Mobile Drawer Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", isOpen);
      mobileToggle.innerHTML = isOpen
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // Active section observer for desktop nav
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });
}

/**
 * Interactive Games Catalog with CodePeek Filter Pills & Search
 */
function initGamesCatalog() {
  const gamesGrid = document.getElementById("games-grid");
  const filterBtns = document.querySelectorAll(".filter-btn, .filter-pill");

  if (!gamesGrid) return;

  const games = ARENA_CONFIG.gamesCatalog;

  function renderGames(filter = "all") {
    gamesGrid.innerHTML = "";

    const filteredGames = filter === "all"
      ? games
      : games.filter(g => g.categories.includes(filter));

    if (filteredGames.length === 0) {
      gamesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          <p>No games found for this category. Ask staff at the counter for our complete library!</p>
        </div>
      `;
      return;
    }

    filteredGames.forEach(game => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <div class="game-cover-art" style="background: ${game.coverGradient};">
          <span class="game-cover-icon">${game.icon || "🎮"}</span>
          <span class="game-platform-tag">${game.platform}</span>
        </div>
        <div class="game-info-body">
          <h4 class="game-title">${game.title}</h4>
          <span class="game-genre">${game.genre}</span>
          <div class="game-meta-row">
            <span class="game-players">👥 ${game.players}</span>
            <span style="color: var(--neon-cyan); font-weight: 700;">${game.badge}</span>
          </div>
        </div>
      `;
      gamesGrid.appendChild(card);
    });
  }

  // Filter Pills Click Handling
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter") || "all";
      renderGames(category);
    });
  });

  renderGames("all");
}

/**
 * CSSUI-Inspired Arcade Coin / Budget Calculator
 */
function initArcadeCalculator() {
  const slider = document.getElementById("budget-calc-slider");
  const budgetDisplay = document.getElementById("calc-budget-display");
  const coinsDisplay = document.getElementById("calc-coins-result");
  const hoursDisplay = document.getElementById("calc-hours-result");

  if (!slider) return;

  function updateCalculation() {
    const budget = parseInt(slider.value, 10);
    if (budgetDisplay) budgetDisplay.textContent = `₹${budget}`;

    // Tekken coin rate: ₹10 = 6 coins (0.6 coins per rupee)
    const coins = Math.floor(budget * 0.6);
    if (coinsDisplay) coinsDisplay.textContent = `${coins} Arcade Coins`;

    // Console hours: ₹50 / hour
    const hours = (budget / 50).toFixed(1).replace(/\.0$/, '');
    if (hoursDisplay) hoursDisplay.textContent = `or ${hours} Console Hours`;
  }

  slider.addEventListener("input", updateCalculation);
  updateCalculation();
}

/**
 * Upcoming Tournaments List & Modal Registration
 */
function initTournaments() {
  const tournamentsGrid = document.getElementById("tournaments-grid");
  const modal = document.getElementById("tournament-modal");
  const modalClose = document.getElementById("modal-close-btn");
  const regForm = document.getElementById("tournament-reg-form");
  const tournamentNameInput = document.getElementById("modal-tournament-name");

  if (!tournamentsGrid) return;

  const tournaments = ARENA_CONFIG.tournaments;
  tournamentsGrid.innerHTML = "";

  tournaments.forEach(tourney => {
    const card = document.createElement("div");
    card.className = "tournament-card";
    card.innerHTML = `
      <div class="tournament-top-meta">
        <span class="badge badge-${tourney.badgeColor || 'cyan'}">${tourney.category}</span>
        <span style="font-size: 0.8rem; color: var(--neon-green); font-weight: 700;">🟢 ${tourney.seatsLeft}</span>
      </div>
      <h3 class="tournament-title">${tourney.title}</h3>
      <div class="tournament-details-list">
        <div class="tournament-detail-item">
          <span class="item-label">📅 Date & Time:</span>
          <span class="item-value">${tourney.date} • ${tourney.time}</span>
        </div>
        <div class="tournament-detail-item">
          <span class="item-label">⚔️ Game & Format:</span>
          <span class="item-value">${tourney.game} (${tourney.format})</span>
        </div>
        <div class="tournament-detail-item">
          <span class="item-label">🎟️ Entry Fee:</span>
          <span class="item-value" style="color: var(--neon-cyan);">${tourney.entryFee}</span>
        </div>
        <div class="tournament-detail-item">
          <span class="item-label">🏆 Prize Pool:</span>
          <span class="item-value prize-pool-highlight">${tourney.prizePool}</span>
        </div>
      </div>
      <div class="tournament-card-footer">
        <button class="btn btn-purple open-tourney-btn" style="width: 100%;" data-tourney="${tourney.title}" data-game="${tourney.game}" data-fee="${tourney.entryFee}">
          Join Tournament
        </button>
      </div>
    `;
    tournamentsGrid.appendChild(card);
  });

  // Open modal triggers
  document.querySelectorAll(".open-tourney-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.getAttribute("data-tourney");
      const game = btn.getAttribute("data-game");
      const fee = btn.getAttribute("data-fee");

      if (tournamentNameInput) {
        tournamentNameInput.value = `${title} (${game} - Entry ${fee})`;
      }
      if (modal) modal.classList.add("active");
    });
  });

  // Close modal triggers
  if (modalClose) {
    modalClose.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  // Registration Form Submit via WhatsApp
  if (regForm) {
    regForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reg-player-name")?.value || "Player";
      const phone = document.getElementById("reg-player-phone")?.value || "";
      const tourney = tournamentNameInput?.value || "Upcoming Tournament";
      const gamertag = document.getElementById("reg-player-tag")?.value || "N/A";

      const message = `🏆 *TOURNAMENT REGISTRATION - THE GAMING ARENA*\n` +
        `• Player Name: ${name}\n` +
        `• Gamertag: ${gamertag}\n` +
        `• Contact Phone: ${phone}\n` +
        `• Tournament: ${tourney}\n` +
        `Please confirm my slot and send payment details!`;

      const cleanWA = ARENA_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '');
      const url = `https://wa.me/${cleanWA}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");

      modal.classList.remove("active");
      showToast("Registration initiated! Opening WhatsApp...");
    });
  }
}

/**
 * Gallery Masonry Grid & Lightbox Image Viewer
 */
function initGallery() {
  const galleryGrid = document.getElementById("gallery-grid");
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDesc = document.getElementById("lightbox-desc");
  const lightboxClose = document.getElementById("lightbox-close");

  if (!galleryGrid) return;

  const items = ARENA_CONFIG.gallery;
  galleryGrid.innerHTML = "";

  items.forEach(item => {
    const el = document.createElement("div");
    el.className = "gallery-item";
    el.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.onerror=null; this.style.display='none'; this.parentElement.style.background='${item.fallbackGradient}';">
      <div class="gallery-overlay">
        <h4 class="gallery-title">${item.title}</h4>
        <span class="gallery-caption">${item.description}</span>
      </div>
    `;

    el.addEventListener("click", () => {
      if (lightbox && lightboxImg) {
        lightboxImg.src = item.image;
        if (lightboxTitle) lightboxTitle.textContent = item.title;
        if (lightboxDesc) lightboxDesc.textContent = item.description;
        lightbox.classList.add("active");
      }
    });

    galleryGrid.appendChild(el);
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightbox) lightbox.classList.remove("active");
      const tourneyModal = document.getElementById("tournament-modal");
      if (tourneyModal) tourneyModal.classList.remove("active");
      const cmdModal = document.getElementById("cmd-modal");
      if (cmdModal) cmdModal.classList.remove("active");
    }
  });
}

/**
 * Station Booking & Inquiry Form (Direct to WhatsApp)
 */
function initContactForm() {
  const bookingForm = document.getElementById("station-booking-form");
  if (!bookingForm) return;

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("book-name")?.value.trim() || "Gamer";
    const phone = document.getElementById("book-phone")?.value.trim() || "";
    const consoleChoice = document.getElementById("book-console")?.value || "PS5";
    const players = document.getElementById("book-players")?.value || "1 Player";
    const time = document.getElementById("book-time")?.value || "Today";
    const notes = document.getElementById("book-notes")?.value.trim() || "None";

    const message = `🎮 *STATION BOOKING / INQUIRY - THE GAMING ARENA*\n` +
      `• Name: ${name}\n` +
      `• Phone: ${phone}\n` +
      `• Setup: ${consoleChoice}\n` +
      `• Players: ${players}\n` +
      `• Preferred Time: ${time}\n` +
      `• Special Requests: ${notes}\n` +
      `Is a station available for this time?`;

    const cleanWA = ARENA_CONFIG.contact.whatsapp.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanWA}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    showToast("Booking inquiry created! Opening WhatsApp...");
  });
}

/**
 * CodePeek Style Command Palette (⌘K / Ctrl+K) & Hero Search
 */
function initCommandPalette() {
  const cmdModal = document.getElementById("cmd-modal");
  const cmdInput = document.getElementById("cmd-input");
  const cmdResults = document.getElementById("cmd-results");
  const cmdTriggers = document.querySelectorAll("[data-cmd-trigger]");

  // Hero Quick Search elements
  const heroSearchInput = document.getElementById("hero-game-search");
  const heroSearchResults = document.getElementById("hero-search-results");

  // Search Items Index
  const searchIndex = [
    { title: "PS5 Console Station (₹50/hr)", type: "Station / Price", target: "#prices" },
    { title: "PS4 Console Station (₹50/hr)", type: "Station / Price", target: "#prices" },
    { title: "Tekken Arcade Coins (₹10 → 6 Coins)", type: "Arcade / Price", target: "#prices" },
    { title: "Tekken 8 Arena King Tournament", type: "Tournament", target: "#tournaments" },
    { title: "EA SPORTS FC Showdown Tournament", type: "Tournament", target: "#tournaments" },
    { title: "Mortal Kombat Fatality Clash", type: "Tournament", target: "#tournaments" },
    { title: "EA SPORTS FC 25 / FC 24", type: "Game", target: "#games" },
    { title: "Tekken 8", type: "Game", target: "#games" },
    { title: "Tekken 7", type: "Game", target: "#games" },
    { title: "Mortal Kombat 1", type: "Game", target: "#games" },
    { title: "Grand Theft Auto V", type: "Game", target: "#games" },
    { title: "Call of Duty: Modern Warfare III", type: "Game", target: "#games" },
    { title: "Marvel's Spider-Man 2", type: "Game", target: "#games" },
    { title: "Street Fighter 6", type: "Game", target: "#games" },
    { title: "Opening Hours & Schedule", type: "Schedule", target: "#hours" },
    { title: "Café Location & Google Maps", type: "Location", target: "#location" },
    { title: "Reserve Station / Contact Us", type: "Booking", target: "#contact" },
    { title: "Frequently Asked Questions", type: "Help", target: "#faq" }
  ];

  function openCommandPalette() {
    if (!cmdModal) return;
    cmdModal.classList.add("active");
    if (cmdInput) {
      cmdInput.value = "";
      cmdInput.focus();
      renderCmdResults("");
    }
  }

  function closeCommandPalette() {
    if (cmdModal) cmdModal.classList.remove("active");
  }

  function renderCmdResults(query) {
    if (!cmdResults) return;
    cmdResults.innerHTML = "";

    const q = query.toLowerCase().trim();
    const matches = q === ""
      ? searchIndex.slice(0, 7)
      : searchIndex.filter(item => item.title.toLowerCase().includes(q) || item.type.toLowerCase().includes(q));

    if (matches.length === 0) {
      cmdResults.innerHTML = `
        <div style="padding: 20px; text-align: center; color: var(--text-muted);">
          No matching game, console, or section found.
        </div>
      `;
      return;
    }

    matches.forEach(match => {
      const itemEl = document.createElement("div");
      itemEl.className = "cmd-item";
      itemEl.innerHTML = `
        <div class="cmd-item-main">
          <span>⚡</span>
          <span>${match.title}</span>
        </div>
        <span class="cmd-item-tag">${match.type}</span>
      `;

      itemEl.addEventListener("click", () => {
        closeCommandPalette();
        const targetEl = document.querySelector(match.target);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      });

      cmdResults.appendChild(itemEl);
    });
  }

  // Keyboard shortcut ⌘K / Ctrl+K
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (cmdModal && cmdModal.classList.contains("active")) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    }
  });

  cmdTriggers.forEach(btn => {
    btn.addEventListener("click", openCommandPalette);
  });

  if (cmdInput) {
    cmdInput.addEventListener("input", (e) => {
      renderCmdResults(e.target.value);
    });
  }

  if (cmdModal) {
    cmdModal.addEventListener("click", (e) => {
      if (e.target === cmdModal) closeCommandPalette();
    });
  }

  // Hero search bar handling
  if (heroSearchInput && heroSearchResults) {
    heroSearchInput.addEventListener("input", () => {
      const q = heroSearchInput.value.toLowerCase().trim();
      if (q === "") {
        heroSearchResults.classList.remove("show");
        return;
      }

      const matches = searchIndex.filter(item => item.title.toLowerCase().includes(q) || item.type.toLowerCase().includes(q));
      heroSearchResults.innerHTML = "";

      if (matches.length === 0) {
        heroSearchResults.innerHTML = `<div style="padding: 12px; color: var(--text-muted); font-size: 0.88rem;">No results found.</div>`;
      } else {
        matches.slice(0, 5).forEach(m => {
          const div = document.createElement("div");
          div.className = "suggestion-item";
          div.innerHTML = `
            <span class="suggestion-item-title">${m.title}</span>
            <span class="suggestion-item-type">${m.type}</span>
          `;
          div.addEventListener("click", () => {
            heroSearchResults.classList.remove("show");
            heroSearchInput.value = "";
            const targetEl = document.querySelector(m.target);
            if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
          });
          heroSearchResults.appendChild(div);
        });
      }

      heroSearchResults.classList.add("show");
    });

    document.addEventListener("click", (e) => {
      if (!heroSearchInput.contains(e.target) && !heroSearchResults.contains(e.target)) {
        heroSearchResults.classList.remove("show");
      }
    });
  }
}

/**
 * Toast Notification Utility
 */
function showToast(message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/**
 * Mouse Move Subtle Ambient Glow Orb Follow
 */
function initScrollAnimations() {
  const orb1 = document.querySelector(".orb-1");
  const orb2 = document.querySelector(".orb-2");

  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    if (orb1) orb1.style.transform = `translate(${x}px, ${y}px)`;
    if (orb2) orb2.style.transform = `translate(${-x}px, ${-y}px)`;
  }, { passive: true });
}
