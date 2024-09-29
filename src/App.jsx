import "./index.css";
import "jalaali-react-date-picker/lib/styles/index.css";
import { DatePicker } from "jalaali-react-date-picker";
import { useReducer, useEffect } from "react";
import moment from "moment-jalaali";
import CalculateAge from "./logic/caculateAge";
import MyInput from "./componets/input";
import toast, { Toaster } from "react-hot-toast";
import Test from "./componets/test";
import { Button } from "@nextui-org/button";
import { InputDatePicker } from "jalaali-react-date-picker";

// Define initial state
const initialState = {
  birthDate: null,
  manualBirthDate: "",
  isCalculated: false,
  IsModal: false,
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
    case "SET_IS_MODAL":
      return {
        ...state,
        IsModal: action.payload,
      };
    default:
      return state;
  }
}

function App() {
  const date = new Date();

  const [state, dispatch] = useReducer(reducer, initialState);

  const { birthDate, manualBirthDate, isCalculated, IsModal } = state;

  // calculateAge function
  const { age, calculateAge, nextBirthday } = CalculateAge();

  // change input when datePicker change
  const handleManualInput = () => {
    const parsedDate = moment(manualBirthDate, "jYYYY/jMM/jDD", true);
    console.log("jjj", parsedDate);
    // if userDataPicker is null then send error
    if (!parsedDate.isValid()) {
      dispatch({ type: "SET_IS_CALCULATED", payload: false });
      toast("تاریح را وارد کنید");
      return null;
    }

    // if userDataPicker more than now.Date then send error
    if (parsedDate.n >= date) {
      dispatch({ type: "SET_IS_CALCULATED", payload: false });
      toast("تاریخ صحیح را وارد کنید");
      return null;
    } // if userDataPicker more than now.Date then send error
    if (birthDate >= date) {
      dispatch({ type: "SET_IS_CALCULATED", payload: false });
      toast("تاریخ صحیح را وارد کنید");
      return null;
    }
    // if userDataPicker is toady then send error

    if (moment().isSame(parsedDate, "day")) {
      toast("تاریخ انتخاب شده امروز است!");
      return; // Exit early if today
    }

    dispatch({ type: "SET_IS_CALCULATED", payload: true });
    if (manualBirthDate) {
      const validDate = parsedDate.isValid();

      if (validDate) {
        dispatch({ type: "SET_BIRTH_DATE", payload: parsedDate });
        dispatch({ type: "SET_IS_MODAL", payload: true });

        calculateAge(parsedDate.toDate());
      } else {
        alert("لطفاً تاریخ را در فرمت صحیح وارد کنید: xxxx/xx/xx");
      }
    }
  };

  const handleDatePickerChange = (date) => {
    console.log(date);
    dispatch({ type: "SET_BIRTH_DATE", payload: date });
    dispatch({
      type: "SET_MANUAL_BIRTH_DATE",
      payload: date.format("jYYYY/jMM/jDD"),
    });
  };

  useEffect(() => {
    // Call calculateAge every second
    const interval = setInterval(() => {
      if (isCalculated) handleManualInput();
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [date, isCalculated]);

  return (
    <div
      dir="rtl"
      className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-t from-white to-blue-100 text-blue-900"
    >
      <h1 className="w-full max-w-[30rem] text-center text-4xl font-bold py-6 border-b-4 border-blue-400">
        محاسبه سن
      </h1>

      {/* DatePicker */}
      <div className="w-full h-full  flex flex-col items-center justify-center gap-6 py-12">
        
        <DatePicker
          className="bg-blue-200 border border-blue-400 rounded-md shadow-md px-4 py-2"
          value={birthDate}
          onChange={handleDatePickerChange}
        />
        {/* <InputDatePicker /> */}
        {/* Input */}
        <MyInput
          manualBirthDate={manualBirthDate}
          dispatch={dispatch}
          setManualBirthDate={(val) => {
            dispatch({ type: "SET_MANUAL_BIRTH_DATE", payload: val });
          }}
        />

        <Button
          color="primary"
          onClick={handleManualInput}
          className="bg-gradient-to-r from-pink-500 to-red-400 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          محاسبه سن
        </Button>
      </div>

      {IsModal && (
        <Test
          handleManualInput={handleManualInput}
          dispatch={dispatch}
          age={age}
          nextBirthday={nextBirthday}
          shamsi={manualBirthDate}
          miladi={birthDate}
        />
      )}

      <Toaster
        position="bottom-right"
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
            fontFamily:
              "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
            zIndex: 50,
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#f6e7f6",
            color: "#0b225f",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "1px solid #ee1cee",
          
          },
        }}
      />
    </div>
  );
}

export default App;
