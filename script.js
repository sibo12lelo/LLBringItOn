const TIME_ZONE = "Africa/Johannesburg";
const EXAM_DATES = {
  first: new Date("2026-11-10T12:30:00+02:00"),
  last: new Date("2026-11-19T12:30:00+02:00"),
};

const dailyNotes = [
  {
    day: 10,
    tag: "FIRST PAPER · ADMIN LAW",
    message: "Baby, today is your day. You’ve put in the work(literal countless hours, even outworking me at times, lol); now take a deep breath, trust yourself, and take it one question at a time. I am so, so proud of you Nkhosikati yeMalangeni.",
    after: "Mhlanti, your very first final is behind you! I hope you can feel how proud I am of you. Take a breath, soften your shoulders, and let yourself celebrate this lovely, brave moment.",
    signoff: "I’m right here, Baby",
    afterSignoff: "Super proud of you Sthandwa sami",
  },
  {
    day: 11,
    tag: "ONE PAPER DOWN · BREATHE",
    message: "One paper is behind you; let that exhale all the way out. Today is for water, a proper snack, and a soft landing. Your clever brain has earned a little kindness, Baby.",
    signoff: "With all my love",
  },
  {
    day: 12,
    tag: "YOUR OWN PACE IS PERFECT",
    message: "Sthandwa, you don’t need to race anyone. One clear idea, one focused page, one little break at a time—that is more than enough. I believe in your way of doing things.",
    signoff: "Always in your corner",
  },
  {
    day: 13,
    tag: "A LITTLE FRIDAY REMINDER",
    message: "Today might be the hardest day for us, I'm unfortunately going home.(i might not look like it, but i'm really sad) Look at you though, still showing up and doing the work. That quiet determination is one of a thousand things I love about you. Keep going gently, sweetheart. You’re doing beautifully.",
    signoff: "Your biggest fan, always",
  },
  {
    day: 14,
    tag: "REST IS PART OF THE PLAN",
    message: "Mhlanti, let today hold a little fresh air, a favourite treat, and some guilt-free rest. You are allowed to pause. You are allowed to feel good. I adore you, every version of you.",
    signoff: "All my love, your Pickles",
  },
  {
    day: 15,
    tag: "SUNDAY, SOFTLY",
    message: "Babygirlllll, I hope you give yourself the same patience you give the people you love. A quiet reset is productive, too. No matter how today goes, you’ll never have to earn my belief in you.",
    signoff: "Forever on your team",
  },
  {
    day: 16,
    tag: "NEW WEEK, SAME BRILLIANT YOU",
    message: "New week, Mhlanti. Same bright mind, same brave heart, same person I’m ridiculously lucky to love(still can't believe my luck). You’ve already come such a long way baby, keep taking those little steps.",
    signoff: "Love you so much!",
  },
  {
    day: 17,
    tag: "YOU KNOW MORE THAN THE NERVES SAY",
    message: "If your nerves get loud today, sweetheart, remember: you know more than you think. You have earned every bit of confidence you’re borrowing right now. I’ll keep lending you mine if you need it.",
    signoff: "Always right here beside you",
  },
  {
    day: 18,
    tag: "TOMORROW, THE VERY LAST ONE",
    message: "Tomorrow is your last paper, Sthandwa! Today, trust what you’ve learned and leave a little room for rest(I know you won't though). I already admire you so much. The finish line is right there, my love.",
    signoff: "One more, then you're right there!",
  },
  {
    day: 19,
    tag: "LAST PAPER CIVIL PROCEDURE",
    message: "This is it baby, the last one. Walk in knowing that you have shown up through every day of this stretch. Read slowly, trust yourself, and remember that the person waiting to celebrate you already thinks you’re incredible.",
    after: "THAT’S IT BABY, you did it! Two big finals, one very brave heart, and a whole brilliant future ahead of you. LLB CONCLUDED AND STUFF!!!! I hope you’re taking the deepest breath of your life right now. I am so, so proud to call you mine.",
    signoff: "All my love, Sthandwa",
    afterSignoff: "Your very proud person and lover",
  },
];

const dateCells = document.querySelector("#date-cells");
const noteDayLabel = document.querySelector("#note-day-label");
const noteTag = document.querySelector("#note-tag");
const noteMessage = document.querySelector("#note-message");
const notePetname = document.querySelector("#note-petname");
const noteIndex = document.querySelector("#note-index");
const prevButton = document.querySelector("#prev-day");
const nextButton = document.querySelector("#next-day");
let selectedIndex = initialDayIndex();
const dayButtons = [];

function getLocalCalendarDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date());
  const get = (type) => Number(parts.find((part) => part.type === type).value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

function initialDayIndex() {
  const today = getLocalCalendarDate();
  if (today.year < 2026 || (today.year === 2026 && today.month < 11)) return 0;
  if (today.year === 2026 && today.month === 11) {
    return Math.min(9, Math.max(0, today.day - 10));
  }
  return 9;
}

function getNoteForToday(note) {
  const now = new Date();
  if (note.day === 10 && now >= EXAM_DATES.first) {
    return { tag: "FIRST PAPER · IN THE BAG", message: note.after, signoff: note.afterSignoff };
  }
  if (note.day === 19 && now >= EXAM_DATES.last) {
    return { tag: "FINALS COMPLETE · YOU DID IT!", message: note.after, signoff: note.afterSignoff };
  }
  return { tag: note.tag, message: note.message, signoff: note.signoff };
}

function createCalendar() {
  const novemberOffset = (new Date(Date.UTC(2026, 10, 1)).getUTCDay() + 6) % 7;
  const dayCount = 30;
  const cellCount = 42;

  for (let cell = 0; cell < cellCount; cell += 1) {
    const day = cell - novemberOffset + 1;
    const inMonth = day >= 1 && day <= dayCount;
    const cellDay = inMonth ? day : day < 1 ? 31 + day : day - dayCount;
    const cellMonth = inMonth ? "November" : day < 1 ? "October" : "December";
    const date = document.createElement(inMonth && day >= 10 && day <= 19 ? "button" : "div");
    date.className = `calendar-date${inMonth ? " in-month" : ""}`;
    if (date.tagName === "BUTTON") {
      date.type = "button";
      date.dataset.index = String(day - 10);
      date.classList.add("in-window");
      const note = dailyNotes[day - 10];
      date.setAttribute("aria-label", `${cellMonth} ${cellDay}, ${note.day === 10 ? "Administrative Law exam" : note.day === 19 ? "Civil Procedure exam" : "open the daily love note"}`);
      if (day === 10) date.classList.add("is-exam", "is-first");
      if (day === 19) date.classList.add("is-exam", "is-final");
      date.addEventListener("click", () => selectDay(day - 10));
      dayButtons.push(date);
    } else {
      date.setAttribute("aria-hidden", "true");
    }
    date.innerHTML = `<span class="date-number">${cellDay}</span>${inMonth && day >= 11 && day <= 18 ? '<i class="date-marker" aria-hidden="true"></i>' : ""}`;
    dateCells.append(date);
  }
}

function getDateLabel(day) {
  const date = new Date(Date.UTC(2026, 10, day, 12));
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric" })
    .format(date)
    .toUpperCase();
}

function selectDay(index) {
  selectedIndex = Math.max(0, Math.min(9, index));
  const note = dailyNotes[selectedIndex];
  const displayedNote = getNoteForToday(note);
  noteDayLabel.textContent = getDateLabel(note.day);
  noteTag.textContent = displayedNote.tag;
  noteMessage.textContent = displayedNote.message;
  notePetname.textContent = displayedNote.signoff;
  noteIndex.innerHTML = `${String(selectedIndex + 1).padStart(2, "0")} <i>/</i> 10`;
  prevButton.disabled = selectedIndex === 0;
  nextButton.disabled = selectedIndex === 9;

  const today = getLocalCalendarDate();
  const isNovember2026 = today.year === 2026 && today.month === 11;
  dayButtons.forEach((button, dayIndex) => {
    button.classList.toggle("is-selected", dayIndex === selectedIndex);
    button.setAttribute("aria-pressed", String(dayIndex === selectedIndex));
    button.classList.toggle("is-today", isNovember2026 && dailyNotes[dayIndex].day === today.day);
    const examAt = dayIndex === 0 ? EXAM_DATES.first : dayIndex === 9 ? EXAM_DATES.last : null;
    const isPast = examAt ? new Date() >= examAt : isNovember2026 && dailyNotes[dayIndex].day < today.day;
    button.classList.toggle("is-past", isPast);
  });
}

function formatTwoDigits(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  const nextTitle = document.querySelector("#countdown-title");
  const nextExam = document.querySelector("#countdown-exam");
  const nextDate = document.querySelector("#countdown-date");
  let target;

  if (now < EXAM_DATES.first) {
    target = EXAM_DATES.first;
    nextTitle.textContent = "Your first paper is almost here";
    nextExam.textContent = "ADMIN LAW";
    nextDate.textContent = "TUESDAY · 10 NOV · 12:30 SAST";
  } else if (now < EXAM_DATES.last) {
    target = EXAM_DATES.last;
    nextTitle.textContent = "One down, one to go, Sthandwa";
    nextExam.textContent = "CIVIL PROCEDURE";
    nextDate.textContent = "THURSDAY · 19 NOV · 12:30 SAST";
  } else {
    target = now;
    nextTitle.textContent = "Every final. Finished. So proud of you.";
    nextExam.textContent = "YOU DID IT!";
    nextDate.textContent = "NOW TAKE THAT BIG, WELL-EARNED BREATH";
  }

  const secondsLeft = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  document.querySelector("#countdown-days").textContent = formatTwoDigits(days);
  document.querySelector("#countdown-hours").textContent = formatTwoDigits(hours);
  document.querySelector("#countdown-minutes").textContent = formatTwoDigits(minutes);
  document.querySelector("#countdown-seconds").textContent = formatTwoDigits(seconds);
}

prevButton.addEventListener("click", () => selectDay(selectedIndex - 1));
nextButton.addEventListener("click", () => selectDay(selectedIndex + 1));

createCalendar();
selectDay(selectedIndex);
updateCountdown();
window.setInterval(updateCountdown, 1000);
