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

const AddShiftModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const token = sessionStorage.getItem("accessToken");

  const onSubmit = async (e) => {
    e.preventDefault();
    const date = e.target.date.value;
    const startingHour = e.target.startingHour.value;
    const endingHour = e.target.endingHour.value;

    try {
      const res = await axios.post(
        "http://localhost:3001/shifts",
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
      if (res.status === 201) {
        console.log("Shift added successfully");
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
      <Button
        className="items-center justify-center flex mx-auto"
        onPress={onOpen}
      >
        Add New Shift
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-gray-400 text-white"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Shift
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col justify-center items-center w-full p-4 "
                >
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    className="text-black"
                  />
                  <label htmlFor="startingHour">Starting Hour</label>
                  <input
                    type="number"
                    name="Start Hour"
                    id="startingHour"
                    className="text-black"
                    required
                  />
                  <label htmlFor="endingHour">Ending Hour</label>
                  <input
                    type="number"
                    name="End Hour"
                    id="endingHour"
                    className="text-black"
                    required
                  />

                  <ModalFooter>
                    <Button color="danger" variant="solid" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" color="primary" onPress={onClose}>
                      Add Shift
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

export default AddShiftModal;
