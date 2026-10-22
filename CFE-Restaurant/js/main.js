/**
 * CFE RESTAURANT - MAIN GLOBAL JAVASCRIPT
 * Handles: Navigation, Mobile Menu, Cart Storage & Badge Sync,
 * User Session Indicator, Global Toast Notifications, and Back-to-top.
 */

// Storage Keys
const CART_STORAGE_KEY = 'cfe_restaurant_cart';
const USER_STORAGE_KEY = 'cfe_restaurant_current_user';
const PROFILE_DATA_KEY = 'cfe_restaurant_profile';

// Currency Formatter for Indian Rupees (₹)
function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/* ==========================================================================
   1. SHOPPING CART ENGINE (LOCALSTORAGE)
   ========================================================================== */
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading cart from localStorage:', e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
  } catch (e) {
    console.error('Error saving cart to localStorage:', e);
  }
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.classList.remove('bump');
    // Trigger reflow for bump animation
    void badge.offsetWidth;
    if (count > 0) {
      badge.classList.add('bump');
    }
  });
}

function addToCart(item, quantity = 1) {
  const cart = getCart();
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + quantity;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      isVeg: item.isVeg,
      quantity: quantity
    });
  }
  saveCart(cart);
  showToast('Added to Cart', `${item.name} (${quantity}) added to your gourmet order.`, 'success');
}

/* ==========================================================================
   2. USER SESSION & AUTH HELPERS
   ========================================================================== */
function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setCurrentUser(user) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  syncNavUser();
}

function logoutUser() {
  localStorage.removeItem(USER_STORAGE_KEY);
  showToast('Logged Out', 'You have been safely logged out of your session.', 'info');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 900);
}

function syncNavUser() {
  const user = getCurrentUser();
  const navActions = document.querySelector('.nav-actions');
  const mobileNavLinks = document.querySelector('.mobile-nav-links');

  if (!navActions) return;

  // Find existing login / profile elements
  const existingAuthBtn = navActions.querySelector('.auth-nav-item');
  if (existingAuthBtn) existingAuthBtn.remove();

  const authWrapper = document.createElement('div');
  authWrapper.className = 'auth-nav-item';

  if (user) {
    // Logged in: show Profile link with Avatar & Interactive Dropdown
    authWrapper.innerHTML = `
      <div class="nav-user-wrapper" id="navUserWrapper">
        <div class="nav-user-badge" id="navUserBadge" title="User Menu">
          <img src="${user.avatar || 'assets/images/coffeee.jpeg'}" alt="${user.name}" class="nav-user-avatar" id="navAvatarImg">
          <span>${user.name.split(' ')[0]}</span>
          <span style="font-size:0.62rem; color:var(--color-accent-dark); margin-left:2px;">▼</span>
        </div>
        <div class="nav-user-dropdown" id="navUserDropdown">
          <div class="nav-dropdown-header">
            <div class="nav-dropdown-name">${user.name}</div>
            <div class="nav-dropdown-status">✦ Epicurean Member</div>
          </div>
          <a href="profile.html" class="nav-dropdown-link">
            <span>👤</span> My Profile &amp; Settings
          </a>
          <a href="reservation.html" class="nav-dropdown-link">
            <span>🍷</span> Table Reservations
          </a>
          <a href="profile.html" class="nav-dropdown-link">
            <span>🛍️</span> Past Demo Orders
          </a>
          <div class="nav-dropdown-divider"></div>
          <button class="nav-dropdown-link" id="navLogoutBtn" style="width:100%; text-align:left; color:var(--color-danger); cursor:pointer;">
            <span>🚪</span> Sign Out
          </button>
        </div>
      </div>
    `;

    authWrapper.querySelector('#navLogoutBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      logoutUser();
    });

    // Toggle dropdown on mobile/touch click
    const badge = authWrapper.querySelector('#navUserBadge');
    const wrapper = authWrapper.querySelector('#navUserWrapper');
    badge?.addEventListener('click', (e) => {
      e.stopPropagation();
      wrapper?.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      wrapper?.classList.remove('active');
    });
  } else {
    // Logged out: show Login button
    authWrapper.innerHTML = `
      <a href="login.html" class="btn btn-outline btn-sm">Login</a>
    `;
  }

  // Insert before cart trigger
  const cartTrigger = navActions.querySelector('.cart-trigger');
  if (cartTrigger) {
    navActions.insertBefore(authWrapper, cartTrigger);
  } else {
    navActions.appendChild(authWrapper);
  }

  // Also sync mobile nav auth link
  if (mobileNavLinks) {
    let mobileAuthLink = document.getElementById('mobileAuthLink');
    if (!mobileAuthLink) {
      mobileAuthLink = document.createElement('a');
      mobileAuthLink.id = 'mobileAuthLink';
      mobileNavLinks.appendChild(mobileAuthLink);
    }
    if (user) {
      mobileAuthLink.href = 'profile.html';
      mobileAuthLink.className = 'mobile-nav-link';
      mobileAuthLink.textContent = `Profile (${user.name.split(' ')[0]})`;
    } else {
      mobileAuthLink.href = 'login.html';
      mobileAuthLink.className = 'mobile-nav-link';
      mobileAuthLink.textContent = 'Login / Register';
    }
  }

  // Render or remove VIP Member Ambient Banner on Home Page
  renderMemberBanner(user);
}

