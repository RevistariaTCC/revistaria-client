import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useFormContext } from "react-hook-form";
import ControlledInput from "../ControlledInput";
import ControlledDatePicker from "../ControlledDatePicker";
import ControlledCheckbox from "../ControlledCheckbox";

interface IFirstStep {
  next(): void;
}

export default function FirstStep({ next }: IFirstStep) {
  const {
    control,
    formState: { isValid },
  } = useFormContext();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ControlledInput
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ControlledInput
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledDatePicker
                required
                id="birthdate"
                fullWidth
                className="w-full"
                label="Birthdate"
                name="birthdate"
                autoComplete="bday"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledInput
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledInput
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledInput
                fullWidth
                name="confirm"
                label="Confirm password"
                type="password"
                id="confirm"
                autoComplete="new-password"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledCheckbox 
                control={control}
                color="primary"
                label="I want to receive inspiration, marketing promotions and updates via email."
                name="newsletter"
              />
            </Grid>
          </Grid>
          <Button
            onClick={next}
            disabled={!isValid}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
