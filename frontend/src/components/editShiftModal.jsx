import React, { useState } from "react";
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

const EditShiftModal = (shift) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const token = sessionStorage.getItem("accessToken");

  const onSubmit = async (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const startingHour = e.target.startingHour.value;
    const endingHour = e.target.endingHour.value;
    console.log(date, startingHour, endingHour);
    const shiftId = shift.shift._id;

    try {
      const res = await axios.put(
        `http://localhost:3001/shifts/${shiftId}`,
        {
          date: new Date(date),
          startingHour: startingHour,
          endingHour: endingHour,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (res.status === 202) {
        console.log("Shift Updated successfully");
        window.location.reload();
      } else {
        console.log("Failed to add shift");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <Button onPress={onOpen}>Edit Shift</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-gray-400 text-white"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Shift
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col justify-center items-center w-full p-4 gap-4"
                >
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    className="text-black"
                    defaultValue={shift.shift.date.substring(0, 10)}
                  />
                  <label htmlFor="startingHour">Starting Hour</label>
                  <input
                    type="number"
                    name="Start Hour"
                    id="startingHour"
                    required
                    className="text-black"
                    defaultValue={shift.shift.startingHour}
                  />
                  <label htmlFor="endingHour">Ending Hour</label>
                  <input
                    type="number"
                    name="End Hour"
                    id="endingHour"
                    required
                    className="text-black"
                    defaultValue={shift.shift.endingHour}
                  />

                  <ModalFooter>
                    <Button color="danger" variant="solid" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" color="primary" onPress={onClose}>
                      Edit Shift
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

export default EditShiftModal;
