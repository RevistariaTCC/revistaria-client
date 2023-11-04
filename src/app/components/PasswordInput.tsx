import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";
import { Controller, ControllerProps } from "react-hook-form";

type iControlledInput = Omit<ControllerProps, "render"> & TextFieldProps;

export default function PasswordInput(props: iControlledInput) {
  const state = props.control?.getFieldState(props.name);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Controller
      {...props}
      render={({ field }) => (
        <TextField
          {...props}
          {...field}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!state?.error}
          helperText={state?.error?.message}
        />
      )}
    />
  );
}
