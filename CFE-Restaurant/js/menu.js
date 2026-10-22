/**
 * CFE RESTAURANT - MENU DATA & LOGIC
 * Covers all 8 requested categories:
 * 1. Starters
 * 2. South Indian
 * 3. North Indian
 * 4. Biryani
 * 5. Chinese
 * 6. Pizza and Burgers
 * 7. Desserts
 * 8. Beverages
 */

const MENU_ITEMS = [
  // 1. STARTERS
  {
    id: 'starter-1',
    name: 'Truffle Parmesan Herb Fries',
    category: 'Starters',
    price: 280,
    isVeg: true,
    rating: 4.9,
    tag: 'Bestseller',
    description: 'Crispy hand-cut golden potatoes tossed in black truffle oil, aged Parmesan flakes, and garden rosemary.',
    ingredients: ['Yukon Gold Potatoes', 'Truffle Glaze', 'Parmigiano-Reggiano', 'Rosemary Aioli'],
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'starter-2',
    name: 'Artisan Cheesy Jalapeño Balls',
    category: 'Starters',
    price: 320,
    isVeg: true,
    rating: 4.8,
    tag: 'Chef Special',
    description: 'Golden crumb croquettes bursting with molten Monterey Jack, cheddar, and fire-roasted jalapeños.',
    ingredients: ['Cheddar Cheese', 'Monterey Jack', 'Jalapeño', 'Panko Crumb', 'Garlic Dip'],
    image: 'assets/images/chessballs.jpg'
  },
  {
    id: 'starter-3',
    name: 'Amritsari Crispy Fish Tikka',
    category: 'Starters',
    price: 460,
    isVeg: false,
    rating: 4.9,
    tag: 'Popular',
    description: 'Fresh river sole fish marinated with crushed carom seeds, Kashmiri chili, and cooked to a crisp golden crust.',
    ingredients: ['River Sole', 'Ajwain', 'Gram Flour', 'Mint Chutney', 'Chaat Masala'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'starter-4',
    name: 'Tandoori Malai Soya Chaap',
    category: 'Starters',
    price: 340,
    isVeg: true,
    rating: 4.7,
    tag: 'Vegetarian',
    description: 'Succulent soya chops soaked in cashew cream, green cardamom, and grilled over red-hot charcoal embers.',
    ingredients: ['Organic Soya Chaap', 'Cashew Cream', 'Cardamom', 'Melted Butter'],
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80'
  },

  // 2. SOUTH INDIAN
  {
    id: 'south-1',
    name: 'Mysore Ghee Roast Masala Dosa',
    category: 'South Indian',
    price: 240,
    isVeg: true,
    rating: 5.0,
    tag: 'Signature',
    description: 'Crispy fermented crepe smeared with signature spicy red garlic chutney, filled with potato bhaji, cooked in pure desi ghee.',
    ingredients: ['Aged Batter', 'Desi Ghee', 'Red Garlic Chutney', 'Spiced Potato Bhaji', 'Coconut Chutney'],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'south-2',
    name: 'Chettinad Pepper Chicken Fry',
    category: 'South Indian',
    price: 440,
    isVeg: false,
    rating: 4.9,
    tag: 'Spicy',
    description: 'Tender chicken tossed in stone-ground Tellicherry black pepper, roasted spices, and fresh curry leaves.',
    ingredients: ['Country Chicken', 'Tellicherry Black Pepper', 'Curry Leaves', 'Fennel', 'Shallots'],
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'south-3',
    name: 'Steamed Rava Idli with Podi Ghee',
    category: 'South Indian',
    price: 180,
    isVeg: true,
    rating: 4.8,
    tag: 'Classic',
    description: 'Fluffy semolina cakes infused with mustard seeds, cashew nuts, and served with spiced Gunpowder podi and hot sambar.',
    ingredients: ['Semolina', 'Roasted Cashews', 'Gunpowder Podi', 'Pure Ghee', 'Drumstick Sambar'],
    image: 'https://images.unsplash.com/photo-1589301766620-3b4e23fc4867?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'south-4',
    name: 'Malabar Prawn Roast',
    category: 'South Indian',
    price: 520,
    isVeg: false,
    rating: 4.9,
    tag: 'Coastal Feast',
    description: 'Jumbo coastal prawns slow-braised with caramelized shallots, coconut slivers, and tangy kokum gravy.',
    ingredients: ['Tiger Prawns', 'Coconut Slices', 'Kokum', 'Ginger Garlic', 'Curry Leaves'],
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80'
  },

  // 3. NORTH INDIAN
  {
    id: 'north-1',
    name: 'Royal Paneer Lababdar',
    category: 'North Indian',
    price: 420,
    isVeg: true,
    rating: 4.9,
    tag: 'Bestseller',
    description: 'Artisanal malai paneer cubes bathed in a rich tomato, cashew nut, and melon seed reduction, kissed with kasuri methi.',
    ingredients: ['Fresh Paneer', 'Cashew Paste', 'Plum Tomatoes', 'Kasuri Methi', 'Churned Cream'],
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'north-2',
    name: 'Old Delhi Butter Chicken',
    category: 'North Indian',
    price: 480,
    isVeg: false,
    rating: 5.0,
    tag: 'Legendary',
    description: 'Charcoal-smoked chicken tikka pieces simmered gently in a velvety, buttery makhani sauce infused with fenugreek.',
    ingredients: ['Smoked Chicken Tikka', 'Butter Makhani Gravy', 'Fresh Cream', 'Kashmiri Saffron'],
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'north-3',
    name: 'Dal Makhani Bukhara Heritage',
    category: 'North Indian',
    price: 360,
    isVeg: true,
    rating: 4.9,
    tag: 'Slow Cooked',
    description: '24-hour slow-cooked black urad lentils on simmering charcoal embers with fresh tomato puree and white butter.',
    ingredients: ['Black Lentils', 'Kidney Beans', 'White Butter', 'Organic Cream', 'Mild Ginger'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'north-4',
    name: 'Garlic Butter Chur Chur Naan Basket',
    category: 'North Indian',
    price: 190,
    isVeg: true,
    rating: 4.8,
    tag: 'Bread',
    description: 'Layered clay-oven tandoori naan crushed with garlic butter and fresh coriander, flaky and golden.',
    ingredients: ['Refined Flour', 'Butter', 'Roasted Garlic', 'Kaloji Seeds', 'Coriander'],
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80'
  },

  // 4. BIRYANI
  {
    id: 'biryani-1',
    name: 'Dum Pukht Hyderabadi Chicken Biryani',
    category: 'Biryani',
    price: 490,
    isVeg: false,
    rating: 5.0,
    tag: 'Royal Feast',
    description: 'Aged long-grain basmati rice and marinated spring chicken sealed in dough handi with saffron, mint, and fried onions.',
    ingredients: ['Basmati Rice', 'Chicken', 'Kashmiri Saffron', 'Mint', 'Birista Onions', 'Desi Ghee'],
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'biryani-2',
    name: 'Nawabi Royal Veg Dum Biryani',
    category: 'Biryani',
    price: 390,
    isVeg: true,
    rating: 4.8,
    tag: 'Aromatic',
    description: 'Farm-fresh baby carrots, French beans, green peas, and paneer dum-cooked with basmati rice, kewra, and rose water.',
    ingredients: ['Basmati Rice', 'Paneer', 'Farm Vegetables', 'Rose Water', 'Kewra Essence'],
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'biryani-3',
    name: 'Lucknowi Mutton Gosht Biryani',
    category: 'Biryani',
    price: 590,
    isVeg: false,
    rating: 4.9,
    tag: 'Awadhi Treat',
    description: 'Tender baby goat meat cooked with whole aromatics and delicate yakhni broth, layered with perfumed basmati rice.',
    ingredients: ['Tender Goat Meat', 'Yakhni Broth', 'Basmati Rice', 'Mace', 'Cardamom', 'Saffron'],
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80'
  },

  // 5. CHINESE
  {
    id: 'chinese-1',
    name: 'Chilli Garlic Hakka Noodles',
    category: 'Chinese',
    price: 320,
    isVeg: true,
    rating: 4.7,
    tag: 'Wok Tossed',
    description: 'Wok-tossed artisan noodles with charred scallions, crunchy bell peppers, burnt garlic, and light savory soy.',
    ingredients: ['Handmade Noodles', 'Garlic', 'Bell Peppers', 'Dark Soy', 'Toasted Sesame Oil'],
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'chinese-2',
    name: 'Kung Pao Chicken with Roasted Cashews',
    category: 'Chinese',
    price: 440,
    isVeg: false,
    rating: 4.8,
    tag: 'Sichuan Style',
    description: 'Diced chicken flash-fried with dried red chilies, Sichuan peppercorns, roasted cashews, and scallions in a sweet-spicy glaze.',
    ingredients: ['Chicken Breast', 'Sichuan Pepper', 'Cashew Nuts', 'Scallions', 'Ginger Wine Sauce'],
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'chinese-3',
    name: 'Crispy Veg Dim Sums (6 Pcs)',
    category: 'Chinese',
    price: 330,
    isVeg: true,
    rating: 4.8,
    tag: 'Steamed & Crisped',
    description: 'Translucent crystal dumplings stuffed with water chestnuts, shiitake mushrooms, and bok choy with spicy dip.',
    ingredients: ['Shiitake Mushrooms', 'Water Chestnuts', 'Bok Choy', 'Chili Oil Dip'],
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80'
  },

  // 6. PIZZA AND BURGERS
  {
    id: 'pnb-1',
    name: 'Artisan Wood-Fired Margherita Pizza',
    category: 'Pizza and Burgers',
    price: 450,
    isVeg: true,
    rating: 4.9,
    tag: 'Wood-Fired',
    description: '48-hour slow fermented sourdough crust, San Marzano tomato puree, fresh buffalo mozzarella, and sweet basil leaves.',
    ingredients: ['Sourdough Base', 'Buffalo Mozzarella', 'San Marzano Sauce', 'Fresh Basil', 'EVOO'],
    image: 'assets/images/pizza.png'
  },
  {
    id: 'pnb-2',
    name: 'Smoked Truffle Angus Gourmet Burger',
    category: 'Pizza and Burgers',
    price: 480,
    isVeg: false,
    rating: 4.9,
    tag: 'Signature',
    description: 'Juicy artisan burger patty topped with caramelized balsamic onions, aged cheddar, arugula, and truffle mayo on brioche.',
    ingredients: ['Brioche Bun', 'Gourmet Patty', 'Aged Cheddar', 'Balsamic Onions', 'Truffle Mayo'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pnb-3',
    name: 'Grilled Pesto Bocconcini Sourdough Sandwich',
    category: 'Pizza and Burgers',
    price: 360,
    isVeg: true,
    rating: 4.8,
    tag: 'Café Classic',
    description: 'Toasted sourdough loaded with homemade walnut basil pesto, bocconcini cheese, heirloom tomatoes, and olive drizzle.',
    ingredients: ['Sourdough Bread', 'Bocconcini', 'Walnut Pesto', 'Heirloom Tomatoes'],
    image: 'assets/images/sandwitch.png'
  },
  {
    id: 'pnb-4',
    name: 'Quattro Formaggi & Hot Honey Pizza',
    category: 'Pizza and Burgers',
    price: 540,
    isVeg: true,
    rating: 5.0,
    tag: 'Chef Favorite',
    description: 'Blend of Mozzarella, Gorgonzola, Fontina, and shaved Parmigiano-Reggiano, finished with chili wildflower honey.',
    ingredients: ['Four Cheese Blend', 'Chili Wildflower Honey', 'Sourdough Crust', 'Sea Salt'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },

  // 7. DESSERTS
  {
    id: 'dessert-1',
    name: 'Belgian Dark Chocolate Molten Lava Cake',
    category: 'Desserts',
    price: 320,
    isVeg: true,
    rating: 5.0,
    tag: 'Warm & Gooey',
    description: 'Decadent 70% Belgian chocolate soufflé cake with a warm flowing center, served with Madagascar vanilla gelato.',
    ingredients: ['Belgian Chocolate', 'Madagascar Vanilla Bean', 'Pure Butter', 'Berry Coulis'],
    image: 'assets/images/cake.jpeg'
  },
  {
    id: 'dessert-2',
    name: 'Classic Venetian Tiramisu',
    category: 'Desserts',
    price: 340,
    isVeg: true,
    rating: 4.9,
    tag: 'Authentic',
    description: 'Espresso-soaked Italian ladyfingers layered with whipped mascarpone cream and dusted with Dutch cocoa powder.',
    ingredients: ['Savoiardi Biscuits', 'Mascarpone Cream', 'Single-Origin Espresso', 'Dutch Cocoa'],
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dessert-3',
    name: 'Royal Shahi Tukda with Saffron Rabri',
    category: 'Desserts',
    price: 280,
    isVeg: true,
    rating: 4.8,
    tag: 'Heritage Sweet',
    description: 'Crispy ghee-fried brioche soaked in cardamom sugar syrup, crowned with slow-reduced saffron rabri and silver leaf.',
    ingredients: ['Desi Ghee Brioche', 'Saffron Rabri', 'Pistachio Slivers', 'Cardamom', 'Vark'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80'
  },

  // 8. BEVERAGES
  {
    id: 'bev-1',
    name: 'CFE Signature Cold Drip Hazelnut Latte',
    category: 'Beverages',
    price: 240,
    isVeg: true,
    rating: 4.9,
    tag: 'Specialty Coffee',
    description: '16-hour slow steeped Chikmagalur Arabica cold brew shaken with roasted hazelnut cream over handcrafted clear ice.',
    ingredients: ['Chikmagalur Arabica Coffee', 'Hazelnut Puree', 'Full Cream Milk', 'Vanilla Bean'],
    image: 'assets/images/coffeee.jpeg'
  },
  {
    id: 'bev-2',
    name: 'Cold-Pressed Valencia Orange & Mint Elixir',
    category: 'Beverages',
    price: 220,
    isVeg: true,
    rating: 4.8,
    tag: 'Fresh Squeezed',
    description: '100% pure cold-pressed Valencia oranges infused with hand-crushed garden mint and Himalayan pink salt.',
    ingredients: ['Valencia Oranges', 'Fresh Mint', 'Pink Rock Salt', 'Chia Seeds'],
    image: 'assets/images/juice.jpg'
  },
  {
    id: 'bev-3',
    name: 'Kaffir Lime & Passionfruit Sparkling Cooler',
    category: 'Beverages',
    price: 210,
    isVeg: true,
    rating: 4.7,
    tag: 'Refreshing',
    description: 'Muddled fresh kaffir lime leaves, passionfruit nectar, sparkling soda, and mint spritz for the ultimate palate cleanser.',
    ingredients: ['Passionfruit Puree', 'Kaffir Lime', 'Sparkling Soda', 'Fresh Mint'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  }
];

/* ==========================================================================
   MENU CONTROLLER CLASS
   ========================================================================== */
class MenuController {
  constructor() {
    this.items = [...MENU_ITEMS];
    this.currentCategory = 'All';
    this.currentDiet = 'all'; // 'all', 'veg', 'non-veg'
    this.searchQuery = '';
    this.sortOption = 'default';

    this.container = document.getElementById('dishesContainer');
    this.searchInput = document.getElementById('menuSearchInput');
    this.sortSelect = document.getElementById('menuSortSelect');
    this.categoryPills = document.querySelectorAll('.category-pill');
    this.dietButtons = document.querySelectorAll('.diet-toggle-btn');
    this.resultsCountEl = document.getElementById('resultsCount');

    this.init();
  }

  init() {
    if (!this.container) return;

    // Category click listeners
    this.categoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        this.categoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentCategory = pill.dataset.category;
        this.render();
      });
    });

    // Diet filter click listeners
    this.dietButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.dietButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentDiet = btn.dataset.diet;
        this.render();
      });
    });

    // Search input listener
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    // Sort select listener
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', (e) => {
        this.sortOption = e.target.value;
        this.render();
      });
    }

    // Check URL parameter for pre-filtering (e.g. ?category=Biryani)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    if (catParam) {
      const matchPill = Array.from(this.categoryPills).find(p => p.dataset.category.toLowerCase() === catParam.toLowerCase());
      if (matchPill) {
        this.categoryPills.forEach(p => p.classList.remove('active'));
        matchPill.classList.add('active');
        this.currentCategory = matchPill.dataset.category;
      }
    }

    this.render();
  }

  getFilteredItems() {
    let result = this.items.filter(item => {
      // Category match
      const matchCategory = (this.currentCategory === 'All') || (item.category === this.currentCategory);

      // Diet match
      let matchDiet = true;
      if (this.currentDiet === 'veg') matchDiet = item.isVeg === true;
      if (this.currentDiet === 'non-veg') matchDiet = item.isVeg === false;

      // Search match
      const matchSearch = !this.searchQuery || 
        item.name.toLowerCase().includes(this.searchQuery) ||
        item.description.toLowerCase().includes(this.searchQuery) ||
        item.category.toLowerCase().includes(this.searchQuery);

      return matchCategory && matchDiet && matchSearch;
    });

    // Sort
    if (this.sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (this.sortOption === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }

  render() {
    if (!this.container) return;

    const filtered = this.getFilteredItems();

    if (this.resultsCountEl) {
      this.resultsCountEl.textContent = `Showing ${filtered.length} exquisite dishes`;
    }

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">🍽️</div>
          <h3 class="empty-state-title">No Culinary Creations Found</h3>
          <p class="empty-state-desc">We couldn't find any dishes matching your current selection. Try resetting your search or exploring another gourmet category.</p>
          <button class="btn btn-outline" id="resetFiltersBtn">Reset All Filters</button>
        </div>
      `;
      document.getElementById('resetFiltersBtn')?.addEventListener('click', () => {
        this.resetFilters();
      });
      return;
    }

    this.container.innerHTML = filtered.map(dish => `
      <article class="dish-card" data-id="${dish.id}">
        <div class="dish-card-img-wrap">
          <span class="diet-badge ${dish.isVeg ? 'veg' : 'non-veg'}" title="${dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
          ${dish.tag ? `<span class="dish-card-tag">${dish.tag}</span>` : ''}
          <img src="${dish.image}" alt="${dish.name}" class="dish-card-img" loading="lazy" onerror="this.src='assets/images/pizza.png'">
        </div>
        <div class="dish-card-body">
          <span class="dish-category-label">${dish.category}</span>
          <h3 class="dish-title">${dish.name}</h3>
          <p class="dish-desc">${dish.description}</p>
          <div class="dish-meta">
            <span class="dish-price">${formatINR(dish.price)}</span>
            <span class="dish-rating">★ ${dish.rating}</span>
          </div>
          <div class="dish-card-actions">
            <button class="btn btn-primary add-to-cart-btn" data-id="${dish.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Add to Cart
            </button>
            <button class="btn btn-outline btn-icon quick-view-btn" data-id="${dish.id}" title="Quick View">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Attach event listeners to Add to Cart buttons
    this.container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dishId = e.currentTarget.dataset.id;
        const item = MENU_ITEMS.find(d => d.id === dishId);
        if (item) {
          addToCart(item, 1);
        }
      });
    });

    // Attach Quick View modal triggers
    this.container.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dishId = e.currentTarget.dataset.id;
        const item = MENU_ITEMS.find(d => d.id === dishId);
        if (item) {
          this.openQuickView(item);
        }
      });
    });
  }

  resetFilters() {
    this.currentCategory = 'All';
    this.currentDiet = 'all';
    this.searchQuery = '';
    this.sortOption = 'default';

    if (this.searchInput) this.searchInput.value = '';
    if (this.sortSelect) this.sortSelect.value = 'default';

    this.categoryPills.forEach(p => {
      p.classList.toggle('active', p.dataset.category === 'All');
    });

    this.dietButtons.forEach(b => {
      b.classList.toggle('active', b.dataset.diet === 'all');
    });

    this.render();
  }

  openQuickView(item) {
    let modalOverlay = document.getElementById('dishModalOverlay');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'dishModalOverlay';
      modalOverlay.className = 'modal-overlay';
      document.body.appendChild(modalOverlay);
    }

    modalOverlay.innerHTML = `
      <div class="modal-content">
        <button class="modal-close-btn" id="closeDishModal">&times;</button>
        <div style="border-radius:var(--radius-md); overflow:hidden; margin-bottom:20px; height:240px;">
          <img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='assets/images/pizza.png'">
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span class="dish-category-label">${item.category}</span>
          <span class="diet-badge ${item.isVeg ? 'veg' : 'non-veg'}" title="${item.isVeg ? 'Veg' : 'Non-Veg'}"></span>
        </div>
        <h2 style="font-size:1.6rem; margin-bottom:10px;">${item.name}</h2>
        <p style="color:var(--color-text-muted); font-size:0.92rem; margin-bottom:18px;">${item.description}</p>
        
        <div style="background:var(--color-bg); padding:14px; border-radius:var(--radius-md); margin-bottom:20px;">
          <h4 style="font-size:0.9rem; margin-bottom:8px; color:var(--color-primary-dark);">Key Ingredients</h4>
          <p style="font-size:0.85rem; color:var(--color-text-muted);">${item.ingredients ? item.ingredients.join(', ') : 'Fresh seasonal farm ingredients, authentic heritage spices.'}</p>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <span style="font-family:var(--font-heading); font-size:1.6rem; font-weight:800; color:var(--color-primary);">${formatINR(item.price)}</span>
          <span style="color:#c97f14; font-weight:700;">★ ${item.rating} Rating</span>
        </div>

        <div style="display:flex; gap:12px;">
          <button class="btn btn-primary" id="modalAddCartBtn" style="flex:1;">
            Add to Cart
          </button>
          <a href="cart.html" class="btn btn-gold">Go to Cart</a>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');

    document.getElementById('closeDishModal')?.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });

    document.getElementById('modalAddCartBtn')?.addEventListener('click', () => {
      addToCart(item, 1);
      modalOverlay.classList.remove('active');
    });
  }
}

// Initialize on Menu Page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('dishesContainer')) {
    window.menuApp = new MenuController();
  }
});
