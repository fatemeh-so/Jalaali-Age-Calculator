import { useReducer } from "react";
import moment from "moment-jalaali";

function ageReducer(state, action) {
  switch (action.type) {
    case "SET_AGE":
      return { ...state, age: action.payload };
    case "SET_NEXT_BIRTHDAY":
      return { ...state, nextBirthday: action.payload };
    default:
      return state;
  }
}
function CalculateAge() {
  const [state, dispatch] = useReducer(ageReducer, {
    age: null,
    nextBirthday: null,
  });

  const calculateAge = (date) => {
    const currentDateTime = moment();
    const birthDate = moment(date, "jYYYY-jMM-jDD HH:mm:ss");
    const duration = moment.duration(currentDateTime.diff(birthDate));

    const age = {
      years: duration?.years(),
      months: duration?.months(),
      days: duration?.days(),
      hours: duration?.hours(),
      minutes: duration?.minutes(),
      seconds: duration?.seconds(),
    };

    dispatch({ type: "SET_AGE", payload: age });

    const nextBirthday = moment(date, "jYYYY-jMM-jDD HH:mm:ss").add(
      duration?.years() + 1,
      "year"
    );
    const durationNextYear = moment.duration(
      nextBirthday.diff(currentDateTime)
    );
    console.log(durationNextYear);

    const nextBirthdayInfo = {
      nextMonths: durationNextYear?.months(),
      nextDays: durationNextYear?.days(),
      nextHours: durationNextYear?.hours(),
      nextMinutes: durationNextYear?.minutes(),
      nextSeconds: durationNextYear?.seconds(),
    };

    dispatch({
      type: "SET_NEXT_BIRTHDAY",
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
