import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { PinInput } from "./PinInput";
import { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { validateCode } from "@/services/api/internal/code";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

interface iSecondStep {
  next(): void;
  previous(): void;
}

export default function SecondStep({ next, previous }: iSecondStep) {
  const { getValues } = useFormContext();

  const [activationCode, setActivationCode] = useState("");

  const validateCodeMutation = useMutation(validateCode);

  const isValid = useCallback(() => {
    return activationCode.trim().length === 6;
  }, [activationCode]);

  useEffect(() => {
    if (!isValid()) return;

    validateCodeMutation.mutate({
      code: activationCode,
      phone: getValues("phone"),
    });
  }, [isValid]);

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
            <Typography>
              Informe o código que enviamos para <b>{getValues("phone")}</b>{" "}
            </Typography>
            <PinInput
              handleChange={setActivationCode}
              disabled={validateCodeMutation.isLoading}
              error={validateCodeMutation.isError}
            />
          </Grid>
          {validateCodeMutation.isError && (
            <Typography className="relative border border-solid border-red-500 text-red-500 mt-4 p-2 text-center text-sm  rounded">
              <ReportGmailerrorredIcon
                sx={{ width: 20 }}
                className="absolute top-1 left-28"
              />
              Código inválido!
              <br /> Por favor revise o telefone e o código informados!
            </Typography>
          )}
          <Button
            onClick={next}
            disabled={!isValid() || validateCodeMutation.isError}
            fullWidth
            autoFocus={false}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Confirmar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
