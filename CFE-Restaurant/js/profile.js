/**
 * CFE RESTAURANT - USER PROFILE LOGIC
 * Allows users to view and update: Name, Username, Email, Phone, Bio, Location,
 * and Upload / Preview / Replace / Remove their profile photo.
 * Demonstrates persistence using localStorage for non-sensitive info only.
 */

class ProfileController {
  constructor() {
    this.defaultProfile = {
      name: 'Chef Ananya Sharma',
      username: 'ananya_gourmet',
      email: 'ananya.sharma@example.com',
      phone: '+91 98451 23456',
      bio: 'Epicurean food lover with an appreciation for authentic Indian spices, artisan sourdough, and slow-drip roasts.',
      location: 'Indiranagar, Bengaluru, India',
      avatar: 'assets/images/coffeee.jpeg',
      memberSince: 'October 2026'
    };

    this.profileData = this.loadProfileData();
    this.tempAvatar = this.profileData.avatar;
    this.isEditing = false;

    this.initElements();
    this.initEvents();
    this.render();
  }

  loadProfileData() {
    try {
      const stored = localStorage.getItem(PROFILE_DATA_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // If user logged in through auth session
      const current = getCurrentUser();
      if (current) return { ...this.defaultProfile, ...current };
    } catch (e) {
      console.error(e);
    }
    return { ...this.defaultProfile };
  }

  saveProfileData(data) {
    try {
      localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(data));
      // Also sync current active user session
      setCurrentUser(data);
      this.profileData = data;
      showToast('Profile Updated', 'Your profile details have been preserved.', 'success');
    } catch (e) {
      showToast('Error', 'Unable to save profile to browser storage.', 'danger');
    }
  }

  initElements() {
    // Display elements
    this.avatarImg = document.getElementById('profileAvatarImg');
    this.nameDisplay = document.getElementById('profileNameDisplay');
    this.usernameDisplay = document.getElementById('profileUsernameDisplay');
    this.bioDisplay = document.getElementById('profileBioDisplay');
    this.emailDisplay = document.getElementById('profileEmailDisplay');
    this.phoneDisplay = document.getElementById('profilePhoneDisplay');
    this.locationDisplay = document.getElementById('profileLocationDisplay');
    this.memberSinceDisplay = document.getElementById('profileMemberSince');

    // Controls
    this.editToggleBtn = document.getElementById('toggleEditBtn');
    this.viewCard = document.getElementById('profileViewSection');
    this.editCard = document.getElementById('profileEditSection');
    this.editForm = document.getElementById('profileEditForm');
    this.cancelBtn = document.getElementById('cancelEditBtn');
    this.logoutBtn = document.getElementById('profileLogoutBtn');

    // Edit Inputs
    this.inputName = document.getElementById('editFullName');
    this.inputUsername = document.getElementById('editUsername');
    this.inputEmail = document.getElementById('editEmail');
    this.inputPhone = document.getElementById('editPhone');
    this.inputBio = document.getElementById('editBio');
    this.inputLocation = document.getElementById('editLocation');

    // Avatar Controls
    this.avatarFileInput = document.getElementById('avatarFileInput');
    this.changeAvatarBtn = document.getElementById('changeAvatarBtn');
    this.removeAvatarBtn = document.getElementById('removeAvatarBtn');
    this.editAvatarPreview = document.getElementById('editAvatarPreview');

    // Tabs
    this.tabs = document.querySelectorAll('.profile-tab');
    this.tabPanes = document.querySelectorAll('.tab-pane');
    this.pastOrdersContainer = document.getElementById('pastOrdersContainer');
    this.reservationsContainer = document.getElementById('profileReservationsContainer');
  }

