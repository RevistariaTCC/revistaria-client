import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useFormContext } from "react-hook-form";
import PasswordInput from "../PasswordInput";


interface IThirdStepNewPass {
  previous(): void;
  handleSubmit(): void;
}

export default function ThirdStepNewPass({ previous, handleSubmit }: IThirdStepNewPass) {

  const {
    control,
    getValues,
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
            <Grid item xs={12}>
              <PasswordInput
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput
                fullWidth
                name="confirm"
                label="Confirmar senha"
                type="password"
                id="confirm"
                autoComplete="new-password"
                control={control}
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit}
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
