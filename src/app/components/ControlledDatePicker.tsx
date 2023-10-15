import { Controller, ControllerProps } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface IDatePicker {
  id: string;
  required?: boolean;
  className: string;
  label: string;
  autoComplete: string;
  fullWidth: boolean;
}

type iControlledDatePicker = Omit<ControllerProps, "render"> & IDatePicker;

export default function ControlledDatePicker(props: iControlledDatePicker) {
  const state = props.control?.getFieldState(props.name);

  return (
    <Controller
      {...props}
      render={({ field }) => (
        <DatePicker
          {...props}
          {...field}
          slotProps={{
            textField: {
              required: props.required,
              error: !!state?.error,
              helperText: state?.error?.message
            }
          }}
        />
      )}
    />
  );
}
