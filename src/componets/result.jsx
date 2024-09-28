import React from "react";

const Result = ({ age }) => {
  return (
    <div className="result">
      <h3> سن دقیق شما :</h3>
      <h4>
        {age.years} سال {age.months} ماه {age.days} روز {age.hours} ساعت{" "}
        {age.minutes} دقیقه {age.seconds} ثانیه
      </h4>
    </div>
  );
};

export default Result;
