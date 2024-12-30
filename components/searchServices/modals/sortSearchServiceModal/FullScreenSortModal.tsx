import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FullScreenSortModalProps } from "./SortServiceModal.types";
import { useSortServiceModal } from "./SortServiceModal.hooks";

const FullScreenSortModal: React.FC<FullScreenSortModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {

  const { options, selectedOption, setSelectedOption, handleOptionChange, handleApply } = useSortServiceModal({ isOpen, onClose, onApply }); 

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <DialogTitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FontAwesomeIcon
            icon={faSort}
            className="text-gray-500"
            style={{ marginRight: 8 }}
          />
          Sort By
          <CloseIcon style={{ cursor: "pointer" }} onClick={onClose} />
        </div>
      </DialogTitle>
      <DialogContent>
        <RadioGroup
          value={selectedOption.value} // Controlled by value
          onChange={handleOptionChange} // Update both value and label
          aria-label="Sort Options"
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ marginBottom: 28, height: "3.5rem" }}
          fullWidth
          onClick={handleApply} // Handle apply button click
          variant="contained"
          color="primary"
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FullScreenSortModal;