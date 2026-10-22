/**
 * CFE RESTAURANT - SHOPPING CART LOGIC
 * Calculates subtotals, GST, delivery/packaging, promo discounts,
 * handles quantity steppers, item removal, cart clearing, and demo checkout receipt.
 */

class CartController {
  constructor() {
    this.tableBody = document.getElementById('cartTableBody');
    this.cartEmptyState = document.getElementById('cartEmptyState');
    this.cartLayout = document.getElementById('cartLayout');
    this.subtotalEl = document.getElementById('cartSubtotal');
    this.taxEl = document.getElementById('cartTax');
    this.deliveryEl = document.getElementById('cartDelivery');
    this.discountRow = document.getElementById('cartDiscountRow');
    this.discountEl = document.getElementById('cartDiscount');
    this.grandTotalEl = document.getElementById('cartGrandTotal');
    this.itemCountBadge = document.getElementById('cartTotalCountText');

    this.promoInput = document.getElementById('promoCodeInput');
    this.applyPromoBtn = document.getElementById('applyPromoBtn');
    this.clearCartBtn = document.getElementById('clearCartBtn');
    this.checkoutBtn = document.getElementById('proceedCheckoutBtn');

    this.appliedDiscount = 0; // Discount amount in INR
    this.appliedPromoCode = '';

    this.init();
  }

