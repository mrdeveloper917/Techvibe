const API = "http://localhost:5000/api/auth/login";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Login failed");
      return;
    }

    alert("Login successful ✅");

    // Future: store token / user
    // localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "index.html";

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
});
