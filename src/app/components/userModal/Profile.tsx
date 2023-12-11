import { UpdateSchema, UpdateType } from "@/schemas/UserSignUp";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ControlledInput from "../ControlledInput";
import ControlledDatePicker from "../ControlledDatePicker";
import ControlledMaskedInput from "../ControlledMaskedInput";
import { useMutation, useQuery } from "react-query";
import {
  changePassword,
  getUserById,
  updateUser,
} from "@/services/api/internal/user";
import { useAuth } from "@/hooks/auth";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useState } from "react";
import UserNewPassword from "./UserNewPassword";
import {
  ChangePasswordSchema,
  ChangePasswordType,
} from "@/schemas/RecoveryPassword";

interface iProfileComponent {
  closeModal(): void;
  onSucess?(event: object): void;
}

interface ExceptionResponse {
  type: string;
  error: Response;
}

const ProfileComponent = ({ closeModal, onSucess }: iProfileComponent) => {
  const { control, handleSubmit, reset } = useForm<UpdateType>({
    defaultValues: {
      name: "",
      phone: "",
      birthdate: new Date(),
      cpf: "",
      newsletter: true,
    },

    mode: "all",
    resolver: zodResolver(UpdateSchema),
  });
  const { user, token } = useAuth();

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => {
      onSucess &&
        onSucess({
          type: "success",
          message: "Usuário atualizado com sucesso",
        });
      closeModal();
    },
  });

  const methods = useForm<ChangePasswordType>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirm: "",
    },

    mode: "all",
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit = (data: object) => {
    updateUserMutation.mutate({
      data,
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  useQuery({
    ...getUserById(user.id, { Authorization: `Bearer ${token}` }),
    onSuccess: (data) => {
      console.log(data);
      const { name, birthdate, cpf, phone, newsletter } = data;
      reset({
        name,
        birthdate: new Date(birthdate),
        cpf,
        phone,
        newsletter,
      });
    },
  });

  const updatePasswordMutation = useMutation(changePassword, {
    onSuccess: () => {
      onSucess &&
        onSucess({
          type: "success",
          message: "Senha atualizada com sucesso!",
        });
      closeModal();
    },
    onError: ({ error }: ExceptionResponse) => {
      error.text().then((text) => {
        onSucess &&
          onSucess({
            type: "error",
            message: JSON.parse(text).message,
          });
      });
    },
  });

  const { handleSubmit: handleSubmitPassword } = methods;
  const onSubmitUpdatePassword: SubmitHandler<ChangePasswordType> = ({
    currentPassword,
    newPassword,
  }) => {
    updatePasswordMutation.mutate({
      data: { password: currentPassword, newPassword },
      headers: { authorization: `Bearer ${token}` },
    });
  };

  const [openNewPassoword, setOpenNewPassoword] = useState(false);

  if (openNewPassoword) {
    return (
      <FormProvider {...methods}>
        <UserNewPassword
          previous={() => setOpenNewPassoword(false)}
          handleSubmit={handleSubmitPassword(onSubmitUpdatePassword)}
        />
      </FormProvider>
    );
  }
  methods.watch();

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
          Meus dados
        </Typography>
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit(onSubmit)}>
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
              <ControlledMaskedInput
                required
                fullWidth
                name="cpf"
                label="CPF"
                id="cpf"
                control={control}
                mask="000.000.000-00"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <button
                type="button"
                className="outline-none border-none bg-transparent text-blue-800 hover:text-blue-500 text-sm cursor-pointer flex items-center"
                onClick={() => {
                  setOpenNewPassoword(true);
                }}
              >
                Mudar Senha <OpenInNewIcon className="ms-1" fontSize="small" />
              </button>
            </Grid>
          </Grid>
          <div className="flex justify-between gap-6 mt-4 items-center">
            <Button variant="outlined" onClick={closeModal}>
              Cancelar
            </Button>
            <Button type="submit" variant="outlined">
              Atualizar
            </Button>
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileComponent;
