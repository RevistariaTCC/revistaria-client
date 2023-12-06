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
import { IMaskInput } from "react-imask";
import React from "react";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
}

export default function SignIn() {
  const { handleSubmit, register } = useForm<SignInType>({
    defaultValues: {
      cpf: "",
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

    loginMutation.mutate({...data, cpf: data.cpf.replaceAll(/[^0-9]+/g, '')});
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
            {...register("cpf")}
            margin="normal"
            required
            fullWidth
            id="cpf"
            label="CPF"
            autoFocus
            InputProps={{
              inputComponent: TextMaskCustom as any,
              inputProps: { mask: "000.000.000-00" },
            }}
            error={!!loginMutation.error}
            helperText={
              !!loginMutation.error &&
              "Dados incorretos. Confira seu CPF e senha e tente novamente."
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
