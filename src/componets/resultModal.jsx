/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// import persian from "react-date-object/calendars/persian";

export default function ResultModal({
  dispatch,
  age,
  nextBirthday,
  momentDate,
  now,
  convertedDate,
}) {
  const persianNextYear = new DateObject({
    date: momentDate?.toDate(),
    calendar: persian,
    locale: persian_fa,
  })
    .add(age?.years + 1, "years")
    .convert(persian)
    .format();

  const miladiNextYear = new DateObject(momentDate?.toDate())
    .add(age?.years + 1, "years")
    .format();

  function close() {
    dispatch({ type: "SET_IS_MODAL", payload: false });
    dispatch({ type: "SET_IS_CALCULATED", payload: false });
  }
  function toFarsiNumber(n) {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    return n?.toString()?.replace(/\d/g, (x) => farsiDigits[x]);
  }

  return (
    <>
      <Modal
        dir="rtl"
        size="xl "
        className="md:max-h-full max-h-[90%] "
        isOpen={true}
        onOpenChange={close}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center bg-gradient-to-r from-blue-500 to-indigo-500 border-b-1 border-blue-400 gap-1 rounded-b-[2rem]">
                <p className="text-white text-xl font-bold">اطلاعات سن شما</p>
              </ModalHeader>

              <ModalBody>
                <div className="flex flex-col items-center justify-center gap-6 text-center text-md font-semibold text-gray-800 ">
                  {/* Age Display */}
                  {age && (
                    <div className="pb-6">
                      <div className="text-2xl py-4 font-bold">
                        <span className="text-4xl text-indigo-600 px-2">
                          {age.years}
                        </span>
                        سال و
                        <span className="text-4xl text-indigo-600 px-2">
                          {age.months}
                        </span>
                        ماه
                      </div>
                      <div className="text-xl text-gray-700">
                        <span className="text-3xl text-indigo-600 px-2">
                          {age.days}
                        </span>
                        روز و
                        <span className="text-3xl text-indigo-600 px-2">
                          {age.hours}
                        </span>
                        ساعت و
                        <span className="text-3xl text-indigo-600 px-2">
                          {age.minutes}
                        </span>
                        دقیقه و
                        <span className="text-3xl text-indigo-600 px-2">
                          {age.seconds}
                        </span>
                        ثانیه
                      </div>
                    </div>
                  )}

                  {/* Next Birthday Countdown */}
                  <h2 className="text-xl w-full text-center font-bold text-pink-500 border-b-2 border-pink-100 py-4">
                    زمان باقی مانده تا تولد شما
                  </h2>
                  <div>
                    {!nextBirthday?.nextMonths == "0" &&
                    !nextBirthday?.nextDays == "0 " ? (
                      <div className="pb-6">
                        {/* <span className="text-3xl font-bold text-indigo-600 px-2">
                          {toFarsiNumber(nextBirthday?.nextYears)==="0"||null?"0":}
                        </span>
                        سال و */}
                        <span className="text-3xl font-bold text-indigo-600 px-2">
                          {toFarsiNumber(Math.abs(nextBirthday?.nextMonths))}
                        </span>
                        ماه
                        <span className="text-3xl font-bold text-indigo-600 px-2">
                          {toFarsiNumber(Math.abs(nextBirthday?.nextDays))}
                        </span>
                        روز و
                        <span className="text-3xl font-bold text-indigo-600 px-2">
                          {toFarsiNumber(Math.abs(nextBirthday?.nextHours))}
                        </span>
                        ساعت و
                        <span className="text-3xl font-bold text-indigo-600 px-2">
                          {toFarsiNumber(Math.abs(nextBirthday?.nextMinutes))}
                        </span>
                        دقیقه و
                        <span className="text-3xl font-bold text-indigo-600 px-2">
                          {toFarsiNumber(Math.abs(nextBirthday?.nextSeconds))}
                        </span>
                        ثانیه
                      </div>
                    ) : (
                      <span className="text-2xl font-bold text-indigo-600 px-2">
                        امروز تولد شماست 🥳
                      </span>
                    )}
                  </div>

                  {/* Next Birthday Dates */}
                  <div className="flex flex-col items-center w-full justify-between gap-6 text-md text-gray-700">
                    <h3 className="text-xl font-bold">
                      تولد بعدی شما به شمسی :
                    </h3>
                    <h4 className="text-indigo-700 font-bold text-2xl">
                      {persianNextYear}
                    </h4>

                    <h3 className="text-xl font-bold">
                      تولد بعدی شما به میلادی :
                    </h3>
                    <h4 className="text-indigo-700 font-bold text-2xl">
                      {toFarsiNumber(miladiNextYear)}
                    </h4>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className="flex justify-center py-6">
                <Button
                  onPress={close}
                  className="bg-gradient-to-r from-pink-500 to-red-400 text-white px-6 py-3 font-semibold rounded-lg shadow-md"
                >
                  بستن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
