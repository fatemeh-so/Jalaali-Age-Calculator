import { useReducer } from "react";
import moment from "moment-jalaali";

// تعریف اکشن‌ها
const AGE_ACTIONS = {
  SET_AGE: "SET_AGE",
  SET_NEXT_BIRTHDAY: "SET_NEXT_BIRTHDAY",
};

// تابع ریدوسر
function ageReducer(state, action) {
  switch (action.type) {
    case AGE_ACTIONS.SET_AGE:
      return { ...state, age: action.payload };
    case AGE_ACTIONS.SET_NEXT_BIRTHDAY:
      return { ...state, nextBirthday: action.payload };
    default:
      return state;
  }
}

function CalculateAge() {
  // استفاده از useReducer به جای useState
  const [state, dispatch] = useReducer(ageReducer, {
    age: null,
    nextBirthday: null,
  });

  const calculateAge = (date) => {
    const currentDateTime = moment(); // تاریخ فعلی
    const birthDate = moment(date, "jYYYY-jMM-jDD HH:mm:ss"); // تاریخ تولد
    const duration = moment.duration(currentDateTime.diff(birthDate));

    // تنظیم سن
    const age = {
      years: duration?.years(),
      months: duration?.months(),
      days: duration?.days(),
      hours: duration?.hours(),
      minutes: duration?.minutes(),
      seconds: duration?.seconds(),
    };

    dispatch({ type: AGE_ACTIONS.SET_AGE, payload: age });

    // محاسبه تولد سال بعد
    const nextBirthday = moment(date, "jYYYY-jMM-jDD HH:mm:ss").add(
      age.years + 1,
      "year"
    );
    const durationNextYear = moment.duration(
      nextBirthday.diff(currentDateTime)
    );

    const nextBirthdayInfo = {
      nextMonths: durationNextYear?.months(),
      nextDays: durationNextYear?.days(),
      nextHours: durationNextYear?.hours(),
      nextMinutes: durationNextYear?.minutes(),
      nextSeconds: durationNextYear?.seconds(),
    };

    dispatch({
      type: AGE_ACTIONS.SET_NEXT_BIRTHDAY,
      payload: nextBirthdayInfo,
    });

    console.log("تولد سال بعد:", nextBirthday);
  };

  return {
    age: state.age,
    nextBirthday: state.nextBirthday,
    calculateAge,
  };
}

export default CalculateAge;