function renderMemberBanner(user) {
  // Check if we are on index.html
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPath !== 'index.html' && currentPath !== '') return;

  const existingBanner = document.getElementById('memberVipBanner');
  if (existingBanner) existingBanner.remove();

  if (!user) return;

  const banner = document.createElement('div');
  banner.id = 'memberVipBanner';
  banner.className = 'member-vip-banner';
  banner.innerHTML = `
    <div class="container member-vip-banner-inner">
      <div class="member-vip-greeting">
        <span class="member-vip-badge">✦ Epicurean Member</span>
        <span>Welcome back, <strong>${user.name}</strong>! Your dining room privileges &amp; tasting previews are active.</span>
      </div>
      <div class="member-vip-actions">
        <a href="menu.html" class="btn btn-gold btn-sm">Order from Menu</a>
        <a href="reservation.html" class="btn btn-outline-white btn-sm">Book VIP Table</a>
        <a href="profile.html" class="btn btn-outline-white btn-sm">Member Profile</a>
        <button class="btn btn-sm" id="bannerLogoutBtn" style="color:var(--color-accent-light); font-size:0.8rem; padding:4px 8px; cursor:pointer;">Sign Out</button>
      </div>
    </div>
  `;

  // Insert banner right below header
  const header = document.querySelector('.site-header');
  if (header && header.nextSibling) {
    header.parentNode.insertBefore(banner, header.nextSibling);
  } else {
    document.body.prepend(banner);
  }

  banner.querySelector('#bannerLogoutBtn')?.addEventListener('click', () => {
    logoutUser();
  });
}

/* ==========================================================================
   3. GLOBAL TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(title, message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconMap = {
    success: '✓',
    danger: '✕',
    info: '✦'
  };

  toast.innerHTML = `
    <span class="toast-icon text-gold" style="font-size:1.15rem; font-weight:bold;">${iconMap[type] || '✦'}</span>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  // Auto remove after 3.8s
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

/* ==========================================================================
   4. NAVIGATION & SCROLL BEHAVIOR
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Update cart badge right away
  updateCartBadge();
  syncNavUser();

  // Sticky Header Transition
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navDrawer = document.querySelector('.mobile-nav-drawer');
  const navOverlay = document.querySelector('.mobile-nav-overlay');

  function toggleMobileMenu() {
    menuBtn?.classList.toggle('open');
    navDrawer?.classList.toggle('open');
    navOverlay?.classList.toggle('open');
    document.body.style.overflow = navDrawer?.classList.contains('open') ? 'hidden' : '';
  }

  menuBtn?.addEventListener('click', toggleMobileMenu);
  navOverlay?.addEventListener('click', toggleMobileMenu);

  // Close mobile drawer on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer?.classList.contains('open')) {
      toggleMobileMenu();
    }
  });

  // Highlight Current Page Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
