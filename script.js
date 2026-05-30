// Масив змін (час + ім’я)
const shifts = [
  { name: "Ярослав", time: "00:00 – 02:30" },
  { name: "Ярослав", time: "02:32 – 05:02" },
  { name: "Ярослав", time: "05:05 – 07:35" },
  { name: "Ваня", time: "07:38 – 10:08" },
  { name: "Дмитро", time: "10:10 – 12:40" },
  { name: "Ярослав", time: "12:43 – 15:13" },
  { name: "Дмитро", time: "15:15 – 17:45" },
  { name: "Ярослав", time: "17:48 – 20:18" },
  { name: "Дмитро", time: "20:20 – 22:50" },
  { name: "Ярослав", time: "22:53 – 00:00" }
];

// Масив дат червня (1–28)
const juneDates = [
  { dayNumber: 1, weekDay: 1, active: true },
  { dayNumber: 2, weekDay: 2, active: true },
  { dayNumber: 3, weekDay: 3, active: true },
  { dayNumber: 4, weekDay: 4, active: true },
  { dayNumber: 5, weekDay: 5, active: true },
  { dayNumber: 6, weekDay: 6, active: true },
  { dayNumber: 7, weekDay: 0, active: true },
  { dayNumber: 8, weekDay: 1, active: false },
  { dayNumber: 9, weekDay: 2, active: false },
  { dayNumber: 10, weekDay: 3, active: false },
  { dayNumber: 11, weekDay: 4, active: false },
  { dayNumber: 12, weekDay: 5, active: false },
  { dayNumber: 13, weekDay: 6, active: false },
  { dayNumber: 14, weekDay: 0, active: false },
  { dayNumber: 15, weekDay: 1, active: false },
  { dayNumber: 16, weekDay: 2, active: false },
  { dayNumber: 17, weekDay: 3, active: false },
  { dayNumber: 18, weekDay: 4, active: false },
  { dayNumber: 19, weekDay: 5, active: false },
  { dayNumber: 20, weekDay: 6, active: false },
  { dayNumber: 21, weekDay: 0, active: false },
  { dayNumber: 22, weekDay: 1, active: false },
  { dayNumber: 23, weekDay: 2, active: false },
  { dayNumber: 24, weekDay: 3, active: false },
  { dayNumber: 25, weekDay: 4, active: false },
  { dayNumber: 26, weekDay: 5, active: false },
  { dayNumber: 27, weekDay: 6, active: false },
  { dayNumber: 28, weekDay: 0, active: false }
];

// Назви днів
function getDayName(day) {
  const days = {
    1: "Понеділок",
    2: "Вівторок",
    3: "Середа",
    4: "Четвер",
    5: "П'ятниця",
    6: "Субота",
    0: "Неділя"
  };
  return days[day];
}

// Генерація календаря
function generateCalendar() {
  const tbody = document.getElementById("calendar-body");
  tbody.innerHTML = "";

  let index = 0;
  for (let week = 0; week < 4; week++) {
    const row = document.createElement("tr");
    for (let d = 1; d <= 7; d++) {
      if (index < juneDates.length) {
        const dateObj = juneDates[index];
        const cell = document.createElement("td");
        cell.textContent = dateObj.dayNumber;
        cell.dataset.day = dateObj.weekDay;

        if (dateObj.active) {
          cell.classList.add("clickable");
          cell.addEventListener("click", () => {
            document.querySelectorAll(".calendar td").forEach(c => c.classList.remove("active"));
            cell.classList.add("active");
            renderSchedule(dateObj.weekDay);
          });
        } else {
          cell.classList.add("disabled");
        }

        row.appendChild(cell);
        index++;
      }
    }
    tbody.appendChild(row);
  }
}

// Відображення графіка
function renderSchedule(day) {
  const tbody = document.getElementById("schedule-body");
  tbody.innerHTML = "";
  shifts.forEach((shift, index) => {
    const row = document.createElement("tr");
    if (index === 0) {
      row.innerHTML = `<td rowspan="${shifts.length}">${getDayName(day)}</td>
                       <td>${shift.time}</td>
                       <td>${shift.name}</td>`;
    } else {
      row.innerHTML = `<td>${shift.time}</td><td>${shift.name}</td>`;
    }
    tbody.appendChild(row);
  });

  // показати таблицю з анімацією
  document.querySelector(".schedule").classList.add("show");
}

// Ініціалізація при завантаженні сторінки
window.addEventListener("DOMContentLoaded", generateCalendar);
