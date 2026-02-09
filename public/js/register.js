const API = "http://localhost:5000/api/auth/register";

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  if (!res.ok) {
    const text = await res.text(); // 👈 DEBUG
    console.error("Backend returned:", text);
    alert("Backend error — check console");
    return;
  }

  const data = await res.json();
  alert(data.message);
});
