import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useFormContext } from "react-hook-form";
import ControlledMaskedInput from "../ControlledMaskedInput";
import { useMutation } from "react-query";
import { generateCode } from "@/services/api/internal/code";

interface IFirstStepNewpass {
  next(): void;
}

export default function FirstStepNewPass({ next }: IFirstStepNewpass) {
  const {
    control,
    getValues,
    formState: { isValid },
  } = useFormContext();

  const generateCodeMutation = useMutation(generateCode);

  const handleNextStep = () => {
    generateCodeMutation.mutate(getValues("phone"));
    next();
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
                name="phone"
                label="Telefone"
                type="text"
                id="phone"
                autoComplete="tel"
                control={control}
                mask="(00) 00000-0000"
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleNextStep}
            disabled={!isValid}
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
