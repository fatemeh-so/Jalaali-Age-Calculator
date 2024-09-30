import { useState } from "react";
import moment from "moment-jalaali";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
function CalculateAge() {
  const [age, setAge] = useState(null);
  const [nextBirthday, setNextBirthday] = useState(null);

  const calculateAge = (date) => {
    const now = new DateObject({ calendar: persian });
    console.log("bhbh", date, now.format());
    // اگر تاریخ ورودی جلالی است
    const birth = new DateObject(date, { calendar: persian });
console.log("birth", birth.day,now.day,now.day - birth.day); 
    let years = now.year - birth.year;
    let months = now.month - birth.month;
    let days = Math.abs(now.day - birth.day)
    let hours = now.hour - birth.hour;
    let minutes = now.minute - birth.minute;
    let seconds = now.second - birth.second;

    if (days < 0) {
      months--;
      const lastMonth = new DateObject(birth.year, birth.month - 1, 1, {
        calendar: persian,
      });
      days += lastMonth.daysInMonth;
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const nextBirthdayDate = new DateObject({
      year: now.year + 1,
      month: birth.month,
      day: birth.day,
      calendar: persian,
    });
    const next = new DateObject(nextBirthdayDate, { calendar: persian });

    let nextMonths = months == 0 ? 11 : months - 12;
    let nextDays =
      (months == 1) |
      (months == 2) |
      (months == 3) |
      (months == 4) |
      (months == 5) |
      (months == 6)
        ? days - 31
        : days - 30;
    let nextHours = hours - 24;
    let nextMinutes = minutes - 60;
    let nextSeconds = seconds - 60;

    setAge({ years, months, days, hours, minutes, seconds });
    setNextBirthday({
      nextMonths,
      nextDays,
      nextHours,
      nextMinutes,
      nextSeconds,
    });
    console.log(nextBirthday);
  };

  return {
    age,
    calculateAge,
    setAge,
    nextBirthday,
  };
}

export default CalculateAge;
