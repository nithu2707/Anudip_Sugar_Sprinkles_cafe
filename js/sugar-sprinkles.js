/**
 * SUGAR SPRINKLES CAFE - MAIN JAVASCRIPT
 * Handles: Glassmorphic Auth Modal, Menu Filtering & Search,
 * Cart Drawer Engine, Sticky Header, and Toast Notifications.
 */

// Food items dataset using local café assets
const SUGAR_MENU = [
  {
    id: 'sugar-1',
    name: 'Artisan Hazelnut Coffee',
    category: 'Specialty Coffee',
    price: 90,
    isVeg: true,
    rating: 4.9,
    tag: 'Signature Roasts',
    image: 'coffeee.jpeg',
    calories: '160 kcal',
    notes: 'Toasted hazelnut, warm cinnamon, dark cocoa finish',
    ingredients: 'Single-estate Arabica, steamed whole milk, roasted hazelnut syrup, cinnamon dusting',
    description: 'Freshly roasted single-estate Arabica infused with velvety hazelnut cream and cinnamon dusting.'
  },
  {
    id: 'sugar-2',
    name: 'Royal Red Velvet Pastry',
    category: 'Cakes & Pastries',
    price: 300,
    isVeg: true,
    rating: 5.0,
    tag: 'Pastel Favorite',
    image: 'red.jpg',
    calories: '340 kcal',
    notes: 'Madagascar vanilla, rich cocoa crumb, tangy sweet cream',
    ingredients: 'Dutch cocoa, farm butter, vanilla bean cream cheese, organic strawberry sprinkles',
    description: 'Delicate cocoa sponge layers kissed with vanilla bean cream cheese frosting and sweet strawberry sprinkles.'
  },
  {
    id: 'sugar-3',
    name: 'Wood-Fired Garden Pizza',
    category: 'Savory Bites',
    price: 250,
    isVeg: true,
    rating: 4.8,
    tag: 'Wood-Fired',
    image: 'pizza.png',
    calories: '420 kcal',
    notes: 'Charred sourdough aroma, sweet San Marzano tomato, fresh herb oil',
    ingredients: '36-hr fermented sourdough, San Marzano pomodoro, fresh buffalo mozzarella, sweet basil',
    description: 'Slow-fermented sourdough crust topped with San Marzano tomatoes, fresh buffalo mozzarella, and fresh basil.'
  },
  {
    id: 'sugar-4',
    name: 'Artisan Grilled Veg Sandwich',
    category: 'Savory Bites',
    price: 180,
    isVeg: true,
    rating: 4.7,
    tag: 'Café Classic',
    image: 'sandwitch.png',
    calories: '310 kcal',
    notes: 'Herbaceous walnut pesto, creamy bocconcini, toasted sesame crust',
    ingredients: 'Artisanal sourdough bread, roasted bell peppers, walnut basil pesto, bocconcini cheese',
    description: 'Toasted whole wheat sourdough layered with walnut pesto, crunchy bell peppers, and bocconcini cheese.'
  },
  {
    id: 'sugar-5',
    name: 'Belgian Dark Chocolate Cake',
    category: 'Cakes & Pastries',
    price: 500,
    isVeg: true,
    rating: 5.0,
    tag: 'Bestseller',
    image: 'cake.jpeg',
    calories: '450 kcal',
    notes: '70% dark Belgian cocoa, golden honey blossom, silky ganache',
    ingredients: 'Callebaut Belgian dark chocolate, cultured French butter, golden honey glaze, cocoa shavings',
    description: 'Decadent 70% dark Belgian chocolate truffle gateau with golden honey glaze and chocolate curls.'
  },
  {
    id: 'sugar-6',
    name: 'Crispy Jalapeño Cheese Balls',
    category: 'Savory Bites',
    price: 150,
    isVeg: true,
    rating: 4.8,
    tag: 'Chef Special',
    image: 'chessballs.jpg',
    calories: '280 kcal',
    notes: 'Smoky jalapeño zest, molten cheddar, garlic herb crunch',
    ingredients: 'Aged English cheddar, Monterey Jack, pickled jalapeño bits, panko crumb, garlic dip',
    description: 'Golden crumb poppers bursting with molten Monterey Jack and cheddar, served with garlic pink dip.'
  },
  {
    id: 'sugar-7',
    name: 'Cold-Pressed Valencia Juice',
    category: 'Cold Drinks',
    price: 120,
    isVeg: true,
    rating: 4.8,
    tag: 'Fresh Squeezed',
    image: 'juice.jpg',
    calories: '110 kcal',
    notes: 'Zesty citrus burst, fresh garden spearmint, mineral pink salt finish',
    ingredients: '100% slow-pressed Valencia oranges, crushed garden mint, Himalayan pink salt',
    description: '100% natural cold-pressed Valencia oranges infused with hand-crushed mint leaves and pink salt.'
  },
  {
    id: 'sugar-8',
    name: 'Caramel Macchiato Sprinkles',
    category: 'Specialty Coffee',
    price: 140,
    isVeg: true,
    rating: 4.9,
    tag: 'Sweet Sip',
    image: 'coffeee.jpeg',
    calories: '210 kcal',
    notes: 'Rich butterscotch, double espresso intensity, sweet gold sprinkles',
    ingredients: 'Double shot Arabica espresso, steamed frothed milk, salted butterscotch sauce, golden sugar crystals',
    description: 'Steamed whole milk poured over rich espresso shots, finished with butterscotch drizzle and golden sprinkles.'
  }
];

