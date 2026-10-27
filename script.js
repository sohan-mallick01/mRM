/* ==========================================================================
   SHAYARIS DATA (Tailored for Riddhi)
   ========================================================================== */
const shayaris = [
  {
    id: 1,
    category: "sorry",
    categoryLabel: "Maafi Wali 🥺",
    lines: "Galti hui hai humse, hum aitraaf karte hain,\nHar saans me Riddhi hum sirf tumhein yaad karte hain.\nAb aur na satao humein apni is narazgi se,\nJaan nikal jaati hai jab tum humse baat nahi karte.",
    likes: 108
  },
  {
    id: 2,
    category: "tareef",
    categoryLabel: "Tareef Riddhi Ki ✨",
    lines: "Gusse me bhi chehre par ek ajeeb sa noor hai,\nTumhare bina har ek shaam be-rang aur be-noor hai.\nMuskura do ek baar to ye jahaan khil uthe,\nHumari Riddhi ke aage to chaand bhi maghroor hai.",
    likes: 142
  },
  {
    id: 3,
    category: "romantic",
    categoryLabel: "Mohabbat Bhari 💖",
    lines: "Tum rooth jao to duniya thami si lagti hai,\nHar ek mehfil me bas teri kami si lagti hai.\nRab se har dua me sirf tumhein hi manga hai,\nRiddhi, tumhare bina har khushi adhuri si lagti hai.",
    likes: 189
  },
  {
    id: 4,
    category: "sorry",
    categoryLabel: "Maafi Wali 🥺",
    lines: "Nahi chahiye humein koi aur is jahan me,\nBas ek tumhari hansi ke deewane hain.\nMaan jao na Riddhi ab chhodo bhi ye gussa,\nHum to sirf aur sirf tumhare parwane hain.",
    likes: 95
  },
  {
    id: 5,
    category: "tareef",
    categoryLabel: "Tareef Riddhi Ki ✨",
    lines: "Aankhon me kajal aur hothon pe narazgi ka pehra hai,\nRiddhi, teri is saadgi ka asar bada gehra hai.\nDekhkar tumhein to waqt bhi thehar jata hai,\nKhuda ne kya tarasha hai, roop kitna sunehra hai.",
    likes: 210
  },
  {
    id: 6,
    category: "romantic",
    categoryLabel: "Mohabbat Bhari 💖",
    lines: "Kaash ye gussa thoda pighal jaye,\nHumari khataon ka hisaab nikal jaye.\nEk baar keh do ki maaf kiya humein,\nToh humare is bechain dil ko karaar mil jaye.",
    likes: 164
  }
];

/* ==========================================================================
   FLOATING ROSE PETALS & HEARTS CANVAS
   ========================================================================== */
const canvas = document.getElementById("petal-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -20;
    this.size = Math.random() * 9 + 6;
    this.speedY = Math.random() * 1.5 + 0.8;
    this.speedX = Math.random() * 1 - 0.5;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.03;
    this.type = Math.random() > 0.4 ? "petal" : "heart";
    this.opacity = Math.random() * 0.6 + 0.3;
    this.wobble = Math.random() * Math.PI * 2;
  }
  update() {
    this.y += this.speedY;
    this.wobble += 0.02;
    this.x += Math.sin(this.wobble) * 0.8 + this.speedX;
    this.rotation += this.rotationSpeed;

    if (this.y > canvas.height + 30 || this.x < -30 || this.x > canvas.width + 30) {
      this.reset();
    }
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;

    if (this.type === "petal") {
      ctx.fillStyle = "#f43f5e";
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 0.6, this.size, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = "#fb7185";
      ctx.beginPath();
      const s = this.size * 0.7;
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-s, -s, -s * 1.5, s * 0.5, 0, s * 1.2);
      ctx.bezierCurveTo(s * 1.5, s * 0.5, s, -s, 0, 0);
      ctx.fill();
    }
    ctx.restore();
  }
}

for (let i = 0; i < 35; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ==========================================================================
   ROMANTIC PROCEDURAL AUDIO (Zero External Files, Web Audio API)
   ========================================================================== */
let audioCtx = null;
let isPlaying = false;
let musicInterval = null;
const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C, D, E, G, A, C5 Pentatonic

function playKalimbaNote(freq) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 1.9);
}

const musicBtn = document.getElementById("music-toggle");
const musicLabel = document.getElementById("music-label");

