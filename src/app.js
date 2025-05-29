document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Dimsum Mentai - Paket Mini ",
        img: "dimsum1.jpg",
        price: 17000,
        description:
          "Lezatnya dimsum kukus isi ayam pilihan disiram saus mentai creamy khas Makanefood yang gurih dan sedikit pedas, menjadikannya camilan premium yang memanjakan lidah. Cocok untuk kamu yang ingin mencoba rasa sebelum memesan lebih banyak. Sajian praktis dan nikmat untuk menemani waktu santai atau jadi pembuka sebelum hidangan utama.",
      },
      {
        id: 2,
        name: "Dimsum Mentai - Paket Regular ",
        img: "dimsum2.jpg",
        price: 25000,
        description:
          "Dimsum ayam kukus disajikan hangat dengan saus mentai spesial ala Makanefood yang creamy, gurih, dan menggoda. Setiap potong dimsum dibalut sempurna dengan topping mentai yang bikin ketagihan. Ideal untuk dinikmati bersama teman atau keluarga sebagai camilan ataupun lauk tambahan. Porsi lebih banyak, kepuasan lebih terasa!",
      },
      {
        id: 3,
        name: "Dimsum Original - Paket Praktis",
        img: "dimsum3.jpg",
        price: 20000,
        description:
          "Dimsum ayam kukus tanpa tambahan saus, mempertahankan cita rasa asli yang autentik dan gurih. Teksturnya lembut, isian padat, dan sangat cocok dijadikan camilan praktis kapan pun kamu butuh asupan lezat dan mengenyangkan. Bisa dinikmati langsung setelah dikukus atau ditambah saus favoritmu.",
      },
      {
        id: 4,
        name: "Dimsum Original - Paket Jumbo",
        img: "dimsum4.png",
        price: 25000,
        description:
          "Porsi lebih besar untuk kamu yang ingin lebih puas! Dimsum original ini dibuat dari daging ayam segar berkualitas tinggi dengan racikan bumbu khas Makanefood. Teksturnya yang lembut dan isian yang padat membuatnya pas untuk sharing bersama orang tersayang atau disantap sendiri hingga kenyang.",
      },
      {
        id: 5,
        name: "Dimsum Cake",
        img: "dimsum5.jpg",
        price: 120000,
        description:
          "Sajian unik dan spesial untuk perayaan atau momen istimewa! Dimsum Cake adalah kreasi eksklusif dari Makanefood, berupa susunan dimsum dalam bentuk cake yang dihias cantik dan menggugah selera. Cocok untuk ulang tahun, acara spesial, atau hadiah unik bagi pecinta dimsum. Disajikan dengan pilihan saus mentai dan original yang membuat pengalaman makan jadi luar biasa!",
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