const CART_KEY = 'sugar_sprinkles_cart';
const USER_KEY = 'sugar_sprinkles_user';

/* --------------------------------------------------------------------------
   1. CART ENGINE
   -------------------------------------------------------------------------- */
function getSugarCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveSugarCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}

function addSugarCart(item) {
  const cart = getSugarCart();
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveSugarCart(cart);
  showSugarToast('Added with Love ☕', `${item.name} added to your sweet bag.`);
}

function updateCartUI() {
  const cart = getSugarCart();
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const badge = document.getElementById('cartBadgeCount');
  if (badge) badge.textContent = count;

  const body = document.getElementById('cartDrawerItems');
  const totalEl = document.getElementById('cartDrawerTotal');
  if (!body) return;

  if (cart.length === 0) {
    body.innerHTML = `
      <div style="text-align:center; padding:40px 10px; color:var(--c-text-muted);">
        <div style="font-size:2.8rem; margin-bottom:12px;">🧁</div>
        <p style="font-weight:700;">Your sweet cart is empty</p>
        <p style="font-size:0.85rem;">Explore our specialty coffee and treats!</p>
      </div>
    `;
    if (totalEl) totalEl.textContent = '₹0';
    return;
  }

  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  if (totalEl) totalEl.textContent = `₹${subtotal}`;

  body.innerHTML = cart.map(i => `
    <div class="cart-item-row">
      <img src="${i.image}" alt="${i.name}" class="cart-item-img">
      <div style="flex:1;">
        <strong style="display:block; font-size:0.92rem; color:var(--c-brown-dark);">${i.name}</strong>
        <span style="font-size:0.8rem; color:var(--c-pink-deep); font-weight:700;">₹${i.price} each</span>
      </div>
      <div style="display:flex; align-items:center; gap:6px;">
        <button class="cart-step-btn" onclick="changeSugarQty('${i.id}', -1)" style="width:26px; height:26px; border-radius:50%; background:var(--c-cream-bg); border:1px solid var(--c-border); font-weight:700;">-</button>
        <span style="font-weight:700; min-width:20px; text-align:center;">${i.qty}</span>
        <button class="cart-step-btn" onclick="changeSugarQty('${i.id}', 1)" style="width:26px; height:26px; border-radius:50%; background:var(--c-cream-bg); border:1px solid var(--c-border); font-weight:700;">+</button>
      </div>
    </div>
  `).join('');
}

window.changeSugarQty = function(id, delta) {
  let cart = getSugarCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  saveSugarCart(cart);
};

/* --------------------------------------------------------------------------
   2. AUTH & USER SESSION
   -------------------------------------------------------------------------- */
function getSugarUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setSugarUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  syncUserNav();
}

