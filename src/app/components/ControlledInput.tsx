import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
} from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type iControlledInput = Omit<Omit<ControllerProps, "control">, "render"> & TextFieldProps & {
  control: Control<any, object>;
};

export default function ControlledInput(props: iControlledInput) {
  const state = props.control?.getFieldState(props.name);

  return (
    <Controller
      {...props}
      render={({ field }) => (
        <TextField
          {...props}
          {...field}
          error={!!state?.error}
          helperText={state?.error?.message}
        />
      )}
    />
  );
}
