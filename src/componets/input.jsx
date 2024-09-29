import { Input } from "@nextui-org/react";
import moment from "moment-jalaali"; // Make sure moment-jalaali is installed

function MyInput({ manualBirthDate, setManualBirthDate, dispatch }) {
  // Convert digits to Farsi
  function toFarsiNumber(n) {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return n?.toString()?.replace(/\d/g, (x) => farsiDigits[x]);
  }

  const convertToGregorianDate = (shamsiDate) => {
    return moment(shamsiDate, "jYYYY/jMM/jDD").toDate();
  };

  // Function to handle the input and convert Jalaali to Gregorian
  function handleInputChange(e) {
    const jalaaliDate = e.target.value;
    setManualBirthDate(jalaaliDate);
  }

  return (
    <div className="flex gap-4 flex-col justify-center items-center py-4">
      <Input
        label="تاریخ تولد شما"
        className="max-w-sm bg-blue border-blue-900"
        placeholder="xxxx/xx/xx"
        color="primary"
        value={manualBirthDate}
        onChange={handleInputChange}
        onBlur={(e) => {
          const jalaaliDate = e.target.value;
          const convert = moment(jalaaliDate, "jYYYY/jMM/jDD", true);
          console.log("Moment Object:", convert);

          if (convert.isValid()) {
            dispatch({ type: "SET_BIRTH_DATE", payload: convert });
          } else {
            console.error("Invalid date");
          }
        }}
      />
    </div>
  );
}

export default MyInput;
