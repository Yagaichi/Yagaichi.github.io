document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navbarNav = document.querySelector(".navbar-nav");
  const itemDetailModal = document.querySelector("#item-detail-modal");

  // Fungsi untuk menutup navbar
  const closeNavbar = () => {
    if (navbarNav.classList.contains("active")) {
      navbarNav.classList.remove("active");
    }
  };

  // Event listener untuk hamburger menu
  hamburgerMenu.addEventListener("click", (event) => {
    event.stopPropagation();
    navbarNav.classList.toggle("active");
    event.preventDefault();
  });

  // Event listener untuk body, untuk menutup navbar saat klik di luar
  document.body.addEventListener("click", () => {
    closeNavbar();
  });

  // Event listener untuk navbar untuk mencegah penutupan saat diklik
  navbarNav.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Event listener untuk setiap link di navbar
  const navLinks = document.querySelectorAll(".navbar-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      closeNavbar();
    });
  });

  // Delegasi event untuk tombol detail barang
  document.addEventListener("click", (event) => {
    if (event.target.closest(".item-detail-button")) {
      event.preventDefault();
      itemDetailModal.style.display = "flex";
    }
  });

  // Tombol close modal
  document.querySelector(".modal .close-icon").addEventListener("click", (event) => {
    event.preventDefault();
    itemDetailModal.style.display = "none";
  });

  // Klik di luar modal
  window.addEventListener("click", (event) => {
    if (event.target === itemDetailModal) {
      itemDetailModal.style.display = "none";
    }
  });

  feather.replace();
});

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

document.addEventListener("DOMContentLoaded", function () {
  feather.replace();
});
