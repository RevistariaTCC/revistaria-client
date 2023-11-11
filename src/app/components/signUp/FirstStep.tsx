import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useFormContext } from "react-hook-form";
import ControlledInput from "../ControlledInput";
import ControlledDatePicker from "../ControlledDatePicker";
import ControlledCheckbox from "../ControlledCheckbox";
import ControlledMaskedInput from "../ControlledMaskedInput";
import PasswordInput from "../PasswordInput";

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
            <Grid item xs={12}>
              <ControlledInput
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="Nome"
                autoFocus
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledDatePicker
                required
                id="birthdate"
                fullWidth
                className="w-full"
                label="Data de nascimento"
                name="birthdate"
                autoComplete="bday"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledMaskedInput
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
            <Grid item xs={12}>
              <ControlledInput
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                control={control}
              />
            </Grid>
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
            <Grid item xs={12}>
              <ControlledCheckbox 
                control={control}
                color="primary"
                label="Eu gostaria de receber notificações de novidades via e-mail."
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
            Continuar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
