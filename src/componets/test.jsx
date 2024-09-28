/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import ShamsiAndMiladiBirthDate from "./shamsiAndMiladiBirthDate";
import { Result } from "postcss";
import NextBirthDayResult from "./nextBirthDayResult";

export default function Test({
  age,
  nextBirthday,
  miladi,
  shamsi,
  handleManualInput,
}) {
  const year = Number(miladi?._i.slice(0, 4)) + 1;
  const month = miladi?._i.slice(6, 7);
  const day = miladi?._i.slice(9, 10);

  const shamsiYear = Number(shamsi?.slice(0, 4)) + 1;
  const shamsiMonth = shamsi?.slice(6, 7);
  const shamsiDay = shamsi?.slice(9, 10);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} onClick={handleManualInput}>
        Open Modal
      </Button>
      <Modal isOpen={isOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="w-full flex flex-col items-center gap-1 bg-violet-400">
                سن شما مطابق تقویم شمسی
              </ModalHeader>
              {age &
              (
                <ModalBody>
                  {age && <Result age={age} />}
                  {nextBirthday && (
                    <NextBirthDayResult nextBirthday={nextBirthday} />
                  )}
                  {age && nextBirthday && (
                    <ShamsiAndMiladiBirthDate
                      shamsi={manualBirthDate}
                      miladi={birthDate}
                    />
                  )}
                </ModalBody>
              )}
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
