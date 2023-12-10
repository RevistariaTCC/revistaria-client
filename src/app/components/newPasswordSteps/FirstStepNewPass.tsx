import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { requestNewPassword } from "@/services/api/internal/user";
import ControlledMaskedInput from "../ControlledMaskedInput";

interface IFirstStepNewpass {
  next(): void;
}

export default function FirstStepNewPass({ next }: IFirstStepNewpass) {
  const {
    control,
    getValues,
    formState: { isValid },
  } = useFormContext();

  const requestNewPasswordMutation = useMutation(requestNewPassword, {
    onSuccess: () => next(),
  });
  const handleNextStep = () => {
    requestNewPasswordMutation.mutate(
      getValues("cpf").replaceAll(/[^0-9]+/g, "")
    );
  };

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
            <Grid item xs={12}>
            <ControlledMaskedInput
                  required
                  fullWidth
                  name="cpf"
                  label="CPF"
                  id="cpf"
                  control={control}
                  mask="000.000.000-00"
                />
            </Grid>
          </Grid>
          <Button
            onClick={handleNextStep}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Continuar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
