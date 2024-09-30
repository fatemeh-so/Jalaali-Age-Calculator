import { useState } from "react";
import moment from "moment-jalaali";
function CalculateAge() {
  const [age, setAge] = useState(null);
  const [nextBirthday, setNextBirthday] = useState(null);

  const calculateAge = (date) => {
    var currentDateTime = moment();
    var bithrDate = moment(date, "jYYYY-jMM-jDD HH:mm:ss");
    var duration = moment.duration(currentDateTime.diff(bithrDate));

    // console.log("تفاوت:", duration);

    setAge({
      years: duration?._data?.years,
      months: duration?._data?.months,
      days: duration?._data?.days,
      hours: duration?._data?.hours,
      minutes: duration?._data?.minutes,
      seconds: duration?._data?.seconds,
    });

    // const nextYear = currentDateTime.add(1, "year");
    const nextBirthday = moment(date, "jYYYY-jMM-jDD HH:mm:ss").add(
      age.years + 1,
      "year"
    );
    const durationNextYear = moment.duration(
      nextBirthday.diff(currentDateTime)
    );
    console.log("تفاوت:", bithrDate, nextBirthday,durationNextYear);
    setNextBirthday({
      nextMonths: durationNextYear?._data?.months,
      nextDays: durationNextYear?._data?.days,
      nextHours: durationNextYear?._data?.hours,
      nextMinutes: durationNextYear?._data?.minutes,
      nextSeconds: durationNextYear?._data?.seconds,
    });
    console.log(nextBirthday);
  };

  return {
    age,
    calculateAge,
    nextBirthday,
  };
}

export default CalculateAge;
