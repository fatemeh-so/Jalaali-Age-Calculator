function NextBirthDayResult({ nextBirthday }) {
  return (
    <div className="result">
      <h3> مدت زمان باقیی مانده تا تولد بعدی شما:</h3>
      <h4>
        {Math.abs(nextBirthday?.nextMonths)} ماه {nextBirthday.nextDays} روز
        {nextBirthday.nextHours} ساعت {nextBirthday.nextMinutes} دقیقه
        {nextBirthday.nextSeconds} ثانیه
      </h4>
    </div>
  );
}

export default NextBirthDayResult;
