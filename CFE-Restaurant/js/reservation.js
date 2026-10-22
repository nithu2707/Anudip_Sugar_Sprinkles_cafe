/**
 * CFE RESTAURANT - TABLE RESERVATION LOGIC (FRONTEND DEMONSTRATION)
 * Validates reservation form (Name, Email, 10-digit Phone, Min Date = Today, Guests, Time Slot),
 * Displays demonstration ticket confirmation modal, and stores demo record to localStorage.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservationForm');
  const dateInput = document.getElementById('resDate');
  const slotButtons = document.querySelectorAll('.slot-pill');
  let selectedSlot = '07:30 PM';

  // Set minimum date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  // Pre-fill user details if logged in
  const currentUser = getCurrentUser();
  if (currentUser) {
    const nameField = document.getElementById('resName');
    const emailField = document.getElementById('resEmail');
    const phoneField = document.getElementById('resPhone');
    if (nameField && !nameField.value) nameField.value = currentUser.name || '';
    if (emailField && !emailField.value) emailField.value = currentUser.email || '';
    if (phoneField && !phoneField.value) phoneField.value = currentUser.phone ? currentUser.phone.replace(/[^0-9]/g, '').slice(-10) : '';
  }

  // Time slot selection pills
  slotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      slotButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSlot = btn.dataset.time || btn.textContent.trim();
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('resName').value.trim();
      const email = document.getElementById('resEmail').value.trim();
      const phone = document.getElementById('resPhone').value.trim();
      const date = document.getElementById('resDate').value;
      const guests = document.getElementById('resGuests').value;
      const seating = document.getElementById('resSeating')?.value || 'Main Dining Hall';
      const requests = document.getElementById('resRequests')?.value.trim() || '';

      // Validation
      let isValid = true;

      if (name.length < 2) {
        showResError('resNameError', 'Please provide a valid full name.');
        isValid = false;
      } else {
        clearResError('resNameError');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showResError('resEmailError', 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearResError('resEmailError');
      }

      const phoneClean = phone.replace(/[^0-9]/g, '');
      if (phoneClean.length < 10) {
        showResError('resPhoneError', 'Please enter a valid 10-digit contact number.');
        isValid = false;
      } else {
        clearResError('resPhoneError');
      }

      if (!date) {
        showResError('resDateError', 'Please select a reservation date.');
        isValid = false;
      } else {
        clearResError('resDateError');
      }

      if (!isValid) return;

      const bookingRef = 'CFE-RES-' + Math.floor(1000 + Math.random() * 9000);

      // Save demonstration booking in localStorage
      try {
        const bookings = JSON.parse(localStorage.getItem('cfe_reservations') || '[]');
        bookings.unshift({
          bookingRef: bookingRef,
          name: name,
          email: email,
          phone: phoneClean,
          date: date,
          time: selectedSlot,
          guests: guests,
          seating: seating,
          requests: requests,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('cfe_reservations', JSON.stringify(bookings));
      } catch (err) {
        console.error(err);
      }

      // Show Confirmation Modal
      openReservationSuccessModal({
        bookingRef,
        name,
        email,
        phone,
        date,
        time: selectedSlot,
        guests,
        seating,
        requests
      });

      form.reset();
      if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
    });
  }

  function openReservationSuccessModal(data) {
    let modal = document.getElementById('resModalOverlay');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'resModalOverlay';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-content" style="max-width:560px; text-align:center;">
        <button class="modal-close-btn" id="closeResModal">&times;</button>
        <div style="width:68px; height:68px; border-radius:50%; background:rgba(197, 160, 89, 0.18); color:var(--color-accent-dark); font-size:2rem; display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">🥂</div>
        
        <div class="section-tag">Demonstration Booking Request</div>
        <h2 style="font-size:1.75rem; margin-bottom:8px;">Table Requested, ${data.name}!</h2>
        <p style="color:var(--color-text-muted); font-size:0.9rem; margin-bottom:20px;">
          Here is your demonstration reservation pass for CFE Restaurant.
        </p>

        <!-- Demo Disclaimer Alert -->
        <div class="demo-badge-banner" style="text-align:left; font-size:0.82rem; margin-bottom:20px;">
          <span>⚠️</span>
          <span><strong>Frontend Demo Notice:</strong> This reservation is for demonstration purposes only. It is not sent to a live restaurant database or backend service. Table seating is subject to real-world availability.</span>
        </div>

        <!-- Ticket Card -->
        <div style="background:var(--color-bg); border-radius:var(--radius-md); padding:22px; text-align:left; border:1.5px solid var(--color-border); margin-bottom:24px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:12px; border-bottom:1px solid var(--color-border); padding-bottom:8px;">
            <span style="font-size:0.85rem; color:var(--color-text-muted);">Pass Reference:</span>
            <strong style="color:var(--color-primary); font-family:monospace; font-size:1.05rem;">${data.bookingRef}</strong>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:0.88rem; margin-bottom:10px;">
            <div>
              <span style="color:var(--color-text-muted); display:block; font-size:0.78rem;">DATE & TIME</span>
              <strong>📅 ${data.date} @ ${data.time}</strong>
            </div>
            <div>
              <span style="color:var(--color-text-muted); display:block; font-size:0.78rem;">PARTY SIZE</span>
              <strong>👥 ${data.guests} Guests</strong>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:0.88rem;">
            <div>
              <span style="color:var(--color-text-muted); display:block; font-size:0.78rem;">SEATING AREA</span>
              <strong>🏛 ${data.seating}</strong>
            </div>
            <div>
              <span style="color:var(--color-text-muted); display:block; font-size:0.78rem;">CONTACT</span>
              <strong>📞 ${data.phone}</strong>
            </div>
          </div>
          ${data.requests ? `
            <div style="margin-top:12px; border-top:1px dashed var(--color-border); padding-top:8px; font-size:0.82rem; color:var(--color-text-muted);">
              <strong>Special Notes:</strong> "${data.requests}"
            </div>
          ` : ''}
        </div>

        <div style="display:flex; gap:12px; justify-content:center;">
          <button class="btn btn-outline" id="resModalDoneBtn">Close</button>
          <a href="menu.html" class="btn btn-gold">Explore Menu While Waiting</a>
        </div>
      </div>
    `;

    modal.classList.add('active');

    document.getElementById('closeResModal')?.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    document.getElementById('resModalDoneBtn')?.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });

    showToast('Reservation Requested', `Booking pass ${data.bookingRef} created (Demo Mode).`, 'success');
  }

  function showResError(id, msg) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = msg;
      el.classList.add('visible');
    }
  }

  function clearResError(id) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = '';
      el.classList.remove('visible');
    }
  }
});
