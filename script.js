// PERSONALKAN WEBSITE: ganti nama di bawah ini.
const CONFIG = {
  namaPacar: "Bunga Desita Putri",
  namaPanggilan: "Bunga Desita Putri",
  namaKamu: "Mess",
};

document.getElementById("heroName").textContent = CONFIG.namaPacar;
document.getElementById("letterName").textContent = CONFIG.namaPanggilan;
document.getElementById("senderName").textContent = CONFIG.namaKamu;
document.getElementById("year").textContent = new Date().getFullYear();

// Hitung mundur menuju ulang tahun Bunga: 8 Desember 2026 pukul 00.00 waktu lokal.
const birthdayDate = new Date(2026, 11, 8, 0, 0, 0);
function updateCountdown() {
  const now = new Date();
  const distance = birthdayDate.getTime() - now.getTime();
  if (distance <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach((id) => {
      document.getElementById(id).textContent = "00";
    });
    document.querySelector(".countdown-section h2").textContent =
      "Hari ini adalah harimu, Bunga! ♡";
    document.querySelector(".countdown-note").textContent =
      "Selamat ulang tahun, sayanggg. Semoga hari ini penuh cinta.";
    return;
  }
  const values = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000),
  };
  Object.entries(values).forEach(([id, value]) => {
    document.getElementById(id).textContent = String(value).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Layar pembuka: musik baru boleh dimulai setelah interaksi pengguna.
document.getElementById("openGift").addEventListener("click", () => {
  document.getElementById("intro").classList.add("hidden");
});

// Foto bisa dipilih langsung dari HP/laptop. Foto tidak diunggah ke mana pun.
const photoInput = document.getElementById("photoInput");
photoInput.addEventListener("change", (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) return;
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("uploadedPhoto").src = reader.result;
    document.getElementById("uploadedPhoto").classList.add("visible");
    document.getElementById("photoPlaceholder").style.display = "none";
  };
  reader.readAsDataURL(file);
});

// Musik MP3 untuk ulang tahun Bunga
const musicButton = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");

const backgroundMusic = new Audio("ulthayang.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.65;

async function toggleMusic() {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      musicButton.classList.add("playing");
      musicLabel.textContent = "Music is playing";
    } catch (error) {
      musicLabel.textContent = "Musik gagal diputar";
    }
  } else {
    backgroundMusic.pause();
    musicButton.classList.remove("playing");
    musicLabel.textContent = "Play our song";
  }
}

musicButton.addEventListener("click", toggleMusic);

// Harapan ulang tahun + confetti.
const wishBtn = document.getElementById("wishBtn");
wishBtn.addEventListener("click", () => {
  document.getElementById("wishMessage").textContent =
    "Semoga semua harapan baik ayangg menemukan jalannya, abg akan selalu mendoakan ayanggg. ♡";
  wishBtn.textContent = "A wish sent with love ✓";
  wishBtn.disabled = true;
  wishBtn.style.opacity = ".8";
  launchConfetti();
});

function launchConfetti() {
  const symbols = ["♡", "✦", "✿", "♥", "✨"];
  for (let i = 0; i < 36; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.animationDelay = Math.random() * 1.3 + "s";
    piece.style.color = ["#d98283", "#e6b6a9", "#b98780", "#e8c9bd"][
      Math.floor(Math.random() * 4)
    ];
    piece.style.fontSize = 12 + Math.random() * 15 + "px";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5000);
  }
}
