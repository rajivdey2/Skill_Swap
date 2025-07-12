const API_URL = 'http://localhost:5000';

// Store logged-in user ID
let currentUserId = localStorage.getItem('userId');

// Register Form
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = {
      name: document.getElementById('name').value,
      location: document.getElementById('location').value,
      profilePhoto: document.getElementById('profilePhoto').value,
      skillsOffered: document.getElementById('skillsOffered').value.split(',').map(s => s.trim()),
      skillsWanted: document.getElementById('skillsWanted').value.split(',').map(s => s.trim()),
      availability: document.getElementById('availability').value,
      isPublic: document.getElementById('isPublic').checked
    };
    try {
      const res = await fetch(`${API_URL}/create-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      const data = await res.json();
      if (res.ok) {
        document.getElementById('register-message').textContent = 'User created! ID: ' + data._id;
        localStorage.setItem('userId', data._id);
      } else {
        document.getElementById('register-message').textContent = data.error;
      }
    } catch (err) {
      document.getElementById('register-message').textContent = 'Error creating user';
    }
  });
}

// Login Form (mock login by storing user ID)
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    currentUserId = document.getElementById('userId').value;
    localStorage.setItem('userId', currentUserId);
    document.getElementById('login-message').textContent = 'Logged in!';
    setTimeout(() => window.location.href = 'profile.html', 1000);
  });
}

// Profile Page
const profileDetails = document.getElementById('profile-details');
if (profileDetails && currentUserId) {
  fetch(`${API_URL}/users?_id=${currentUserId}`)
    .then(res => res.json())
    .then(data => {
      const user = data[0];
      if (user) {
        profileDetails.innerHTML = `
          <h3>${user.name}</h3>
          <p>Location: ${user.location || 'Not set'}</p>
          <p>Skills Offered: ${user.skillsOffered.join(', ')}</p>
          <p>Skills Wanted: ${user.skillsWanted.join(', ')}</p>
          <p>Availability: ${user.availability || 'Not set'}</p>
          <p>Feedbacks: ${user.feedbacks.join(', ') || 'None'}</p>
        `;
      }
    })
    .catch(() => profileDetails.innerHTML = 'Error loading profile');
}

// Users Page
const searchForm = document.getElementById('search-form');
const usersList = document.getElementById('users-list');
if (searchForm && usersList) {
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const skill = document.getElementById('skill').value;
    const url = skill ? `${API_URL}/users?skill=${skill}` : `${API_URL}/users`;
    try {
      const res = await fetch(url);
      const users = await res.json();
      usersList.innerHTML = users.map(user => `
        <div class="user-card">
          <h3>${user.name}</h3>
          <p>Skills Offered: ${user.skillsOffered.join(', ')}</p>
          <p>Skills Wanted: ${user.skillsWanted.join(', ')}</p>
          <a href="swap-request.html?receiver=${user._id}" class="btn">Request Swap</a>
        </div>
      `).join('');
    } catch {
      usersList.innerHTML = 'Error fetching users';
    }
  });
  searchForm.dispatchEvent(new Event('submit')); // Load all users initially
}

// Swap Request Form
const swapRequestForm = document.getElementById('swap-request-form');
if (swapRequestForm) {
  const urlParams = new URLSearchParams(window.location.search);
  const receiverId = urlParams.get('receiver');
  document.getElementById('receiverId').value = receiverId || '';
  swapRequestForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentUserId) {
      document.getElementById('swap-request-message').textContent = 'Please log in';
      return;
    }
    const swap = {
      requester: currentUserId,
      receiver: document.getElementById('receiverId').value,
      skillOffered: document.getElementById('skillOffered').value,
      skillWanted: document.getElementById('skillWanted').value
    };
    try {
      const res = await fetch(`${API_URL}/request-swap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(swap)
      });
      const data = await res.json();
      document.getElementById('swap-request-message').textContent = res.ok ? 'Swap requested!' : data.error;
    } catch {
      document.getElementById('swap-request-message').textContent = 'Error requesting swap';
    }
  });
}

