function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

function loadNavbarUser() {
  const loginBtn = document.getElementById("loginBtn");
  const userBtn = document.getElementById("userBtn");
  const userName = document.getElementById("navUserName");

  if (!loginBtn || !userBtn) return;

  const user = getUser();

  if (user) {
    loginBtn.style.display = "none";
    userBtn.style.display = "flex";
    if (userName) userName.innerText = user.name;
  } else {
    loginBtn.style.display = "inline-flex";
    userBtn.style.display = "none";
  }
}

/* 🔐 ACCESS GUARDS */
function authGuard() {
  if (!getUser()) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

function cartGuard() {
  return authGuard();
}

function logoutUser() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

/* wait for navbar injection */
setTimeout(loadNavbarUser, 200);