  initEvents() {
    // Toggle Edit Mode
    this.editToggleBtn?.addEventListener('click', () => {
      this.enterEditMode();
    });

    this.cancelBtn?.addEventListener('click', () => {
      this.exitEditMode();
    });

    // Save Form Submission
    this.editForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSave();
    });

    // File Input for Photo Upload
    this.changeAvatarBtn?.addEventListener('click', () => {
      this.avatarFileInput?.click();
    });

    this.avatarFileInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          showToast('Invalid File', 'Please choose an image file (JPG, PNG).', 'danger');
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          this.tempAvatar = event.target.result;
          if (this.editAvatarPreview) this.editAvatarPreview.src = this.tempAvatar;
          if (this.avatarImg) this.avatarImg.src = this.tempAvatar;
          showToast('Photo Selected', 'Preview updated! Click "Save Changes" to confirm.', 'info');
        };
        reader.readAsDataURL(file);
      }
    });

    // Remove Photo (Reset to default)
    this.removeAvatarBtn?.addEventListener('click', () => {
      this.tempAvatar = 'assets/images/coffeee.jpeg';
      if (this.editAvatarPreview) this.editAvatarPreview.src = this.tempAvatar;
      if (this.avatarImg) this.avatarImg.src = this.tempAvatar;
      showToast('Photo Removed', 'Profile photo reset to gourmet emblem.', 'info');
    });

    // Logout
    this.logoutBtn?.addEventListener('click', () => {
      if (confirm('Log out from your CFE Restaurant account?')) {
        logoutUser();
      }
    });

    // Tabs Switching
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.tabs.forEach(t => t.classList.remove('active'));
        this.tabPanes.forEach(p => p.style.display = 'none');

        tab.classList.add('active');
        const targetPane = document.getElementById(tab.dataset.target);
        if (targetPane) targetPane.style.display = 'block';
      });
    });
  }

  enterEditMode() {
    this.isEditing = true;
    this.tempAvatar = this.profileData.avatar;

    // Populate inputs
    if (this.inputName) this.inputName.value = this.profileData.name || '';
    if (this.inputUsername) this.inputUsername.value = this.profileData.username || '';
    if (this.inputEmail) this.inputEmail.value = this.profileData.email || '';
    if (this.inputPhone) this.inputPhone.value = this.profileData.phone || '';
    if (this.inputBio) this.inputBio.value = this.profileData.bio || '';
    if (this.inputLocation) this.inputLocation.value = this.profileData.location || '';
    if (this.editAvatarPreview) this.editAvatarPreview.src = this.tempAvatar;

    if (this.viewCard) this.viewCard.style.display = 'none';
    if (this.editCard) this.editCard.style.display = 'block';
  }

  exitEditMode() {
    this.isEditing = false;
    this.tempAvatar = this.profileData.avatar;
    if (this.avatarImg) this.avatarImg.src = this.profileData.avatar;

    if (this.viewCard) this.viewCard.style.display = 'block';
    if (this.editCard) this.editCard.style.display = 'none';
  }

  handleSave() {
    const updated = {
      ...this.profileData,
      name: this.inputName.value.trim(),
      username: this.inputUsername.value.trim(),
      email: this.inputEmail.value.trim(),
      phone: this.inputPhone.value.trim(),
      bio: this.inputBio.value.trim(),
      location: this.inputLocation.value.trim(),
      avatar: this.tempAvatar
    };

    if (!updated.name || !updated.email) {
      showToast('Validation Error', 'Full Name and Email are required.', 'danger');
      return;
    }

    this.saveProfileData(updated);
    this.exitEditMode();
    this.render();
  }

  render() {
    const d = this.profileData;
    if (this.avatarImg) this.avatarImg.src = d.avatar;
    if (this.nameDisplay) this.nameDisplay.textContent = d.name;
    if (this.usernameDisplay) this.usernameDisplay.textContent = `@${d.username}`;
    if (this.bioDisplay) this.bioDisplay.textContent = d.bio;
    if (this.emailDisplay) this.emailDisplay.textContent = d.email;
    if (this.phoneDisplay) this.phoneDisplay.textContent = d.phone;
    if (this.locationDisplay) this.locationDisplay.textContent = d.location;
    if (this.memberSinceDisplay) this.memberSinceDisplay.textContent = d.memberSince || 'October 2026';

    this.renderPastOrders();
    this.renderReservations();
  }

  renderPastOrders() {
    if (!this.pastOrdersContainer) return;
    try {
      const orders = JSON.parse(localStorage.getItem('cfe_past_orders') || '[]');
      if (orders.length === 0) {
        this.pastOrdersContainer.innerHTML = `
          <div style="padding:30px; text-align:center; color:var(--color-text-muted);">
            <div style="font-size:2rem; margin-bottom:8px;">🛍️</div>
            <p>No dining orders placed yet. Explore our royal menu!</p>
            <a href="menu.html" class="btn btn-outline btn-sm" style="margin-top:14px;">Browse Menu</a>
          </div>
        `;
        return;
      }

      this.pastOrdersContainer.innerHTML = orders.map(ord => `
        <div style="background:var(--color-bg); border-radius:var(--radius-md); padding:18px; margin-bottom:14px; border:1px solid var(--color-border);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-weight:700; color:var(--color-primary);">${ord.orderId}</span>
            <span style="font-size:0.75rem; background:rgba(27, 138, 62, 0.15); color:var(--color-success); font-weight:700; padding:4px 10px; border-radius:var(--radius-full);">${ord.status}</span>
          </div>
          <div style="font-size:0.86rem; color:var(--color-text-muted); margin-bottom:8px;">
            ${ord.items.join(', ')}
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; border-top:1px dashed var(--color-border); padding-top:8px;">
            <span style="color:var(--color-text-light);">${ord.date}</span>
            <strong style="color:var(--color-primary-dark); font-size:1rem;">${ord.total}</strong>
          </div>
        </div>
      `).join('');
    } catch (e) {}
  }

  renderReservations() {
    if (!this.reservationsContainer) return;
    try {
      const bookings = JSON.parse(localStorage.getItem('cfe_reservations') || '[]');
      if (bookings.length === 0) {
        this.reservationsContainer.innerHTML = `
          <div style="padding:30px; text-align:center; color:var(--color-text-muted);">
            <div style="font-size:2rem; margin-bottom:8px;">🍷</div>
            <p>No table reservations booked yet.</p>
            <a href="reservation.html" class="btn btn-primary btn-sm" style="margin-top:14px;">Reserve a Table</a>
          </div>
        `;
        return;
      }

      this.reservationsContainer.innerHTML = bookings.map(b => `
        <div style="background:var(--color-bg); border-radius:var(--radius-md); padding:18px; margin-bottom:14px; border:1px solid var(--color-border);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <strong style="color:var(--color-primary-dark);">${b.bookingRef}</strong>
            <span style="font-size:0.75rem; background:rgba(197, 160, 89, 0.18); color:var(--color-accent-dark); font-weight:700; padding:4px 10px; border-radius:var(--radius-full);">Confirmed (Demo)</span>
          </div>
          <div style="font-size:0.88rem; color:var(--color-text); margin-bottom:6px;">
            📅 ${b.date} at ${b.time} • 👥 ${b.guests} Guests
          </div>
          <div style="font-size:0.8rem; color:var(--color-text-muted);">
            Seating: ${b.seating} ${b.requests ? `• Note: "${b.requests}"` : ''}
          </div>
        </div>
      `).join('');
    } catch (e) {}
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('profileAvatarImg') || document.getElementById('profileViewSection')) {
    new ProfileController();
  }
});