function syncUserNav() {
  const user = getSugarUser();
  const btn = document.getElementById('openAuthModalBtn');
  if (!btn) return;

  if (user) {
    btn.innerHTML = `<span>👤</span> ${user.name.split(' ')[0]}`;
    btn.classList.add('logged-in');
    btn.onclick = () => {
      if (confirm(`Logged in as ${user.name}. Would you like to sign out?`)) {
        localStorage.removeItem(USER_KEY);
        syncUserNav();
        showSugarToast('Signed Out', 'See you again soon at Sugar Sprinkles Cafe!');
      }
    };
  } else {
    btn.innerHTML = `<span>✨</span> Sign In`;
    btn.classList.remove('logged-in');
    btn.onclick = openGlassModal;
  }
}

/* --------------------------------------------------------------------------
   3. GLASSMORPHISM MODAL CONTROLLER
   -------------------------------------------------------------------------- */
function openGlassModal() {
  const modal = document.getElementById('glassAuthModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeGlassModal() {
  const modal = document.getElementById('glassAuthModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function setupGlassModal() {
  const modal = document.getElementById('glassAuthModal');
  const closeBtn = document.getElementById('closeGlassModalBtn');
  const tabLogin = document.getElementById('glassTabLogin');
  const tabRegister = document.getElementById('glassTabRegister');
  const formLogin = document.getElementById('glassLoginForm');
  const formRegister = document.getElementById('glassRegisterForm');
  const title = document.getElementById('glassModalTitle');
  const subtitle = document.getElementById('glassModalSub');

  closeBtn?.addEventListener('click', closeGlassModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeGlassModal();
  });

  // Tab Switch
  tabLogin?.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabRegister?.classList.remove('active');
    if (formLogin) formLogin.style.display = 'block';
    if (formRegister) formRegister.style.display = 'none';
    if (title) title.textContent = 'Welcome to Sugar Sprinkles';
    if (subtitle) subtitle.textContent = 'Sign in for sweet treats and cafe privileges.';
  });

  tabRegister?.addEventListener('click', () => {
    tabRegister.classList.add('active');
    tabLogin?.classList.remove('active');
    if (formLogin) formLogin.style.display = 'none';
    if (formRegister) formRegister.style.display = 'block';
    if (title) title.textContent = 'Join Our Sweet Family';
    if (subtitle) subtitle.textContent = 'Create your account to unlock sprinkles loyalty perks.';
  });

  // Password toggle
  document.querySelectorAll('.glass-pwd-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
      }
    });
  });

  // 1-Click Demo
  document.getElementById('glassQuickDemoBtn')?.addEventListener('click', () => {
    const demoUser = {
      name: 'Ananya Sharma',
      email: 'ananya@sugarsprinkles.com',
      memberTier: 'Sweet Sprinkles VIP'
    };
    setSugarUser(demoUser);
    closeGlassModal();
    showSugarToast('Welcome Back! ✨', `Signed in as ${demoUser.name}.`);
  });

  // Login Submit
  formLogin?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('glassLoginEmail')?.value.trim();
    const user = {
      name: email.split('@')[0].toUpperCase(),
      email: email,
      memberTier: 'Cafe Club Member'
    };
    setSugarUser(user);
    closeGlassModal();
    showSugarToast('Sweet Welcome! ☕', `Signed in as ${user.name}.`);
  });

  // Register Submit
  formRegister?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('glassRegName')?.value.trim();
    const email = document.getElementById('glassRegEmail')?.value.trim();
    const user = {
      name: name,
      email: email,
      memberTier: 'VIP Member'
    };
    setSugarUser(user);
    closeGlassModal();
    showSugarToast('Account Created! 🧁', `Welcome to the cafe, ${name}!`);
  });

  // Password Strength
  document.getElementById('glassRegPassword')?.addEventListener('input', (e) => {
    const val = e.target.value;
    const bar = document.getElementById('glassStrengthBar');
    const text = document.getElementById('glassStrengthText');
    if (!bar || !text) return;

    if (val.length === 0) {
      bar.style.width = '0%';
      text.textContent = '';
    } else if (val.length < 6) {
      bar.style.width = '35%';
      bar.style.backgroundColor = 'var(--c-error)';
      text.textContent = 'Weak password';
      text.style.color = 'var(--c-error)';
    } else if (/[0-9]/.test(val) && /[A-Z]/.test(val)) {
      bar.style.width = '100%';
      bar.style.backgroundColor = 'var(--c-success)';
      text.textContent = 'Strong password ✨';
      text.style.color = 'var(--c-success)';
    } else {
      bar.style.width = '70%';
      bar.style.backgroundColor = 'var(--c-gold)';
      text.textContent = 'Moderate password';
      text.style.color = 'var(--c-gold)';
    }
  });
}

