function Input({ manualBirthDate, setManualBirthDate, handleManualInput }) {
  return (
    <div className="input-container">
      <label className="label">تاریخ تولد خود را وارد کنید:</label>
      <input
        type="text"
        className="input"
        placeholder="xxxx/xx/xx"
        value={manualBirthDate}
        onChange={(e) => setManualBirthDate(e.target.value)}
      />
  
    </div>
  );
}

export default Input;
