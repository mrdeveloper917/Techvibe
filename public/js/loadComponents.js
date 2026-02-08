async function loadComponent(id, file) {
  const element = document.getElementById(id);

  // ✅ SAFETY CHECK (IMPORTANT)
  if (!element) return;

  try {
    const res = await fetch(file);
    const data = await res.text();
    element.innerHTML = data;
  } catch (err) {
    console.error(`Failed to load ${file}`, err);
  }
}

/* LOAD COMPONENTS */
loadComponent("navbar", "components/navbar.html");
loadComponent("footer", "components/footer.html");;