/* --------------------------------------------------------------------------
   4. MENU CONTROLLER (HOVER LIFT, FILTER & SEARCH)
   -------------------------------------------------------------------------- */
class SugarMenuController {
  constructor() {
    this.container = document.getElementById('sugarMenuGrid');
    this.searchInput = document.getElementById('sugarMenuSearch');
    this.filterBtns = document.querySelectorAll('.category-btn');
    this.currentCat = 'All';
    this.searchQuery = '';
    this.init();
  }

  init() {
    if (!this.container) return;

    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCat = btn.dataset.category;
        this.render();
      });
    });

    this.searchInput?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.render();
    });

    this.render();
  }

  getFiltered() {
    return SUGAR_MENU.filter(item => {
      const matchCat = (this.currentCat === 'All') || (item.category === this.currentCat);
      const matchSearch = !this.searchQuery ||
        item.name.toLowerCase().includes(this.searchQuery) ||
        item.description.toLowerCase().includes(this.searchQuery);
      return matchCat && matchSearch;
    });
  }

  render() {
    const list = this.getFiltered();
    if (list.length === 0) {
      this.container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding:50px 20px; background:#fff; border-radius:20px; border:1px dashed var(--c-border);">
          <div style="font-size:3rem; margin-bottom:10px;">🍰</div>
          <h3 style="margin-bottom:8px;">No Sweet Treats Found</h3>
          <p style="color:var(--c-text-muted); font-size:0.9rem;">Try searching for another flavor or select 'All Delights'.</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = list.map(item => `
      <article class="menu-card-wrap anim-reveal" data-id="${item.id}">
        <div class="menu-card-inner">
          <!-- FRONT CARD: Photo, Zoom on Hover, Quick Info -->
          <div class="menu-card-front">
            <div class="menu-card-img-box">
              <span class="diet-mark ${item.isVeg ? 'veg' : 'non-veg'}" title="${item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
              ${item.tag ? `<span class="menu-card-tag">${item.tag}</span>` : ''}
              <img src="${item.image}" alt="${item.name}" class="menu-card-img" onerror="this.src='coffeee.jpeg'">
            </div>
            <div class="menu-card-content">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span class="menu-card-cat">${item.category}</span>
                <button type="button" class="flip-badge-btn flip-toggle-btn" title="Flip to see ingredients and tasting notes">
                  ↺ Flip Info
                </button>
              </div>
              <h3 class="menu-card-title">${item.name}</h3>
              <p class="menu-card-desc">${item.description}</p>
              <div class="menu-card-bottom">
                <span class="menu-card-price">₹${item.price}</span>
                <button class="btn btn-pink btn-sm add-sugar-cart-btn" data-id="${item.id}">
                  <span>+</span> Add to Bag
                </button>
              </div>
            </div>
          </div>

          <!-- BACK CARD: Tasting Notes, Artisan Ingredients & Calories -->
          <div class="menu-card-back">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                <span class="eyebrow-tag" style="padding:4px 12px; font-size:0.75rem; margin:0;">${item.calories}</span>
                <button type="button" class="flip-badge-btn flip-toggle-btn" title="Flip back to photo view">
                  ↻ Photo View
                </button>
              </div>
              <h3 style="font-size:1.22rem; color:var(--c-brown-dark); margin-bottom:12px;">${item.name}</h3>
              
              <div style="margin-bottom:16px;">
                <div style="font-size:0.74rem; font-weight:800; text-transform:uppercase; letter-spacing:0.08em; color:var(--c-pink-deep); margin-bottom:4px;">✨ Tasting Notes</div>
                <p style="font-size:0.84rem; color:var(--c-text-muted); line-height:1.55;">${item.notes}</p>
              </div>

              <div style="margin-bottom:16px;">
                <div style="font-size:0.74rem; font-weight:800; text-transform:uppercase; letter-spacing:0.08em; color:var(--c-gold-dark); margin-bottom:4px;">🌿 Key Ingredients</div>
                <p style="font-size:0.82rem; color:var(--c-text-muted); line-height:1.5;">${item.ingredients}</p>
              </div>
            </div>

            <div class="menu-card-bottom">
              <span class="menu-card-price">₹${item.price}</span>
              <button class="btn btn-pink btn-sm add-sugar-cart-btn" data-id="${item.id}">
                <span>+</span> Add to Bag
              </button>
            </div>
          </div>
        </div>
      </article>
    `).join('');

    // Attach Add-to-bag clicks
    this.container.querySelectorAll('.add-sugar-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        const dish = SUGAR_MENU.find(d => d.id === id);
        if (dish) addSugarCart(dish);
      });
    });

    // Attach 3D Flip clicks
    this.container.querySelectorAll('.flip-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cardWrap = e.currentTarget.closest('.menu-card-wrap');
        cardWrap?.classList.toggle('flipped');
      });
    });

    setupScrollAnimations();
  }
}

