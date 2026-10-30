(() => {
  "use strict";
  const terminalScreen = document.getElementById("terminal-screen");
  const birthdaySite = document.getElementById("birthday-site");
  const terminalOutput = document.getElementById("terminal-output");
  const enterButton = document.getElementById("enter-button");
  const enterLabel = document.getElementById("enter-label");
  const progressLabel = document.getElementById("progress-label");
  const toast = document.getElementById("toast");
  const confettiLayer = document.getElementById("confetti-layer");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const lines = [
    "> Booting PROJECT_POORNIMA.exe <span class='ok'>[OK]</span>",
    "> Establishing secure connection with: <span class='ok'>POORNIMA</span>",
    "> Searching database for the world's best sister...",
    "> Result found: <span class='ok'>ONE OF A KIND</span>",
    "> Loading birthday magic <span class='ok'>[DONE]</span>",
    "> Compiling appreciation that is long overdue <span class='ok'>[DONE]</span>",
    "> Warning: affection levels are dangerously high <span class='warning'>[UNCONTAINABLE]</span>",
    "> Birthday protocol ready. This one is all for you. <span class='ok'>♥</span>"
  ];
  let opened = false;
  let audioContext = null;
  let soundEnabled = false;
  let toastTimer;

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, reduceMotion ? 0 : ms));

  async function runTerminal() {
    terminalOutput.innerHTML = "";
    enterButton.disabled = true;
    enterLabel.textContent = "INITIALIZING...";
    progressLabel.textContent = "RUNNING BIRTHDAY_PROTOCOL";
    for (let i = 0; i < lines.length; i++) {
      const row = document.createElement("div");
      row.className = "terminal-line";
      row.innerHTML = lines[i];
      terminalOutput.appendChild(row);
      await wait(430);
    }
    progressLabel.textContent = "AUTHORIZATION REQUIRED";
    enterButton.disabled = false;
    enterLabel.textContent = "ENTER THE SURPRISE";
    enterButton.classList.add("reveal-in");
  }

  function openSite() {
    if (opened) return;
    opened = true;
    terminalScreen.classList.add("hidden");
    birthdaySite.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    document.querySelectorAll(".hero-copy,.hero-art,.stats-strip,.appreciation-inner,.finale").forEach((el, i) => {
      el.style.animationDelay = `${Math.min(i * 70, 350)}ms`;
      el.classList.add("reveal-in");
    });
    setTimeout(() => showToast("ACCESS GRANTED. HAPPY BIRTHDAY, POORNIMA. ♥"), 500);
    launchConfetti(95);
  }

  enterButton.addEventListener("click", openSite);
  document.getElementById("skip-intro").addEventListener("click", openSite);
  runTerminal();

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
  }

  function launchConfetti(count = 70) {
    const colors = ["#9dffb2", "#ff9bcf", "#fff0b5", "#a7dfff", "#c9b3ff"];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.borderRadius = Math.random() > .5 ? "50%" : "1px";
      piece.style.setProperty("--fall", `${2.4 + Math.random() * 3.4}s`);
      piece.style.setProperty("--drift", `${(Math.random() - .5) * 240}px`);
      piece.style.setProperty("--spin", `${Math.random() * 1000 + 180}deg`);
      piece.style.animationDelay = `${Math.random() * .8}s`;
      confettiLayer.appendChild(piece);
      piece.addEventListener("animationend", () => piece.remove(), { once: true });
    }
  }

  document.getElementById("open-appreciation").addEventListener("click", () => {
    document.getElementById("appreciation").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    showToast("A LITTLE REMINDER: YOU ARE APPRECIATED, POORNIMA. ♥");
  });

  document.getElementById("celebrate-button").addEventListener("click", () => {
    launchConfetti(75);
    showToast("CELEBRATION.EXE RUNNING — MAKE A WISH, POORNIMA ✨");
    playChime();
  });
  document.getElementById("final-celebrate").addEventListener("click", () => {
    launchConfetti(150);
    showToast("NEW ACHIEVEMENT UNLOCKED: LOVED BEYOND WORDS. ♥");
    playChime();
  });
// Optional soft chime, generated locally. No audio file or network request is needed.
  function playChime() {
    if (!soundEnabled) return;
    try {
      audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
      const now = audioContext.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(.0001, now + i * .13);
        gain.gain.exponentialRampToValueAtTime(.08, now + i * .13 + .025);
        gain.gain.exponentialRampToValueAtTime(.0001, now + i * .13 + .45);
        osc.connect(gain); gain.connect(audioContext.destination);
        osc.start(now + i * .13); osc.stop(now + i * .13 + .48);
      });
    } catch (err) { console.info("Audio playback is unavailable in this browser."); }
  }

  document.getElementById("sound-toggle").addEventListener("click", async (event) => {
    soundEnabled = !soundEnabled;
    const button = event.currentTarget;
    button.setAttribute("aria-pressed", String(soundEnabled));
    document.getElementById("sound-label").textContent = soundEnabled ? "SOUND ON" : "SOUND OFF";
    if (soundEnabled) {
      try {
        audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
        if (audioContext.state === "suspended") await audioContext.resume();
      } catch (err) { soundEnabled = false; }
      playChime();
      showToast(soundEnabled ? "SOUND ENABLED — A LITTLE CHIME FOR YOU. ♫" : "SOUND UNAVAILABLE IN THIS BROWSER.");
    } else {
      showToast("SOUND MUTED.");
    }
  });

  // Small keyboard shortcut: Enter triggers the intro reveal when it is ready.
  document.addEventListener("keydown", (event) => {
    if (!opened && (event.key === "Enter" || event.key === " ")) {
      if (!enterButton.disabled) { event.preventDefault(); openSite(); }
    }
  });

  // Cursor glow on devices that have a fine pointer.
  if (window.matchMedia("(pointer:fine)").matches) {
    const glow = document.querySelector(".cursor-glow");
    glow.style.display = "block";
    window.addEventListener("pointermove", (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }
})();