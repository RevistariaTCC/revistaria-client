import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useMutation } from "react-query";
import { createSession } from "@/services/api/internal/session";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInType } from "@/schemas/UserSignIn";
import { LinearProgress, TextField } from "@mui/material";
import { useAuth } from "@/hooks/auth";


export default function SignIn() {
  const { handleSubmit, register } = useForm<SignInType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signIn } = useAuth();
  const loginMutation = useMutation(createSession, {
    onSuccess: (data) => {
      signIn(data);
    },
  });

  const onSubmit: SubmitHandler<SignInType> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      {loginMutation.isLoading && <LinearProgress />}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Faça Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("email")}
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            autoComplete="email"
            autoFocus
            error={!!loginMutation.error}
            helperText={
              !!loginMutation.error &&
              "Dados incorretos. Confira seu e-mail e senha e tente novamente."
            }
          />
          <TextField
            {...register("password")}
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
