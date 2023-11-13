import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { Control, Controller, ControllerProps } from "react-hook-form";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
}

interface iInput {
  mask: string;
}

type iControlledInput = Omit<Omit<ControllerProps, "control">, "render"> &
  TextFieldProps &
  iInput & {
    control: Control<any, object>;
  };

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, mask, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={mask}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export default function ControlledMaskedInput(props: iControlledInput) {
  const state = props.control?.getFieldState(props.name);
  return (
    <Controller
      {...props}
      render={({ field }) => (
        <TextField
          {...props}
          {...field}
          InputProps={{
            inputComponent: TextMaskCustom as any,
            inputProps: { mask: props.mask },
          }}
          error={!!state?.error}
          helperText={state?.error?.message}
        />
      )}
    />
  );
}
