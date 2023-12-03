import { IconButton } from "@mui/material";
import {
  useState,
  InputHTMLAttributes,
  KeyboardEvent,
  ChangeEvent,
  ClipboardEvent,
  useEffect,
} from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const PinInputField = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} />;
};

interface PinInputProps {
  handleChange(value: string): void;
  disabled?: boolean;
  error?: boolean;
}

export const PinInput = ({ handleChange, disabled, error }: PinInputProps) => {
  const [values, setValues] = useState(Array(6).fill(""));
  const [pasted, setPasted] = useState(false);

  useEffect(() => {
    const result = values.reduce((acc, current) => acc + current, "");
    handleChange(result);
  }, [values]);

  const handleSetValues = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (pasted) return;
    const current = event.currentTarget;
    const updatedValues = values.slice();
    updatedValues[index] = current.value;
    setValues(updatedValues);
    if (!current.nextElementSibling) {
      current.blur();
    }
    if (current.value != "" && current.nextElementSibling) {
      (current.nextElementSibling as HTMLElement).focus();
    }
  };

  const nextFocus = (event: KeyboardEvent<HTMLInputElement>) => {
    if (pasted) {
      setPasted(false);
      return;
    }
    const current = event.currentTarget;

    if (event.key == "Backspace") {
      if (current.previousElementSibling) {
        (current.previousElementSibling as HTMLElement).focus();
      }
    }
  };

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    setPasted(true);

    const value = event.clipboardData.getData("Text");
    if (value.length > 6) return;

    updateValues(value);
    focusRecursion(event.currentTarget, value.length, 1);
  };

  const updateValues = (value: string) => {
    const newValues = value.split("").map((val) => val);
    const updatedValues = values.slice();
    updatedValues.splice(0, value.length, ...newValues);
    setValues(updatedValues);
  };

  const focusRecursion = (
    target: HTMLElement,
    total: number,
    current: number
  ) => {
    if (total < current) {
      target.focus();
      return;
    }
    if (target.nextElementSibling) {
      focusRecursion(
        target.nextElementSibling as HTMLElement,
        total,
        current + 1
      );
    } else {
      target.focus();
    }
    return;
  };

  const reset = () => {
    setValues(Array(6).fill(""));
  };

  return (
    <div className="flex justify-center w-full items-center mt-4">
      <div className="flex gap-4 items-center">
        {values.map((value, index) => (
          <PinInputField
            value={value}
            key={`pin-field-${index}`}
            onKeyUp={nextFocus}
            onChange={(event) => {
              handleSetValues(event, index);
            }}
            onPaste={onPaste}
            placeholder="-"
            type="text"
            inputMode="numeric"
            maxLength={1}
            disabled={disabled}
            className={`text-2xl text-center h-8 w-8 rounded border outline-none border-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
        ))}
      </div>
      {error && (
          <IconButton className="h-8 flex items-center justify-center justify-items-center" onClick={reset}>
            <RestartAltIcon />
          </IconButton>
        )}
    </div>
  );
};