musicBtn.addEventListener("click", () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (isPlaying) {
    clearInterval(musicInterval);
    isPlaying = false;
    musicBtn.classList.remove("playing");
    musicLabel.textContent = "Play Romantic Melody";
  } else {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    isPlaying = true;
    musicBtn.classList.add("playing");
    musicLabel.textContent = "Melody Playing 🎵";

    musicInterval = setInterval(() => {
      const randomNote = notes[Math.floor(Math.random() * notes.length)];
      playKalimbaNote(randomNote);
    }, 650);
  }
});

/* ==========================================================================
   NARAZGI METER CONTROLLER
   ========================================================================== */
const slider = document.getElementById("anger-slider");
const scoreDisplay = document.getElementById("meter-score");
const reactionBadge = document.getElementById("meter-reaction-badge");
const reactionEmoji = document.getElementById("reaction-emoji");
const reactionText = document.getElementById("reaction-text");

function updateMeter(val) {
  scoreDisplay.textContent = `${val}% Gussa`;

  if (val >= 80) {
    reactionBadge.textContent = "Bohot Zyada Gussa 😭";
    reactionEmoji.textContent = "🥺";
    reactionText.textContent = "Itna gussa? Mera dil toot jayega Riddhi... thoda sa slide karke 0% par le aao na!";
  } else if (val >= 50) {
    reactionBadge.textContent = "Thoda Gussa Baki Hai 😤";
    reactionEmoji.textContent = "🥀";
    reactionText.textContent = "Chalo thoda gussa kam hua, par abhi bhi puri maafi nahi mili. Ek pyari smile de do na!";
  } else if (val >= 20) {
    reactionBadge.textContent = "Bas Thoda Nakhra 🫣";
    reactionEmoji.textContent = "🌸";
    reactionText.textContent = "Lagta hai meri Riddhi ab dheere dheere pighal rahi hai! Bas thoda sa aur left slide karo!";
  } else {
    reactionBadge.textContent = "Puri Tarah Maan Gayi! 🥰";
    reactionEmoji.textContent = "💖";
    reactionText.textContent = "Hayee! Ye hui na baat! Thank you so much Riddhi, tumhari hasi hi meri sabse badi khushi hai!";
  }
}

slider.addEventListener("input", (e) => {
  updateMeter(e.target.value);
});

/* ==========================================================================
   SHAYARI RENDER & INTERACTIONS
   ========================================================================== */
const grid = document.getElementById("shayari-grid");

function renderShayaris(filter = "all") {
  grid.innerHTML = "";
  const filtered = filter === "all" ? shayaris : shayaris.filter(s => s.category === filter);

  filtered.forEach(s => {
    const card = document.createElement("div");
    card.className = "shayari-card";
    card.innerHTML = `
      <div class="shayari-meta">
        <span class="shayari-category">${s.categoryLabel}</span>
      </div>
      <p class="shayari-lines">${s.lines}</p>
      <div class="shayari-actions">
        <div class="action-left">
          <button class="icon-btn" title="Sunao (Voice)" onclick="speakShayari('${encodeURIComponent(s.lines)}')">
            <i class="fa-solid fa-volume-high"></i>
          </button>
          <button class="icon-btn" title="Copy Shayari" onclick="copyShayari(this, '${encodeURIComponent(s.lines)}')">
            <i class="fa-regular fa-copy"></i>
          </button>
          <button class="icon-btn" title="Send on WhatsApp" onclick="shareWhatsApp('${encodeURIComponent(s.lines)}')">
            <i class="fa-brands fa-whatsapp"></i>
          </button>
        </div>
        <button class="like-counter-btn" onclick="likeShayari(this, ${s.id})">
          <i class="fa-solid fa-heart"></i>
          <span>${s.likes}</span>
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Filter chips click handling
const filterChips = document.querySelectorAll(".filter-chip");
filterChips.forEach(chip => {
  chip.addEventListener("click", () => {
    filterChips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    renderShayaris(chip.dataset.filter);
  });
});

renderShayaris("all");

// Speech narration
function speakShayari(encodedText) {
  const text = decodeURIComponent(encodedText);
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Voice synthesis is not supported on this browser.");
  }
}

// Copy to clipboard
function copyShayari(btn, encodedText) {
  const text = decodeURIComponent(encodedText);
  navigator.clipboard.writeText(text).then(() => {
    const originalIcon = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-check" style="color: #22c55e;"></i>`;
    setTimeout(() => {
      btn.innerHTML = originalIcon;
    }, 1500);
  });
}

