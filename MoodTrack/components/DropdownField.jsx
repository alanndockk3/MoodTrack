"use client";

import { useState, useMemo } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function DropdownField({ label, options, onSelect }) {
  const [selectedKey, setSelectedKey] = useState("");

  const selectedValue = useMemo(
    () => (selectedKey ? selectedKey : `Select ${label}`),
    [selectedKey, label]
  );

  const handleSelection = (key) => {
    setSelectedKey(key);
    onSelect(key);
  };

  return (
    <div className="mb-4">
      <p className="text-sm mb-1">{label}</p>
      <Dropdown>
        <DropdownTrigger>
          <Button className="capitalize w-full" variant="bordered">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label={`Select ${label}`}
          selectionMode="single"
          onAction={handleSelection}
        >
          {options.map((option) => (
            <DropdownItem key={option}>{option}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
