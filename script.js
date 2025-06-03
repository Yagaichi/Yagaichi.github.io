document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navbarNav = document.querySelector(".navbar-nav");
  const shoppingCartBtn = document.getElementById("shopping-cart-button");
  const shoppingCart = document.getElementById("shopping-cart");
  const itemDetailModal = document.getElementById("item-detail-modal");
  const closeModalBtn = document.getElementById("modal-close-btn");
  const cartQuantityBadge = document.getElementById("cart-quantity");
  const checkoutFormContainer = document.getElementById("checkout-form-container");
  const checkoutButton = document.getElementById("checkout-button");
  const checkoutForm = document.getElementById("checkoutForm");
  const checkoutItemsInput = document.getElementById("checkout-items");
  const checkoutTotalInput = document.getElementById("checkout-total");

  const products = [
    {
      id: 1,
      name: "Dimsum Mentai - Paket Mini",
      price: 17000,
      img: "image/dimsum1.jpg",
      description:
        "Dimsum Mentai Paket Mini adalah pilihan ideal bagi Anda yang ingin menikmati cita rasa autentik dimsum dengan porsi praktis. Terbuat dari daging ayam segar yang lembut, setiap gigitannya dibalut dengan saus mentai creamy khas MakaneFood yang kaya rasa dan gurih. Cocok untuk camilan sore atau teman santai Anda di rumah, produk ini bebas pengawet dan menggunakan bahan-bahan berkualitas agar selalu memberikan kenikmatan maksimal.",
    },
    {
      id: 2,
      name: "Dimsum Mentai - Paket Reguler",
      price: 25000,
      img: "image/dimsum2.jpg",
      description:
        "Nikmati sensasi dimsum udang segar yang dipadukan dengan saus mentai istimewa dalam Paket Reguler ini. Rasa udang yang juicy dan tekstur lembut berpadu sempurna dengan saus mentai yang creamy dan sedikit pedas, menghadirkan pengalaman kuliner yang memanjakan lidah. Cocok untuk makan bersama keluarga atau sebagai hidangan spesial saat berkumpul dengan teman-teman.",
    },
    {
      id: 3,
      name: "Dimsum Original - Paket Jumbo",
      price: 25000,
      img: "image/dimsum3.jpg",
      description:
        "Dimsum Original Paket Jumbo merupakan hidangan spesial dengan ukuran lebih besar dan isian keju mozzarella yang lumer di mulut. Dipadukan dengan saus mentai spesial kami, dimsum ini memberikan rasa gurih dan creamy yang tak terlupakan. Sangat cocok untuk Anda yang ingin menikmati hidangan dimsum lebih puas dengan cita rasa otentik serta kualitas premium.",
    },
    {
      id: 4,
      name: "Dimsum Original - Paket Praktis",
      price: 20000,
      img: "image/dimsum4.png",
      description:
        "Untuk Anda yang menginginkan hidangan cepat saji tanpa mengorbankan rasa, Dimsum Original Paket Praktis adalah jawabannya. Dimasak dengan bahan-bahan pilihan seperti keju mozzarella segar dan saus mentai khas MakaneFood, produk ini mudah disajikan dan tetap menawarkan sensasi rasa yang kaya serta tekstur lembut yang memuaskan setiap gigitan.",
    },
    {
      id: 5,
      name: "Dimsum Cake Birthday",
      price: 120000,
      img: "image/dimsum5.jpg",
      description:
        "Rayakan momen spesial Anda dengan Dimsum Cake Birthday, kreasi unik dari MakaneFood yang memadukan dimsum dengan cake keju mozzarella berlapis saus mentai creamy. Tidak hanya lezat, tampilannya yang menarik membuatnya menjadi pusat perhatian di setiap perayaan ulang tahun. Produk ini dibuat dengan bahan-bahan terbaik tanpa pengawet, sehingga aman dinikmati oleh semua kalangan dan menghadirkan pengalaman kuliner tak terlupakan.",
    },
  ];

  let cart = [];

  function renderProducts() {
    const container = document.querySelector("#menu .row");
    if (!container) return;
    container.innerHTML = "";
    products.forEach((item) => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
      <div class="product-icons">
        <a href="#" class="add-to-cart-button" data-id="${item.id}" title="Tambah ke Keranjang">
          <i data-feather="shopping-cart"></i>
        </a>
        <a href="#" class="item-detail-button" data-id="${item.id}" title="Lihat Detail">
          <i data-feather="eye"></i>
        </a>
      </div>
      <div class="product-image">
        <img src="${item.img}" alt="${item.name}" />
      </div>
      <div class="product-content">
        <h3>${item.name}</h3>
        <div class="product-stars" style="color: #FFD700;>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <div class="product-price">Rp${item.price.toLocaleString("id-ID")}</div>
      </div>
    `;
      container.appendChild(div);
    });

    // Ganti ini karena feather tidak digunakan untuk bintang:
    feather.replace();
  }

  function renderCart() {
    const cartContainer = document.getElementById("cart-items-container");
    const emptyText = document.getElementById("cart-empty-text");
    const totalText = document.getElementById("cart-total-text");
    const totalPriceEl = document.getElementById("cart-total");
    const cartQuantity = document.getElementById("cart-quantity");

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      emptyText.style.display = "block";
      totalText.style.display = "none";
      cartQuantity.style.display = "none";
      checkoutButton.disabled = true;
      checkoutButton.classList.add("disabled");
    } else {
      emptyText.style.display = "none";
      totalText.style.display = "block";
      cartQuantity.style.display = "inline";

      cart.forEach((item) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-qty">
            <button class="qty-btn minus" data-id="${item.id}">-</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn plus" data-id="${item.id}">+</button>
          </div>
          <div class="cart-item-price">Rp${(item.price * item.qty).toLocaleString("id-ID")}</div>
        `;
        cartContainer.appendChild(div);
      });

      const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
      totalPriceEl.textContent = "Rp" + total.toLocaleString("id-ID");

      const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
      cartQuantity.textContent = totalQty;

      checkoutItemsInput.value = JSON.stringify(cart.map(({ id, name, qty, price }) => ({ id, name, qty, price })));
      checkoutTotalInput.value = total;

      checkoutButton.disabled = false;
      checkoutButton.classList.remove("disabled");
    }
  }

  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
      cartItem.qty++;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    alert(`${product.name} berhasil ditambahkan ke keranjang!`);
    renderCart();
  }

  function showItemDetail(item) {
    if (!itemDetailModal) return;
    itemDetailModal.querySelector("img").src = item.img;
    itemDetailModal.querySelector("img").alt = item.name;
    itemDetailModal.querySelector("h3").textContent = item.name;
    itemDetailModal.querySelector("p").textContent = item.description;
    itemDetailModal.querySelector(".product-price").textContent = "Rp" + item.price.toLocaleString("id-ID");
    itemDetailModal.style.display = "flex";
  }

  hamburgerMenu?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    navbarNav?.classList.toggle("active");
    shoppingCart.classList.remove("active");
    if (itemDetailModal) itemDetailModal.style.display = "none";
    checkoutFormContainer?.classList.remove("active");
  });

  shoppingCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    shoppingCart.classList.toggle("active");
    if (checkoutFormContainer) {
      checkoutFormContainer.classList.toggle("active", shoppingCart.classList.contains("active"));
    }
    navbarNav?.classList.remove("active");
    if (itemDetailModal) itemDetailModal.style.display = "none";
  });

  document.body.addEventListener("click", (e) => {
    const target = e.target;

    // Cegah penutupan jika klik terjadi di elemen penting
    const ignoreClose = target.closest("#shopping-cart") || target.closest("#checkout-form-container") || target.closest(".qty-btn") || target.closest("#shopping-cart-button") || target.closest("#checkout-button");

    if (hamburgerMenu.contains(target) || ignoreClose) return;

    navbarNav?.classList.remove("active");
    shoppingCart.classList.remove("active");
    if (itemDetailModal) itemDetailModal.style.display = "none";
    checkoutFormContainer?.classList.remove("active");
  });

  closeModalBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    if (itemDetailModal) itemDetailModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === itemDetailModal) {
      itemDetailModal.style.display = "none";
    }
  });

  feather.replace();

  // ✅ Event tombol detail, tambah keranjang, dan qty +/- sudah aktif di sini:
  document.addEventListener("click", (e) => {
    const detailBtn = e.target.closest(".item-detail-button");
    if (detailBtn) {
      e.preventDefault();
      const id = parseInt(detailBtn.dataset.id);
      const product = products.find((p) => p.id === id);
      if (product) showItemDetail(product);
      return;
    }

    const addToCartBtn = e.target.closest(".add-to-cart-button");
    if (addToCartBtn) {
      e.preventDefault();
      const id = parseInt(addToCartBtn.dataset.id);
      addToCart(id);
      return;
    }

    const plusBtn = e.target.closest(".qty-btn.plus");
    if (plusBtn) {
      e.preventDefault();
      const id = parseInt(plusBtn.dataset.id);
      const cartItem = cart.find((item) => item.id === id);
      if (cartItem) {
        cartItem.qty++;
        renderCart();
      }
      return;
    }

    const minusBtn = e.target.closest(".qty-btn.minus");
    if (minusBtn) {
      e.preventDefault();
      const id = parseInt(minusBtn.dataset.id);
      const cartItem = cart.find((item) => item.id === id);
      if (cartItem) {
        if (cartItem.qty > 1) {
          cartItem.qty--;
        } else {
          cart = cart.filter((item) => item.id !== id);
        }
        renderCart();
      }
      return;
    }
  });

  checkoutForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Keranjang kosong, silakan tambahkan produk terlebih dahulu.");
      return;
    }

    const formData = new FormData(checkoutForm);
    const nama = formData.get("nama");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address = formData.get("address");

    if (!nama || !email || !phone || !address) {
      alert("Mohon lengkapi semua data pelanggan.");
      return;
    }

    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    let pesan = `Halo, saya ingin memesan dari MakaneFood.\n\n`;
    pesan += `Nama: ${nama}\n`;
    pesan += `Email: ${email}\n`;
    pesan += `Telepon: ${phone}\n`;
    pesan += `Alamat: ${address}\n\n`;
    pesan += `Pesanan:\n`;

    cart.forEach((item) => {
      pesan += `- ${item.name} (x${item.qty}): Rp${(item.price * item.qty).toLocaleString("id-ID")}\n`;
    });

    pesan += `\nTotal: Rp${total.toLocaleString("id-ID")}\n\nTerima kasih.`;

    const waNumber = "6285863769479";
    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(pesan)}`;

    // Fitur salin otomatis ke clipboard
    navigator.clipboard
      .writeText(pesan)
      .then(() => {
        alert("✅ Pesanan telah disalin ke clipboard.\nJika pesan tidak otomatis muncul di WhatsApp, kamu bisa tempel (paste) secara manual.");
      })
      .catch(() => {
        alert("Pesan tidak bisa disalin otomatis. Silakan tempel manual nanti di WhatsApp.");
      });

    window.open(waUrl, "_blank");

    checkoutForm.reset();
    cart = [];
    renderCart();
    shoppingCart.classList.remove("active");
    checkoutFormContainer.classList.remove("active");
  });

  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // 🔒 Hindari reload halaman

    const nama = document.getElementById("contact-name").value.trim();
    const hp = document.getElementById("contact-phone").value.trim();
    const pesan = document.getElementById("contact-message").value.trim();

    if (nama && hp && pesan) {
      const message = `Halo Admin Makane,\n\nNama: ${nama}\nNo HP: ${hp}\nPesan:\n${pesan}`;
      const whatsappLink = `https://wa.me/6285863769479?text=${encodeURIComponent(message)}`;
      window.open(whatsappLink, "_blank"); // Buka WhatsApp
    } else {
      alert("Mohon isi semua kolom terlebih dahulu.");
    }
  });

  renderProducts();
  renderCart();
});
