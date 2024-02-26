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

const ViewDepartmentWorkers = (info) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [departmentWorkers, setDepartmentWorkers] = useState([]);
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const getDepartmentWorkers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/departments/${info.departmentId}/employees`,
          {
            headers: {
              "x-access-token": token,
            },
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setDepartmentWorkers((prevData) => res.data);
        } else {
          console.log("Failed to get department workers");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDepartmentWorkers();
  }, [info.departmentId, token]);

  return (
    <>
      <Button onPress={onOpen}>View Employees</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-primary text-white"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Department Employees
              </ModalHeader>
              <ModalBody>
                {!departmentWorkers ? (
                  <p>No employees found</p>
                ) : (
                  departmentWorkers.map((worker, i) => {
                    return (
                      <div key={worker._id} className="border items-center p-2">
                        {worker.firstName + " " + worker.lastName}
                      </div>
                    );
                  })
                )}
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

export default ViewDepartmentWorkers;
