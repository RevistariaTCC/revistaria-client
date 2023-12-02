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
import { generateCode, validateCode } from "@/services/api/internal/code";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import RestoreIcon from "@mui/icons-material/Restore";
import { useTimer } from "react-timer-hook";

interface iSecondStep {
  next(): void;
  previous(): void;
}

export default function SecondStep({ next, previous }: iSecondStep) {
  const { getValues } = useFormContext();

  const [activationCode, setActivationCode] = useState("");
  const [hideTimer, setHideTimer] = useState(false);

  const validateCodeMutation = useMutation(validateCode);

  const generateTime = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 15);
    return time;
  };

  const { restart, seconds } = useTimer({
    expiryTimestamp: generateTime(),
    onExpire: () => setHideTimer(true),
  });

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

  const generateCodeMutation = useMutation(generateCode);

  const handleResendCode = () => {
    restart(generateTime());
    setHideTimer(false);

    generateCodeMutation.mutate(getValues("phone"));
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
          <div className="flex justify-center items-center">
            <Button
              onClick={handleResendCode}
              variant="contained"
              className="bg-white text-indigo-800 w-48 h-10 hover:bg-blue-600 hover:text-white"
              sx={{ mt: 3, mb: 2 }}
              disabled={!hideTimer}
            >
              {hideTimer ? (
                <Typography className="flex flex-col text-xs justify-center">
                  Reenviar código
                </Typography>
              ) : (
                <Typography className="flex flex-col text-xs justify-center">
                  <RestoreIcon sx={{ width: 20 }} />
                  {seconds}
                </Typography>
              )}
            </Button>
          </div>
          <div className="flex justify-center items-center gap-6">
            <Button
              onClick={previous}
              variant="contained"
              className="bg-white text-indigo-800 w-full h-10 hover:bg-blue-600 hover:text-white"
              sx={{ mt: 3, mb: 2 }}
            >
              <Typography className="flex flex-col text-xs justify-center">
                Voltar
              </Typography>
            </Button>
            <Button
              onClick={next}
              disabled={!isValid() || validateCodeMutation.isError}
              fullWidth
              variant="contained"
              className="py-2"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirmar
            </Button>
          </div>
        </Box>
      </Box>
    </Container>
  );
}
