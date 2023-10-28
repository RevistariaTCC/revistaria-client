import { Checkbox, CheckboxProps, FormControl, FormControlLabel, FormHelperText } from "@mui/material";
import { Controller, ControllerProps } from "react-hook-form";

interface iFormControlLabel {
  label: string;
}

type iControlledCheckbox = Omit<ControllerProps, "render"> &
  CheckboxProps &
  iFormControlLabel;

export default function ControlledCheckbox(props: iControlledCheckbox) {
  const state = props.control?.getFieldState(props.name);
  return (
    <FormControl error={!!state?.error}>
      <FormControlLabel
        control={
          <Controller
            {...props}
            render={({ field }) => <Checkbox {...props} {...field} checked={!!field.value}/>}
          />
        }
        label={props.label}
        
      />
      <FormHelperText>{state?.error?.message}</FormHelperText>
    </FormControl>
  );
}
