import "./index.css";
import "jalaali-react-date-picker/lib/styles/index.css";
import { DatePicker } from "jalaali-react-date-picker";
import { useReducer, useEffect } from "react";
import Result from "./componets/result";
import moment from "moment-jalaali";
import CalculateAge from "./logic/caculateAge";
import Input from "./componets/input";
import NextBirthDayResult from "./componets/nextBirthDayResult";
import ShamsiAndMiladiBirthDate from "./componets/shamsiAndMiladiBirthDate";
import toast, { Toaster } from "react-hot-toast";
// import Test from "./componets/test";

// Define initial state
const initialState = {
  birthDate: null,
  manualBirthDate: "",
  isCalculated: false,
};

// Define reducer function
function reducer(state, action) {
  switch (action.type) {
    case "SET_BIRTH_DATE":
      return {
        ...state,
        birthDate: action.payload,
      };
    case "SET_MANUAL_BIRTH_DATE":
      return {
        ...state,
        manualBirthDate: action.payload,
      };
    case "SET_IS_CALCULATED":
      return {
        ...state,
        isCalculated: action.payload,
      };
    default:
      return state;
  }
}

function App() {
  const date = new Date();

  // UseReducer instead of useState
  const [state, dispatch] = useReducer(reducer, initialState);

  const { birthDate, manualBirthDate, isCalculated } = state;

  // calculateAge function
  const { age, calculateAge, nextBirthday } = CalculateAge();

  console.log("next", birthDate);

  // change input when datePicker change
  const handleManualInput = () => {
    const parsedDate = moment(manualBirthDate, "jYYYY/jMM/jDD", true);

    if (parsedDate > date) {
      dispatch({ type: "SET_IS_CALCULATED", payload: false });
      toast("تاریخ صحیح را وارد کنید");
      return null;
    }
    if (birthDate > date) {
      dispatch({ type: "SET_IS_CALCULATED", payload: false });
      toast("تاریخ صحیح را وارد کنید");
      return null;
    }
    dispatch({ type: "SET_IS_CALCULATED", payload: true });
    if (manualBirthDate) {
      const validDate = parsedDate.isValid();

      if (validDate) {
        dispatch({ type: "SET_BIRTH_DATE", payload: parsedDate });
        calculateAge(parsedDate.toDate());
      } else {
        alert("لطفاً تاریخ را در فرمت صحیح وارد کنید: xxxx/xx/xx");
      }
    }
  };

  const handleDatePickerChange = (date) => {
    dispatch({ type: "SET_BIRTH_DATE", payload: date });
    dispatch({
      type: "SET_MANUAL_BIRTH_DATE",
      payload: date.format("jYYYY/jMM/jDD"),
    });
    console.log("next", birthDate);
  };

  useEffect(() => {
    // Call calculateAge every second
    const interval = setInterval(() => {
      if (isCalculated) handleManualInput();
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [date, isCalculated]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full  mt-[2rem]">
      <h1 className="text-3xl font-semibold py-6">محاسبه سن</h1>

      {/* DatePicker */}
      <DatePicker value={birthDate} onChange={handleDatePickerChange} />

      {/* input */}
      <Input
        manualBirthDate={manualBirthDate}
        setManualBirthDate={(val) =>
          dispatch({ type: "SET_MANUAL_BIRTH_DATE", payload: val })
        }
        handleManualInput={handleManualInput}
      />
      <button onClick={handleManualInput} className="calculate-button">
        محاسبه سن
      </button>

      {/* result of calculate age */}
      <div className="flex flex-col gap-4 py-4">
        {age && <Result age={age} />}
        {nextBirthday && <NextBirthDayResult nextBirthday={nextBirthday} />}
        {age && nextBirthday && (
          <ShamsiAndMiladiBirthDate
            shamsi={manualBirthDate}
            miladi={birthDate}
          />
        )}
      </div>

      <Toaster
        position="bottom-left"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            zIndex: 50,
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </div>
  );
}

export default App;
