/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function App({ dispatch, age, shamsi, miladi, nextBirthday }) {
  const year = Number(miladi._i.slice(0, 4)) + 1;
  const month = miladi._i.slice(6, 7);
  const day = miladi._i.slice(9, 10);

  const shamsiYear = Number(shamsi.slice(0, 4)) + 1;
  const shamsiMonth = shamsi.slice(6, 7);
  const shamsiDay = shamsi.slice(9, 10);

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
      <Modal dir="rtl" size="xl" isOpen={true} onOpenChange={close}>
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
                        <span className="text-5xl text-indigo-600 px-2">
                          {toFarsiNumber(age.years)}
                        </span>
                        سال و
                        <span className="text-5xl text-indigo-600 px-2">
                          {toFarsiNumber(age.months)}
                        </span>
                        ماه
                      </div>
                      <div className="text-xl text-gray-700">
                        <span className="text-3xl text-indigo-600 px-2">
                          {toFarsiNumber(age.days)}
                        </span>
                        روز و
                        <span className="text-3xl text-indigo-600 px-2">
                          {toFarsiNumber(age.hours)}
                        </span>
                        ساعت و
                        <span className="text-3xl text-indigo-600 px-2">
                          {toFarsiNumber(age.minutes)}
                        </span>
                        دقیقه و
                        <span className="text-3xl text-indigo-600 px-2">
                          {toFarsiNumber(age.seconds)}
                        </span>
                        ثانیه
                      </div>
                    </div>
                  )}

                  {/* Next Birthday Countdown */}
                  <h2 className="text-xl w-full text-center font-bold text-pink-500 border-b-2 border-pink-100 py-4">
                    زمان باقی مانده تا تولد بعدی شما
                  </h2>
                  <div>
                    {nextBirthday && (
                      <div className="pb-6">
                        <span className="text-3xl font-bold text-indigo-600 px-2">
                          {toFarsiNumber(nextBirthday?.nextYears)}
                        </span>
                        سال و
                        <span className="text-3xl font-bold text-indigo-600 px-2">
                          {toFarsiNumber(nextBirthday?.nextMonths)}
                        </span>
                        ماه
                        <span className="text-3xl font-bold text-indigo-600 px-2">
                          {toFarsiNumber(nextBirthday?.nextDays)}
                        </span>
                        روز و
                        <span className="text-3xl font-bold text-indigo-600 px-2">
                          {toFarsiNumber(nextBirthday?.nextHours)}
                        </span>
                        ساعت و
                        <span className="text-3xl font-bold text-indigo-600 px-2">
                          {toFarsiNumber(nextBirthday?.nextMinutes)}
                        </span>
                        دقیقه و
                        <span className="text-3xl font-bold text-indigo-600 px-2">
                          {toFarsiNumber(nextBirthday?.nextSeconds)}
                        </span>
                        ثانیه
                      </div>
                    )}
                  </div>

                  {/* Next Birthday Dates */}
                  <div className="flex flex-col items-center w-full justify-between gap-6 text-md text-gray-700">
                    <h3 className="text-xl font-bold">
                      تولد بعدی شما به شمسی :
                    </h3>
                    <h4 className="text-indigo-700 font-bold text-2xl">{`${toFarsiNumber(
                      shamsiYear
                    )} / ${toFarsiNumber(shamsiMonth)} / ${toFarsiNumber(
                      shamsiDay
                    )}`}</h4>

                    <h3 className="text-xl font-bold">
                      تولد بعدی شما به میلادی :
                    </h3>
                    <h4 className="text-indigo-700 font-bold text-2xl">{`${toFarsiNumber(
                      year
                    )} / ${toFarsiNumber(month)} / ${toFarsiNumber(day)}`}</h4>
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
