import { useState, useEffect } from "react";

function CalculateAge() {
  const [age, setAge] = useState(null);
  const [nextBirthday, setNextBirthday] = useState(null);
  
  const now = new Date();

  const year = 1000 * 60 * 60 * 24 * 365.25;
  const month = 1000 * 60 * 60 * 24 * 30.44;
  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;


  useEffect(() => {

    
  }, []);

  const calculateAge = (birth) => {
    const nextBirthdayDate = new Date(
      now.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );

    // اگر تولد امسال گذشته باشد، سال بعد را در نظر بگیرید
    if (nextBirthdayDate < now) {
      nextBirthdayDate.setFullYear(nextBirthdayDate.getFullYear() + 1);
    }

    const diff = now - birth;

    const years = Math.floor(diff / year);
    const months = Math.floor((diff % year) / month);
    const days = Math.floor((diff % month) / day);
    const hours = Math.floor((diff % day) / hour);
    const minutes = Math.floor((diff % hour) / minute);
    const seconds = Math.floor((diff % minute) / 1000);

    // محاسبه فاصله تا تاریخ تولد بعدی
    const nextDiff = nextBirthdayDate - now;
    const nextMonths = Math.floor((nextDiff % year) / month);
    const nextDays = Math.floor((nextDiff % month) / day);
    const nextHours = Math.floor((nextDiff % day) / hour);
    const nextMinutes = Math.floor((nextDiff % hour) / minute);
    const nextSeconds = Math.floor((nextDiff % minute) / 1000);

    setAge({ years, months, days, hours, minutes, seconds });
    setNextBirthday({
      nextMonths,
      nextDays,
      nextHours,
      nextMinutes,
      nextSeconds,
    });
  };

  return {
    age,
    calculateAge,
    setAge,
    nextBirthday,
  };
}
export default CalculateAge;
