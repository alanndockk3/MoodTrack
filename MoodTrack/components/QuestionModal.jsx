"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import DropdownField from "./DropdownField";

export default function ModalWithDropdowns({ onSubmit }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    energy: "",
    genre: "",
    preference: "",
    feeling: "",
  });

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Select Preferences</ModalHeader>
              <ModalBody>
                <DropdownField
                  label="Energy Level"
                  options={["Low", "Moderate", "High"]}
                  onSelect={(value) => handleSelect("energy", value)}
                />
                <DropdownField
                  label="Genre"
                  options={["Pop", "Rock", "Jazz"]}
                  onSelect={(value) => handleSelect("genre", value)}
                />
                <DropdownField
                  label="Preference"
                  options={["Vocals", "Instrumental"]}
                  onSelect={(value) => handleSelect("preference", value)}
                />
                <DropdownField
                  label="Feeling"
                  options={["Relaxed", "Happy", "Sad"]}
                  onSelect={(value) => handleSelect("feeling", value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onSubmit(formData);
                    onClose();
                  }}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
