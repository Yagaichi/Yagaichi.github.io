document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Dimsum Mentai Isi 3",
        img: "dimsum1.jpg",
        price: 17000,
        description: "Dimsum isi 3 dengan saus mentai creamy, cocok untuk cemilan ringan.",
      },
      {
        id: 2,
        name: "Dimsum Mentai Isi 6",
        img: "dimsum2.jpg",
        price: 25000,
        description: "Dimsum isi 6 dengan cita rasa autentik, cocok untuk keluarga.",
      },
      {
        id: 3,
        name: "Dimsum Original",
        img: "dimsum3.jpg",
        price: 20000,
        description: "Kue nastar lembut berisi selai nanas homemade, khas lebaran.",
      },
      {
        id: 4,
        name: "Dimsum Mentai",
        img: "dimsum4.png",
        price: 25000,
        description: "Cornflake cookies renyah dengan rasa manis gurih.",
      },
      {
        id: 5,
        name: "CheseStik",
        img: "image5.jpg",
        price: 50000,
        description: "Cheese stick renyah dan gurih dengan aroma keju yang menggoda.",
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) return item;
          item.quantity++;
          item.total = item.price * item.quantity;
          this.quantity++;
          this.total += item.price;
          return item;
        });
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) return item;
          item.quantity--;
          item.total = item.price * item.quantity;
          this.quantity--;
          this.total -= item.price;
          return item;
        });
      } else {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Fungsi format Rupiah
window.rupiah = function (number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

//form validasi
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");
form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.lengths; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }

  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// tombol checkout
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);

  // perbaikan pada protokol URL
  window.open("https://wa.me/6289668849112?text=" + encodeURIComponent(message), "_blank");
});
const formatMessage = (obj) => {
  const itemsList = JSON.parse(obj.items)
    .map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)})`)
    .join("\n");

  return `📦 *Data Customer*\n` + `Nama: ${obj.nama}\n` + `Email: ${obj.email}\n` + `No Hp: ${obj.phone}\n\n` + `🧾 *Data Pesanan*\n${itemsList}\n` + `\n💰 TOTAL: ${rupiah(obj.total)}\n` + `\nTerima kasih telah memesan di *Makanefood*!`;
};