// Swaps Page
const swapsList = document.getElementById('swaps-list');
if (swapsList && currentUserId) {
  fetch(`${API_URL}/swap-requests/${currentUserId}`)
    .then(res => res.json())
    .then(swaps => {
      swapsList.innerHTML = swaps.map(swap => `
        <div class="swap-card">
          <p>From: ${swap.requester.name}</p>
          <p>To: ${swap.receiver.name}</p>
          <p>Skill Offered: ${swap.skillOffered}</p>
          <p>Skill Wanted: ${swap.skillWanted}</p>
          <p>Status: ${swap.status}</p>
          <a href="swap-details.html?swapId=${swap._id}" class="btn">View Details</a>
        </div>
      `).join('');
    })
    .catch(() => swapsList.innerHTML = 'Error fetching swaps');
}

// Swap Details Page
const swapDetails = document.getElementById('swap-details');
const swapActionForm = document.getElementById('swap-action-form');
if (swapDetails && swapActionForm) {
  const urlParams = new URLSearchParams(window.location.search);
  const swapId = urlParams.get('swapId');
  document.getElementById('swapId').value = swapId;
  fetch(`${API_URL}/swap-requests/${currentUserId}`)
    .then(res => res.json())
    .then(swaps => {
      const swap = swaps.find(s => s._id === swapId);
      if (swap) {
        swapDetails.innerHTML = `
          <p>From: ${swap.requester.name}</p>
          <p>To: ${swap.receiver.name}</p>
          <p>Skill Offered: ${swap.skillOffered}</p>
          <p>Skill Wanted: ${swap.skillWanted}</p>
          <p>Status: ${swap.status}</p>
        `;
      }
    });
  swapActionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = e.submitter.value;
    try {
      const res = await fetch(`${API_URL}/swap/${swapId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      swapDetails.innerHTML += `<p>${data.status}</p>`;
    } catch {
      swapDetails.innerHTML += '<p>Error updating swap</p>';
    }
  });
  document.getElementById('delete-swap-btn').addEventListener('click', async () => {
    try {
      const res = await fetch(`${API_URL}/swap/${swapId}`, { method: 'DELETE' });
      const data = await res.json();
      swapDetails.innerHTML += `<p>${data.message || data.error}</p>`;
    } catch {
      swapDetails.innerHTML += '<p>Error deleting swap</p>';
    }
  });
}

// Feedback Form
const feedbackForm = document.getElementById('feedback-form');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    const feedback = document.getElementById('feedback').value;
    try {
      const res = await fetch(`${API_URL}/feedback/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback })
      });
      const data = await res.json();
      document.getElementById('feedback-message').textContent = data.message || data.error;
    } catch {
      document.getElementById('feedback-message').textContent = 'Error submitting feedback';
    }
  });
}

// Admin Panel
const banForm = document.getElementById('ban-form');
const clearSkillsForm = document.getElementById('clear-skills-form');
const reportsBtn = document.getElementById('reports-btn');
const reportsDiv = document.getElementById('reports');
if (banForm) {
  banForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = document.getElementById('banUserId').value;
    try {
      const res = await fetch(`${API_URL}/admin/ban/${userId}`, { method: 'PATCH' });
      const data = await res.json();
      reportsDiv.innerHTML = data.message || data.error;
    } catch {
      reportsDiv.innerHTML = 'Error banning user';
    }
  });
}
if (clearSkillsForm) {
  clearSkillsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = document.getElementById('clearUserId').value;
    try {
      const res = await fetch(`${API_URL}/admin/clear-skills/${userId}`, { method: 'PATCH' });
      const data = await res.json();
      reportsDiv.innerHTML = data.message || data.error;
    } catch {
      reportsDiv.innerHTML = 'Error clearing skills';
    }
  });
}
if (reportsBtn) {
  reportsBtn.addEventListener('click', async () => {
    try {
      const res = await fetch(`${API_URL}/admin/reports`);
      const data = await res.json();
      reportsDiv.innerHTML = `
        <h3>Users</h3>
        ${data.users.map(u => `<p>${u.name}: ${u.isBanned ? 'Banned' : 'Active'}</p>`).join('')}
        <h3>Swaps</h3>
        ${data.swaps.map(s => `<p>${s.requester.name} -> ${s.receiver.name}: ${s.status}</p>`).join('')}
      `;
    } catch {
      reportsDiv.innerHTML = 'Error fetching reports';
    }
  });
}