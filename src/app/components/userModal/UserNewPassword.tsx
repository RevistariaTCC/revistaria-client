import { Box, Button, Container, CssBaseline, Grid, Typography } from "@mui/material"
import PasswordInput from "../PasswordInput"
import { useFormContext } from "react-hook-form";

interface IuserNewPassword {
    closeModal: () => void
}

export default function UserNewPassword({ closeModal } : IuserNewPassword) {

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
          <Typography component="h1" variant="h5">
            Mudar senha
          </Typography>
          <Box component="form" sx={{ mt: 3 }} onSubmit={()=> {}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <PasswordInput
                  fullWidth
                  name="currentPassword"
                  label="Senha atual"
                  type="password"
                  id="currentPassword"
                  autoComplete="new-password"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordInput
                  fullWidth
                  name="newPassword"
                  label="Nova senha"
                  type="password"
                  id="newPassword"
                  autoComplete="new-password"
                  control={control}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordInput
                  fullWidth
                  name="confirm"
                  label="Confirmar a nova senha"
                  type="password"
                  id="confirm"
                  autoComplete="new-password"
                  control={control}
                />
              </Grid>
            </Grid>
            <div className="flex justify-between gap-6 mt-4 items-center">
              <Button variant="outlined" onClick={closeModal}>
                Cancelar
              </Button>
              <Button type="submit" variant="outlined" disabled={!isValid}>
                Atualizar
              </Button>
            </div>
          </Box>
        </Box>
      </Container>
    )
};
