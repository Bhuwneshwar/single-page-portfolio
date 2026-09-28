const projects = [
  {
    title: "Android Agent",
    tag: "Android",
    lang: "JavaScript",
    href: "https://github.com/Bhuwneshwar/android-agent",
    blurb: "An AI agent aimed at Android. The companion MacroDroid agent is built to control the phone as a whole, and microdroid hooks reach the device from somewhere else."
  },
  {
    title: "File Manager for Android",
    tag: "Android",
    lang: "TypeScript",
    href: "https://github.com/Bhuwneshwar/file-manager-for-android",
    blurb: "A file manager for the phone. Point the server at the SD card — or /sdcard under Termux — and browse, move, and download from a browser UI."
  },
  {
    title: "rebyb YouTube Music",
    tag: "Media",
    lang: "JavaScript",
    href: "https://github.com/Bhuwneshwar/rebyb-yt-music",
    blurb: "YouTube audio that keeps playing in the background. A Node server in front of a small client, made to listen without keeping the video on screen."
  },
  {
    title: "Hajri Attendance",
    tag: "Web",
    lang: "JavaScript",
    href: "https://github.com/Bhuwneshwar/hajri-attendance",
    blurb: "Daily attendance for building-site labour. Hajri, the roll call, kept as a straightforward tool for the people actually on the job."
  },
  {
    title: "rebyb-redux",
    tag: "Web",
    lang: "TypeScript",
    href: "https://github.com/Bhuwneshwar/rebyb-redux",
    blurb: "A lightweight Redux-like store for React. Initial state, single dispatch, and multi-dispatch, with a small surface on purpose."
  },
  {
    title: "Termux ADB Fastboot",
    tag: "Tools",
    lang: "Shell",
    href: "https://github.com/Bhuwneshwar/termux-adb-fastboot",
    blurb: "ADB, Fastboot, and Wi-Fi ADB packaged so they run inside Termux."
  },
  {
    title: "AI Interview Ace",
    tag: "AI",
    lang: "TypeScript",
    href: "https://github.com/Bhuwneshwar/Ai-Interview-Ace",
    blurb: "Practice an HR interview with an AI interviewer instead of waiting for a person to run the questions."
  },
  {
    title: "Multiple AI Agents",
    tag: "AI",
    lang: "TypeScript",
    href: "https://github.com/Bhuwneshwar/multiple-ai-agent-for-free-with-tools-calling",
    blurb: "Several agents in one place, with tool calling, aimed at running without a paid model stack."
  },
  {
    title: "rebyb LLMs",
    tag: "AI",
    lang: "JavaScript",
    href: "https://github.com/Bhuwneshwar/rebyb-llms",
    blurb: "A route to free language models that can be used from more than one place."
  },
  {
    title: "Silence Cutter",
    tag: "Media",
    lang: "JavaScript",
    href: "https://github.com/Bhuwneshwar/rebyb-audio-video-editor",
    blurb: "Cuts the silent stretches out of audio and video so the kept parts sit next to each other."
  },
  {
    title: "Ecommerce",
    tag: "Web",
    lang: "TypeScript",
    href: "https://github.com/Bhuwneshwar/ecommerce-site-next",
    blurb: "A full ecommerce site built with Next.js and TypeScript."
  },
  {
    title: "Zego Video Call",
    tag: "Web",
    lang: "TypeScript",
    href: "https://github.com/Bhuwneshwar/zego-video-call",
    blurb: "A video-call app. There is also a separate Node WebRTC server in video-call-nodejs."
  },
  {
    title: "Blog Maker",
    tag: "Web",
    lang: "JavaScript",
    href: "https://github.com/Bhuwneshwar/blog-maker",
    blurb: "Make a post by picking elements and saving them. A small builder, not a full CMS."
  },
  {
    title: "Passkey Authentication",
    tag: "Web",
    lang: "HTML",
    href: "https://github.com/Bhuwneshwar/passkey-authentication",
    blurb: "Experiments with passkeys, next to other tries at fingerprint, face unlock, and more than one login method."
  },
  {
    title: "Chat with Gemini",
    tag: "AI",
    lang: "TypeScript",
    href: "https://github.com/Bhuwneshwar/chat-with-gemini",
    blurb: "A chat UI pointed at Gemini, plus a smaller Gemini question API in try-gamini."
  },
  {
    title: "MacroDroid Agent",
    tag: "Android",
    lang: "JavaScript",
    href: "https://github.com/Bhuwneshwar/macrodroid-agent",
    blurb: "Control the Android system through MacroDroid, so automations on the phone can be driven from outside it."
  }
];

const list = document.querySelector("#list");
const empty = document.querySelector("#empty");
const count = document.querySelector("#count");
const search = document.querySelector("#q");
const chips = [...document.querySelectorAll(".chip")];

let filter = "All";
let openId = null;

function matches(project) {
  const q = search.value.trim().toLowerCase();
  const inFilter = filter === "All" || project.tag === filter;
  if (!inFilter) return false;
  if (!q) return true;
  return (project.title + " " + project.blurb + " " + project.lang + " " + project.tag)
    .toLowerCase()
    .includes(q);
}

function render() {
  const shown = projects.filter(matches);
  count.textContent = shown.length + (shown.length === 1 ? " project" : " projects");
  list.replaceChildren();

  if (!shown.length) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  shown.forEach((project, i) => {
    const id = project.href;
    const isOpen = openId === id;
    const item = document.createElement("article");
    item.className = "item";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "row-btn";
    btn.dataset.id = id;
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");

    const index = document.createElement("span");
    index.className = "index";
    index.textContent = String(i + 1).padStart(2, "0");

    const title = document.createElement("span");
    title.className = "row-title";
    title.textContent = project.title;

    const meta = document.createElement("span");
    meta.className = "meta";
    meta.textContent = project.tag + " · " + project.lang;

    btn.append(index, title, meta);
    btn.addEventListener("click", () => {
      openId = openId === id ? null : id;
      render();
      const next = list.querySelector('[data-id="' + CSS.escape(id) + '"]');
      if (next) next.focus();
    });

    const panel = document.createElement("div");
    panel.className = "panel";
    const inner = document.createElement("div");
    inner.className = "panel-inner";
    const body = document.createElement("div");
    body.className = "panel-body";
    const blurb = document.createElement("p");
    blurb.className = "blurb";
    blurb.textContent = project.blurb;
    const link = document.createElement("a");
    link.className = "repo";
    link.href = project.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = project.href.replace("https://", "");
    body.append(blurb, link);
    inner.append(body);
    panel.append(inner);

    item.append(btn, panel);
    list.append(item);
    if (isOpen) requestAnimationFrame(() => item.classList.add("is-open"));
  });
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filter = chip.dataset.filter;
    chips.forEach((c) => {
      const on = c === chip;
      c.classList.toggle("is-on", on);
      c.setAttribute("aria-selected", on ? "true" : "false");
    });
    openId = null;
    render();
  });
});

search.addEventListener("input", () => {
  openId = null;
  render();
});

function tick() {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Asia/Kolkata"
  }).format(now);
  const clock = document.querySelector("#clock");
  clock.textContent = time + " IST";
  clock.setAttribute("datetime", now.toISOString());
}

openId = projects[0].href;
tick();
setInterval(tick, 10000);
render();
