/**
 * CFE RESTAURANT - AUTHENTICATION LOGIC (FRONTEND DEMONSTRATION)
 * Handles: Login validation, Registration validation, Show/Hide Password,
 * Password Strength Meter, Profile Photo preview for signup, and Forgot Password modal.
 * Note: Purely client-side demo; non-sensitive info saved to localStorage.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Password Visibility Toggles
  document.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
      } else {
        input.type = 'password';
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
      }
    });
  });

  /* --------------------------------------------------------------------------
     1. REGISTRATION FORM LOGIC
     -------------------------------------------------------------------------- */
  const regForm = document.getElementById('registerForm');
  if (regForm) {
    const regPasswordInput = document.getElementById('regPassword');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const regAvatarInput = document.getElementById('regAvatarInput');
    const regAvatarPreview = document.getElementById('regAvatarPreview');

    const regAvatarResetBtn = document.getElementById('regAvatarResetBtn');

    let previewAvatarBase64 = 'assets/images/coffeee.jpeg';

    // Live Avatar Preview via FileReader
    regAvatarInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          showToast('Invalid File', 'Please select a valid image file (JPG, PNG, WebP).', 'danger');
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          previewAvatarBase64 = event.target.result;
          if (regAvatarPreview) regAvatarPreview.src = previewAvatarBase64;
          if (regAvatarResetBtn) regAvatarResetBtn.style.display = 'inline-block';
          showToast('Photo Preview', 'Profile photo preview loaded successfully.', 'info');
        };
        reader.readAsDataURL(file);
      }
    });

    regAvatarResetBtn?.addEventListener('click', () => {
      previewAvatarBase64 = 'assets/images/coffeee.jpeg';
      if (regAvatarPreview) regAvatarPreview.src = previewAvatarBase64;
      if (regAvatarInput) regAvatarInput.value = '';
      regAvatarResetBtn.style.display = 'none';
      showToast('Photo Cleared', 'Reset to default gourmet emblem.', 'info');
    });

    // Password Strength Meter
    regPasswordInput?.addEventListener('input', (e) => {
      const pwd = e.target.value;
      let score = 0;

      if (pwd.length >= 6) score += 1;
      if (pwd.length >= 10) score += 1;
      if (/[A-Z]/.test(pwd)) score += 1;
      if (/[0-9]/.test(pwd)) score += 1;
      if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

      if (!strengthBar || !strengthText) return;

      if (pwd.length === 0) {
        strengthBar.style.width = '0%';
        strengthBar.style.backgroundColor = 'transparent';
        strengthText.textContent = '';
      } else if (score <= 2) {
        strengthBar.style.width = '30%';
        strengthBar.style.backgroundColor = 'var(--color-danger)';
        strengthText.textContent = 'Weak password';
        strengthText.style.color = 'var(--color-danger)';
      } else if (score <= 3) {
        strengthBar.style.width = '65%';
        strengthBar.style.backgroundColor = 'var(--color-warning)';
        strengthText.textContent = 'Moderate password';
        strengthText.style.color = 'var(--color-warning)';
      } else {
        strengthBar.style.width = '100%';
        strengthBar.style.backgroundColor = 'var(--color-success)';
        strengthText.textContent = 'Strong password';
        strengthText.style.color = 'var(--color-success)';
      }
    });

    // Submit Registration
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('regName').value.trim();
      const username = document.getElementById('regUsername').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const password = document.getElementById('regPassword').value;
      const confirmPassword = document.getElementById('regConfirmPassword').value;

      let isValid = true;

      // Validation
      if (name.length < 2) {
        showError('regNameError', 'Please enter your full name (at least 2 characters).');
        isValid = false;
      } else {
        clearError('regNameError');
      }

      if (username.length < 3) {
        showError('regUsernameError', 'Username must be at least 3 characters.');
        isValid = false;
      } else {
        clearError('regUsernameError');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError('regEmailError', 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearError('regEmailError');
      }

      const phoneRegex = /^[0-9]{10}$/;
      const cleanedPhone = phone.replace(/[^0-9]/g, '');
      if (cleanedPhone.length < 10) {
        showError('regPhoneError', 'Please enter a valid 10-digit mobile number.');
        isValid = false;
      } else {
        clearError('regPhoneError');
      }

      if (password.length < 6) {
        showError('regPasswordError', 'Password must be at least 6 characters.');
        isValid = false;
      } else {
        clearError('regPasswordError');
      }

      if (password !== confirmPassword) {
        showError('regConfirmError', 'Passwords do not match.');
        isValid = false;
      } else {
        clearError('regConfirmError');
      }

      if (!isValid) return;

      // Save non-sensitive user profile to demonstration localStorage
      const newUser = {
        name: name,
        username: username,
        email: email,
        phone: phone,
        bio: 'Epicurean food lover & culinary enthusiast.',
        location: 'Bengaluru, India',
        avatar: previewAvatarBase64,
        memberSince: 'October 2026'
      };

      // Store in profile key and log in immediately
      localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(newUser));
      setCurrentUser(newUser);

      showToast('Registration Successful', `Welcome to CFE Restaurant, ${name}! Your privileges are ready.`, 'success');

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 900);
    });
  }

  /* --------------------------------------------------------------------------
     2. LOGIN FORM LOGIC
     -------------------------------------------------------------------------- */
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const identifier = document.getElementById('loginIdentifier').value.trim();
      const password = document.getElementById('loginPassword').value;

      if (!identifier) {
        showError('loginIdError', 'Please enter your email or username.');
        return;
      } else {
        clearError('loginIdError');
      }

      if (!password || password.length < 4) {
        showError('loginPassError', 'Please enter your password.');
        return;
      } else {
        clearError('loginPassError');
      }

      // Check if user has an existing profile in localStorage, otherwise create demo user
      let savedProfile = null;
      try {
        const raw = localStorage.getItem(PROFILE_DATA_KEY);
        if (raw) savedProfile = JSON.parse(raw);
      } catch (err) {}

      const loggedUser = savedProfile || {
        name: identifier.includes('@') ? identifier.split('@')[0].toUpperCase() : identifier,
        username: identifier.includes('@') ? identifier.split('@')[0] : identifier,
        email: identifier.includes('@') ? identifier : `${identifier}@example.com`,
        phone: '+91 98765 43210',
        bio: 'Passionate connoisseur of authentic Indian & World cuisine.',
        location: 'Bengaluru, India',
        avatar: 'assets/images/coffeee.jpeg',
        memberSince: 'October 2026'
      };

      setCurrentUser(loggedUser);
      showToast('Welcome Back', `Glad to see you again, ${loggedUser.name}! Opening your dining room...`, 'success');

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 900);
    });

    // Forgot Password Trigger
    const forgotPwdBtn = document.getElementById('forgotPasswordBtn');
    forgotPwdBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      openForgotPasswordModal();
    });
  }

  /* --------------------------------------------------------------------------
     3. FORGOT PASSWORD MODAL
     -------------------------------------------------------------------------- */
  function openForgotPasswordModal() {
    let modal = document.getElementById('forgotModalOverlay');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'forgotModalOverlay';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-content" style="max-width:460px;">
        <button class="modal-close-btn" id="closeForgotModal">&times;</button>
        <div class="demo-badge-banner">
          <span>ℹ</span>
          <span><strong>Frontend Demo:</strong> Simulates a password reset link.</span>
        </div>
        <h3 style="font-size:1.4rem; margin-bottom:6px;">Reset Your Password</h3>
        <p style="color:var(--color-text-muted); font-size:0.88rem; margin-bottom:20px;">Enter your registered email address and we will dispatch a demo reset instruction.</p>

        <form id="forgotPassForm">
          <div class="form-group">
            <label class="form-label">Registered Email</label>
            <input type="email" class="form-control no-icon" id="forgotEmailInput" placeholder="name@example.com" required>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;">Send Reset Link</button>
        </form>
      </div>
    `;

    modal.classList.add('active');

    document.getElementById('closeForgotModal')?.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });

    document.getElementById('forgotPassForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('forgotEmailInput').value;
      modal.classList.remove('active');
      showToast('Reset Link Dispatched', `A demo password recovery link was sent to ${email}.`, 'info');
    });
  }

  function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = message;
      el.classList.add('visible');
    }
  }

  function clearError(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = '';
      el.classList.remove('visible');
    }
  }
});
