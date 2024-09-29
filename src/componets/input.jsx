import { Input } from "@nextui-org/react";
import moment from "moment-jalaali"; // Make sure moment-jalaali is installed

function MyInput({ manualBirthDate, setManualBirthDate, dispatch }) {
  // Convert digits to Farsi
  function toFarsiNumber(n) {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return n?.toString()?.replace(/\d/g, (x) => farsiDigits[x]);
  }
  const convertToGregorianDate = (shamsiDate) => {
    const gregorianDate = moment(shamsiDate, "jYYYY/jMM/jDD").toDate();
    return gregorianDate;
  };

  // Function to handle the input and convert Jalaali to Gregorian
  function handleInputChange(e) {
    const jalaaliDate = e.target.value;
    setManualBirthDate(jalaaliDate);
    const test = convertToGregorianDate(jalaaliDate);
  }

  return (
    <div className="flex gap-4 flex-col justify-center items-center py-4">
      <Input
        // isRequired
        label="تاریخ تولد شما"
        className="max-w-sm bg-blue border-blue-900"
        placeholder="xxxx/xx/xx"
        color="primary"
        value={manualBirthDate} // Display Farsi digits
        onChange={handleInputChange} // Update the manual input value and convert it
        onBlur={(e) => {
          const jalaaliDate = e.target.value;
          const test = convertToGregorianDate(jalaaliDate);
          const convert = moment(test);
          console.log("hhhh", moment(convert));

          if (convert) dispatch({ type: "SET_BIRTH_DATE", payload: convert });
        }}
      />
    </div>
  );
}

export default MyInput;
