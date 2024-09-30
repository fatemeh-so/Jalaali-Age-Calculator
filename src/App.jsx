import "./index.css";
import "jalaali-react-date-picker/lib/styles/index.css";
import { useReducer, useEffect, useState } from "react";
import moment from "moment-jalaali";
import CalculateAge from "./logic/caculateAge";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@nextui-org/button";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"; // تقویم شمسی
import persian_fa from "react-date-object/locales/persian_fa"; // زبان فارسی
import ResultModal from "./componets/resultModal";
import DateObject from "react-date-object";

// Define initial state
const initialState = {
  birthDate: null,
  manualBirthDate: "",
  isCalculated: false,
  IsModal: false,
  momentDate: null,
};

// Define reducer function
function reducer(state, action) {
  switch (action.type) {
    case "SET_BIRTH_DATE":
      return {
        ...state,
        birthDate: action.payload,
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
    case "SET_MOMENT":
      return {
        ...state,
        momentDate: action.payload,
      };
    default:
      return state;
  }
}

function App() {
  const date = new Date();

  const [state, dispatch] = useReducer(reducer, initialState);

  const { birthDate, isCalculated, IsModal, momentDate } = state;

  // calculateAge function
  const { age, calculateAge, nextBirthday } = CalculateAge();
  const convertedDate = moment(
    convertPersianToEnglish(birthDate),
    "jYYYY/jMM/jDD"
  ).toDate();
  const now = new Date();
  const nowLimit = new DateObject({ date: now, calendar: persian }).format();

  function convertPersianToEnglish(persianNumber) {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    return persianNumber?.replace(
      /[۰-۹]/g,
      (digit) => englishDigits[persianDigits?.indexOf(digit)]
    );
  }

  const handelCalculateAge = () => {
    // if userDataPicker more than now.Date then send error
    if (!birthDate) {
      dispatch({ type: "SET_IS_CALCULATED", payload: false });
      toast("تاریح را وارد کنید");
      return null;
    }

    // Check if the birth date is in the future
    if (convertedDate >= now.setHours(0, 0, 0, 0)) {
      dispatch({ type: "SET_IS_CALCULATED", payload: false });
      toast("تاریخ تولد نمی‌تواند برابر یا پس از امروز باشد");
      return;
    }

    if (convertPersianToEnglish(birthDate.slice(0, 4)) < "1300") {
      dispatch({ type: "SET_IS_CALCULATED", payload: false });
      toast("تاریخ تولد نمی‌تواند کمتر از سال ۱۳۰۰ باشد");
      return;
    }

    dispatch({ type: "SET_IS_CALCULATED", payload: true });
    dispatch({ type: "SET_IS_MODAL", payload: true });
    calculateAge(convertPersianToEnglish(birthDate));
  };

  const handleDatePickerChange = (date) => {
    dispatch({
      type: "SET_BIRTH_DATE",
      payload: convertPersianToEnglish(date?.format()),
    });
    dispatch({
      type: "SET_MOMENT",
      payload: date,
    });
    console.log("dhdhujhd", convertPersianToEnglish(birthDate));
    // console.log();
  };

  useEffect(() => {
    // Call calculateAge every second
    const interval = setInterval(() => {
      if (isCalculated) handelCalculateAge();
    }, 1000);

    return () => clearInterval(interval);
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
        <p className="text-center text-2xl font-bold">
          تاریخ تولدتان را وارد کنید
        </p>
        <DatePicker
          className="w-full max-w-[30rem] text-center text-4xl font-bold py-6 border-b-4 border-blue-400"
          calendar={persian}
          locale={persian_fa}
          value={birthDate}
          onChange={handleDatePickerChange}
          minDate="1300/9/18"
          maxDate={convertPersianToEnglish(nowLimit)}
          placeholderText="تاریح را وارد کنید"
        />
        <Button
          color="primary"
          size="lg"
          onClick={handelCalculateAge}
          className="bg-gradient-to-r from-pink-500 to-red-400 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg px-6 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          محاسبه سن
        </Button>
      </div>

      {IsModal && (
        <ResultModal
          handelCalculateAge={handelCalculateAge}
          dispatch={dispatch}
          age={age}
          nextBirthday={nextBirthday}
          momentDate={momentDate}
          convertedDate={convertedDate}
          now={now}
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