/* --------------------------------------------------------------------------
   5. TOAST NOTIFICATIONS
   -------------------------------------------------------------------------- */
function showSugarToast(title, msg) {
  let container = document.getElementById('sugarToastBox');
  if (!container) {
    container = document.createElement('div');
    container.id = 'sugarToastBox';
    container.style.cssText = 'position:fixed; bottom:24px; right:24px; z-index:3000; display:flex; flex-direction:column; gap:10px; pointer-events:none;';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.style.cssText = 'background:#ffffff; border-radius:14px; padding:14px 20px; box-shadow:0 10px 30px rgba(58,34,23,0.18); border-left:4px solid var(--c-pink); min-width:280px; max-width:380px; pointer-events:auto; animation:slideToast 0.3s ease;';
  toast.innerHTML = `
    <div style="font-weight:700; color:var(--c-brown-dark); font-size:0.92rem; margin-bottom:2px;">${title}</div>
    <div style="font-size:0.82rem; color:var(--c-text-muted);">${msg}</div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* --------------------------------------------------------------------------
   6. SCROLL ANIMATION OBSERVER
   -------------------------------------------------------------------------- */
function setupScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.anim-reveal, .anim-slide-left, .anim-slide-right').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.anim-reveal:not(.revealed), .anim-slide-left:not(.revealed), .anim-slide-right:not(.revealed)').forEach(el => {
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   7. DOM INITIALIZATION
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  setupGlassModal();
  syncUserNav();
  updateCartUI();
  setupScrollAnimations();

  new SugarMenuController();

  // Sticky header transition
  const header = document.querySelector('.site-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Cart Drawer open/close
  const cartTrigger = document.getElementById('openCartDrawerBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartDrawerOverlay');
  const closeCartBtn = document.getElementById('closeCartDrawerBtn');

  function toggleCartDrawer() {
    cartDrawer?.classList.toggle('active');
    cartOverlay?.classList.toggle('active');
  }

  cartTrigger?.addEventListener('click', toggleCartDrawer);
  closeCartBtn?.addEventListener('click', toggleCartDrawer);
  cartOverlay?.addEventListener('click', toggleCartDrawer);

  // Clear Cart
  document.getElementById('clearSugarCartBtn')?.addEventListener('click', () => {
    if (confirm('Clear all treats from your bag?')) {
      saveSugarCart([]);
    }
  });

  // Demo Checkout in Drawer
  document.getElementById('sugarCheckoutBtn')?.addEventListener('click', () => {
    const cart = getSugarCart();
    if (cart.length === 0) return;
    const ref = 'SSC-' + Math.floor(1000 + Math.random() * 9000);
    saveSugarCart([]);
    toggleCartDrawer();
    showSugarToast('Order Placed! ☕', `Order #${ref} placed successfully. Fresh treats are on their way!`);
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.querySelector('.nav-menu');
  menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navMenu?.classList.toggle('open');
  });

  // Close mobile nav when clicking a link
  navMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle?.classList.remove('open');
      navMenu?.classList.remove('open');
    });
  });
});
