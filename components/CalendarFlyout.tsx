"use client";

import { useState, useEffect } from "react";

interface CalendarFlyoutProps {
  visible: boolean;
  onClose: () => void;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function CalendarFlyout({ visible, onClose }: CalendarFlyoutProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [visible]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (visible) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [visible, onClose]);

  if (!visible) return null;

  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();
  const totalCells = startOffset + daysInMonth;
  const rows = Math.ceil(totalCells / 7);
  const grid: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) grid.push(null);
  for (let d = 1; d <= daysInMonth; d++) grid.push(d);

  return (
    <>
      <div className="calendar-flyout-overlay" aria-hidden onClick={onClose} />
      <div className="calendar-flyout" role="dialog" aria-label="Calendar">
        <div className="calendar-flyout-clock">
          <span className="calendar-flyout-time">
            {now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
          </span>
          <span className="calendar-flyout-date-long">
            {now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>
        <div className="calendar-flyout-calendar">
          <div className="calendar-flyout-month-header">
            {MONTHS[month]} {year}
          </div>
          <div className="calendar-flyout-weekdays">
            {WEEKDAYS.map((d) => (
              <span key={d} className="calendar-flyout-weekday">{d}</span>
            ))}
          </div>
          <div className="calendar-flyout-grid">
            {grid.map((d, i) => (
              <span
                key={i}
                className={`calendar-flyout-day ${d === today ? "today" : ""} ${d === null ? "empty" : ""}`}
              >
                {d ?? ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