  init() {
    this.render();

    // Clear cart listener
    this.clearCartBtn?.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your gourmet cart?')) {
        saveCart([]);
        this.render();
        showToast('Cart Cleared', 'Your shopping cart is now empty.', 'info');
      }
    });

    // Apply promo listener
    this.applyPromoBtn?.addEventListener('click', () => {
      this.handleApplyPromo();
    });

    // Checkout modal listener
    this.checkoutBtn?.addEventListener('click', () => {
      this.openCheckoutModal();
    });
  }

  handleApplyPromo() {
    const code = this.promoInput?.value.trim().toUpperCase();
    if (!code) {
      showToast('Promo Code', 'Please enter a valid coupon code.', 'danger');
      return;
    }

    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (code === 'CFE10' || code === 'WELCOME10') {
      this.appliedDiscount = Math.round(subtotal * 0.10);
      this.appliedPromoCode = code;
      showToast('Promo Applied', `10% discount applied! You saved ${formatINR(this.appliedDiscount)}.`, 'success');
      this.render();
    } else if (code === 'ROYAL100') {
      this.appliedDiscount = 100;
      this.appliedPromoCode = code;
      showToast('Promo Applied', `₹100 gourmet credit applied!`, 'success');
      this.render();
    } else {
      showToast('Invalid Code', 'Coupon code is invalid or expired. Try "CFE10".', 'danger');
    }
  }

  render() {
    const cart = getCart();

    if (!cart || cart.length === 0) {
      if (this.cartLayout) this.cartLayout.style.display = 'none';
      if (this.cartEmptyState) this.cartEmptyState.style.display = 'block';
      if (this.itemCountBadge) this.itemCountBadge.textContent = '0 items';
      updateCartBadge();
      return;
    }

    if (this.cartLayout) this.cartLayout.style.display = 'grid';
    if (this.cartEmptyState) this.cartEmptyState.style.display = 'none';

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (this.itemCountBadge) {
      this.itemCountBadge.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
    }

    // Render Table Rows
    if (this.tableBody) {
      this.tableBody.innerHTML = cart.map(item => `
        <tr data-id="${item.id}">
          <td>
            <div class="cart-item-info">
              <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" onerror="this.src='assets/images/pizza.png'">
              <div>
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="diet-badge ${item.isVeg ? 'veg' : 'non-veg'}" style="width:16px; height:16px;"></span>
                  <div class="cart-item-title">${item.name}</div>
                </div>
                <div class="cart-item-meta">${item.category} • ${formatINR(item.price)} each</div>
              </div>
            </div>
          </td>
          <td style="font-weight:600; color:var(--color-primary-dark);">${formatINR(item.price)}</td>
          <td>
            <div class="cart-qty-ctrl">
              <button class="cart-qty-btn qty-dec-btn" data-id="${item.id}">-</button>
              <span class="cart-qty-val">${item.quantity}</span>
              <button class="cart-qty-btn qty-inc-btn" data-id="${item.id}">+</button>
            </div>
          </td>
          <td style="font-weight:700; font-family:var(--font-heading); font-size:1.15rem; color:var(--color-primary);">${formatINR(item.price * item.quantity)}</td>
          <td style="text-align:right;">
            <button class="cart-remove-btn remove-item-btn" data-id="${item.id}" title="Remove Dish">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          </td>
        </tr>
      `).join('');

      // Add Quantity & Remove Event Listeners
      this.tableBody.querySelectorAll('.qty-inc-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          this.changeQuantity(id, 1);
        });
      });

      this.tableBody.querySelectorAll('.qty-dec-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          this.changeQuantity(id, -1);
        });
      });

      this.tableBody.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.dataset.id;
          this.removeItem(id);
        });
      });
    }

    // Calculations
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.05); // 5% GST
    const deliveryFee = subtotal > 1000 || subtotal === 0 ? 0 : 40;
    const discount = Math.min(this.appliedDiscount, subtotal);
    const grandTotal = Math.max(0, subtotal + tax + deliveryFee - discount);

    if (this.subtotalEl) this.subtotalEl.textContent = formatINR(subtotal);
    if (this.taxEl) this.taxEl.textContent = formatINR(tax);
    if (this.deliveryEl) this.deliveryEl.textContent = deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee);

    if (this.discountRow && this.discountEl) {
      if (discount > 0) {
        this.discountRow.style.display = 'flex';
        this.discountEl.textContent = `-${formatINR(discount)}`;
      } else {
        this.discountRow.style.display = 'none';
      }
    }

    if (this.grandTotalEl) this.grandTotalEl.textContent = formatINR(grandTotal);

    updateCartBadge();
  }

  changeQuantity(id, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(id);
      return;
    }
    saveCart(cart);
    this.render();
  }

  removeItem(id) {
    let cart = getCart();
    const target = cart.find(i => i.id === id);
    cart = cart.filter(i => i.id !== id);
    saveCart(cart);
    this.render();
    if (target) {
      showToast('Item Removed', `${target.name} was removed from your cart.`, 'info');
    }
  }

  openCheckoutModal() {
    const cart = getCart();
    if (!cart || cart.length === 0) return;

    const user = getCurrentUser() || { name: 'Gourmet Guest', email: 'guest@cferestaurant.com', phone: '+91 98765 43210' };

    let checkoutModal = document.getElementById('checkoutModalOverlay');
    if (!checkoutModal) {
      checkoutModal = document.createElement('div');
      checkoutModal.id = 'checkoutModalOverlay';
      checkoutModal.className = 'modal-overlay';
      document.body.appendChild(checkoutModal);
    }

    checkoutModal.innerHTML = `
      <div class="modal-content" style="max-width:580px;">
        <button class="modal-close-btn" id="closeCheckoutModal">&times;</button>
        <div class="demo-badge-banner">
          <span>ℹ</span>
          <span><strong>Frontend Demo Mode:</strong> No real money is charged. This demonstrates order placement and receipt generation.</span>
        </div>
        <h2 style="font-size:1.6rem; margin-bottom:8px;">Complete Your Dining Order</h2>
        <p style="color:var(--color-text-muted); font-size:0.9rem; margin-bottom:24px;">Confirm your contact details and select payment method to place your order.</p>

        <form id="demoCheckoutForm">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-control no-icon" id="orderGuestName" value="${user.name}" required>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            <div class="form-group">
              <label class="form-label">Mobile Number</label>
              <input type="tel" class="form-control no-icon" id="orderGuestPhone" value="${user.phone || '9876543210'}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Order Type</label>
              <select class="form-control no-icon" id="orderDiningType">
                <option value="Dine-In Table Service">Dine-In Table Service</option>
                <option value="Gourmet Takeaway">Gourmet Takeaway</option>
                <option value="Direct Home Delivery">Direct Home Delivery</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Delivery / Table Notes</label>
            <input type="text" class="form-control no-icon" id="orderNotes" placeholder="e.g. Table #8 or ring doorbell">
          </div>
          <div class="form-group">
            <label class="form-label">Payment Preference (Demo)</label>
            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; margin-top:6px;">
              <label style="border:1.5px solid var(--color-border); padding:10px; border-radius:var(--radius-sm); font-size:0.85rem; text-align:center; cursor:pointer; background:var(--color-bg);">
                <input type="radio" name="payMethod" value="UPI Instant (GPay / PhonePe)" checked style="display:none;">
                <div style="font-weight:700;">UPI / QR</div>
              </label>
              <label style="border:1.5px solid var(--color-border); padding:10px; border-radius:var(--radius-sm); font-size:0.85rem; text-align:center; cursor:pointer; background:var(--color-bg);">
                <input type="radio" name="payMethod" value="Credit / Debit Card" style="display:none;">
                <div style="font-weight:700;">Card</div>
              </label>
              <label style="border:1.5px solid var(--color-border); padding:10px; border-radius:var(--radius-sm); font-size:0.85rem; text-align:center; cursor:pointer; background:var(--color-bg);">
                <input type="radio" name="payMethod" value="Pay at Restaurant Counter" style="display:none;">
                <div style="font-weight:700;">Pay at Dine</div>
              </label>
            </div>
          </div>

          <div style="border-top:1px dashed var(--color-border); padding-top:16px; margin-top:20px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:0.8rem; color:var(--color-text-muted);">Amount Payable</div>
              <div style="font-size:1.4rem; font-weight:800; font-family:var(--font-heading); color:var(--color-primary);">${this.grandTotalEl?.textContent || '₹0'}</div>
            </div>
            <button type="submit" class="btn btn-gold btn-lg">Place Demo Order</button>
          </div>
        </form>
      </div>
    `;

    checkoutModal.classList.add('active');

    // Radio button styling
    const payLabels = checkoutModal.querySelectorAll('label[style*="border:1.5px"]');
    payLabels.forEach(label => {
      label.addEventListener('click', () => {
        payLabels.forEach(l => {
          l.style.borderColor = 'var(--color-border)';
          l.style.background = 'var(--color-bg)';
        });
        label.style.borderColor = 'var(--color-accent)';
        label.style.background = 'rgba(197, 160, 89, 0.15)';
      });
    });

    document.getElementById('closeCheckoutModal')?.addEventListener('click', () => {
      checkoutModal.classList.remove('active');
    });

    document.getElementById('demoCheckoutForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestName = document.getElementById('orderGuestName').value;
      const orderType = document.getElementById('orderDiningType').value;
      const selectedPay = checkoutModal.querySelector('input[name="payMethod"]:checked')?.value || 'UPI';

      const orderRef = 'CFE-' + Math.floor(100000 + Math.random() * 900000);
      const totalPaid = this.grandTotalEl?.textContent || '₹0';

      // Record in Demo Orders in localStorage
      try {
        const pastOrders = JSON.parse(localStorage.getItem('cfe_past_orders') || '[]');
        pastOrders.unshift({
          orderId: orderRef,
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          items: cart.map(i => `${i.name} (x${i.quantity})`),
          total: totalPaid,
          status: 'Kitchen Preparing'
        });
        localStorage.setItem('cfe_past_orders', JSON.stringify(pastOrders));
      } catch (err) {}

      // Clear the cart
      saveCart([]);
      this.render();

      // Show Receipt Modal
      checkoutModal.innerHTML = `
        <div class="modal-content" style="max-width:540px; text-align:center;">
          <div style="width:72px; height:72px; border-radius:50%; background:rgba(27, 138, 62, 0.15); color:var(--color-success); font-size:2.2rem; display:flex; align-items:center; justify-content:center; margin:0 auto 18px;">✓</div>
          <div class="section-tag">Order Confirmed (Demo)</div>
          <h2 style="font-size:1.8rem; margin-bottom:8px;">Thank You, ${guestName}!</h2>
          <p style="color:var(--color-text-muted); font-size:0.92rem; margin-bottom:20px;">Your culinary feast has been sent to our executive chef's brigade.</p>
          
          <div style="background:var(--color-bg); padding:20px; border-radius:var(--radius-md); text-align:left; font-size:0.88rem; margin-bottom:24px; border:1px solid var(--color-border);">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <span style="color:var(--color-text-muted);">Order Reference:</span>
              <strong style="color:var(--color-primary);">${orderRef}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <span style="color:var(--color-text-muted);">Dining Format:</span>
              <strong>${orderType}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
              <span style="color:var(--color-text-muted);">Payment Method:</span>
              <strong>${selectedPay}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; border-top:1px dashed var(--color-border); padding-top:8px; margin-top:8px;">
              <span style="font-weight:700;">Total Amount:</span>
              <strong style="font-size:1.15rem; color:var(--color-primary);">${totalPaid}</strong>
            </div>
          </div>

          <div style="display:flex; gap:12px; justify-content:center;">
            <a href="menu.html" class="btn btn-outline">Explore More Dishes</a>
            <a href="profile.html" class="btn btn-primary">View in Profile</a>
          </div>
        </div>
      `;

      showToast('Order Received', `Order #${orderRef} has been registered!`, 'success');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cartTableBody') || document.getElementById('cartEmptyState')) {
    new CartController();
  }
});
