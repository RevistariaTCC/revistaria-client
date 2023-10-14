import { Controller, ControllerProps } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type iControlledInput = Omit<ControllerProps, "render"> & TextFieldProps;

export default function ControlledInput(props: iControlledInput) {
  const state = props.control?.getFieldState(props.name);

  if(props.name === "confirmPassword") console.log(`${props.name} state:`, state)

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
