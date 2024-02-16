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
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import axios from "axios";

const AddEmployessToShift = (info) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const token = sessionStorage.getItem("accessToken");
  const [employeeId, setEmployeeId] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const shiftId = info.shift._id;

    try {
      const res = await axios.put(
        `http://localhost:3001/employees/${employeeId}/shifts`,
        { shiftId },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (res.status === 200) {
        console.log("Employee added to shift");
        console.log(res.data);
      } else {
        console.log("Failed to add employee to shift");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <Button onPress={onOpen}>Add Employees</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-black text-white"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Employees
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col justify-center items-center w-full p-4 gap-4 "
                >
                  <Select
                    label="Select an Employee"
                    className="max-w-xs text-black"
                    id="employeeId"
                    isRequired
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                  >
                    {info.employees.map((employee) => (
                      <SelectItem key={employee._id} textValue={employee._id}>
                        {employee.firstName} {employee.lastName}
                      </SelectItem>
                    ))}
                  </Select>

                  <ModalFooter>
                    <Button color="danger" variant="solid" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" color="primary" onPress={onClose}>
                      Add Employee
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEmployessToShift;