// Direct WhatsApp share
function shareWhatsApp(encodedText) {
  const text = decodeURIComponent(encodedText);
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + "\n\n— Sirf tumhare liye Riddhi ❤️")}`;
  window.open(url, "_blank");
}

// Heart counter click
function likeShayari(btn, id) {
  const item = shayaris.find(s => s.id === id);
  if (item) {
    item.likes += 1;
    btn.querySelector("span").textContent = item.likes;
    btn.style.transform = "scale(1.2)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 200);
  }
}

/* ==========================================================================
   LOVE COUPONS WITH CONFIRMATION (Only 1 Allowed)
   ========================================================================== */
let couponRedeemed = false;
let pendingCoupon = null;

const couponModal = document.getElementById("coupon-modal");
const couponConfirmText = document.getElementById("coupon-confirm-text");
const confirmRedeemBtn = document.getElementById("confirm-redeem-btn");

function redeemCoupon(btn, title) {
  if (couponRedeemed) return;

  // Pending store karo aur popup kholo
  pendingCoupon = { btn, title };
  couponConfirmText.innerHTML = `Kya tum sach me <strong>"${title}"</strong> redeem karna chahti ho Riddhi? Sirf ek hi choose kar sakti ho! 😉`;
  couponModal.classList.add("active");
}

function closeCouponModal() {
  couponModal.classList.remove("active");
  pendingCoupon = null;
}

// Jab "Haan, Pakka!" par click kare tab finalize hoga
confirmRedeemBtn.addEventListener("click", () => {
  if (!pendingCoupon) return;

  couponRedeemed = true;
  const { btn, title } = pendingCoupon;
  const selectedCard = btn.closest(".coupon-item");
  
  selectedCard.classList.add("redeemed");
  btn.innerHTML = `<span>Redeemed! 🥰</span> <i class="fa-solid fa-check"></i>`;

  // Baaki sabhi lock kar do
  const allCards = document.querySelectorAll(".coupon-item");
  allCards.forEach(card => {
    if (card !== selectedCard) {
      card.classList.add("disabled");
      const otherBtn = card.querySelector(".redeem-btn");
      otherBtn.disabled = true;
      otherBtn.innerHTML = `<span>Locked 🔒</span>`;
    }
  });

  if (audioCtx) {
    playKalimbaNote(523.25);
  }

  closeCouponModal();
});

/* ==========================================================================
   DODGING "NAHI" BUTTON & CELEBRATION
   ========================================================================== */
const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const arena = document.getElementById("decision-arena");
const dodgeHint = document.getElementById("dodge-hint");
const modal = document.getElementById("celebration-modal");
const waReplyBtn = document.getElementById("whatsapp-reply-btn");

let dodgeCount = 0;
const funnyHints = [
  "Pakad ke dikhao pehle! 😜",
  "Arey re, button chhu bhi nahi payi! 😂",
  "Nahi wala button kaam hi nahi karega Riddhi! 💖",
  "Koshish achhi hai, par maanna hi padega! 🥰",
  "Bas 'Haan' par click kar do na ab! 🥺"
];

function moveNoButton() {
  dodgeCount++;
  const arenaRect = arena.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Calculate safe boundary inside the arena
  const maxX = arenaRect.width - btnRect.width - 20;
  const maxY = 80;

  const randomX = (Math.random() - 0.5) * maxX;
  const randomY = (Math.random() - 0.5) * maxY;

  noBtn.style.position = "relative";
  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

  dodgeHint.textContent = funnyHints[dodgeCount % funnyHints.length];
  dodgeHint.style.color = "var(--primary-glow)";
}

// Desktop hover & Mobile touch trigger dodge
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

// YES BUTTON CELEBRATION
yesBtn.addEventListener("click", () => {
  modal.classList.add("active");
  triggerConfettiBurst();
});

function closeModal() {
  modal.classList.remove("active");
}

waReplyBtn.addEventListener("click", () => {
  const message = encodeURIComponent("Haan baba, maan gayi! Website sach me bohot pyari banayi hai tumne! 🥰❤️");
  window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
});

// Visual Confetti burst
function triggerConfettiBurst() {
  for (let i = 0; i < 50; i++) {
    const burstHeart = new Particle();
    burstHeart.y = window.innerHeight / 2;
    burstHeart.x = window.innerWidth / 2;
    burstHeart.speedY = (Math.random() - 0.5) * 8;
    burstHeart.speedX = (Math.random() - 0.5) * 8;
    burstHeart.size = Math.random() * 14 + 10;
    particles.push(burstHeart);
  }
}