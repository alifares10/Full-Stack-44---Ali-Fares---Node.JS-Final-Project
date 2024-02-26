import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";

const ViewEmployeeShifts = (info) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const token = sessionStorage.getItem("accessToken");
  const [employeeShifts, setEmployeeShifts] = useState([]);

  useEffect(() => {
    const getEmployeeShifts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/employees/${info.employee._id}/shifts`,
          {
            headers: {
              "x-access-token": token,
            },
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setEmployeeShifts((prevData) => res.data);
        } else {
          console.log("Failed to get employee shifts");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getEmployeeShifts();
  }, [info.employee._id, token]);

  return (
    <>
      <Button onPress={onOpen}>View Shifts</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-primary text-white"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Shifts
              </ModalHeader>
              <ModalBody>
                {employeeShifts.map((e, i) => {
                  return (
                    <div key={e._id} className="border items-center p-2">
                      <p>Shift: {i + 1}</p>
                      <p>Date: {e.date.substring(0, 10)}</p>
                      <p>Start: {e.startingHour}</p>
                      <p>End :{e.endingHour}</p>
                    </div>
                  );
                })}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewEmployeeShifts;
