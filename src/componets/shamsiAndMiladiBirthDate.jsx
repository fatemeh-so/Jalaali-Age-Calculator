function ShamsiAndMiladiBirthDate({ shamsi, miladi }) {
  const year = Number(miladi._i.slice(0, 4)) + 1;
  const month = miladi._i.slice(6, 7);
  const day = miladi._i.slice(9, 10);

  const shamsiYear = Number(shamsi.slice(0, 4)) + 1;
  const shamsiMonth= shamsi.slice(6, 7);
  const shamsiDay = shamsi.slice(9, 10);
  return (
    <>
      <div className="result">
        <h3>تولد بعدی شما به شمسی :</h3>
        <h4>{`${shamsiYear}/${shamsiMonth}/${shamsiDay}`}</h4>
      </div>
      <div className="result">
        <h3> تولد بعدی شما به میلادی :</h3>
        <h4>{`${year}/${month}/${day}`}</h4>
      </div>
    </>
  );
}

export default ShamsiAndMiladiBirthDate;
