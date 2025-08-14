import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { api } from "../../shared/services/api/config/axios.config";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("Senha é obrigatória"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Estados para o Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", data);
      if (response.status === 200) {
        navigate("/chat");
      }
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);

      // Configura mensagem de erro para o Snackbar
      const message =
        error?.response?.data?.message ||
        "Erro ao fazer login. Tente novamente.";
      setErrorMessage(message);
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para fechar o Snackbar
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        {/* Coluna Esquerda */}

        {!isMdDown && (
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "primary.main",
              color: "#fff",
              p: 4,
            }}
          >
            <Box textAlign="center">
              <Box
                sx={{
                  bgcolor: "#fff",
                  color: "primary.main",
                  width: 55,
                  height: 55,
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: 30,
                  userSelect: "none",
                  mx: "auto",
                  mb: 2,
                }}
              >
                AI
              </Box>
              <Typography variant="h4" fontWeight="bold">
                Check Docs
              </Typography>
              <Typography variant="subtitle1" mt={1}>
                Acesse sua conta e aproveite o poder da IA na documentação.
              </Typography>
            </Box>
          </Grid>
        )}

        {/* Coluna Direita */}
        <Grid
          size={{ xs: 12, md: 8 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <Paper
            elevation={isMdDown ? 0 : 3}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: 500,
              height: 500,
              gap: 3,
              p: isMdDown ? 1 : 4,
              justifyContent: "center",
              borderRadius: 3,
              bgcolor: isMdDown ? "transparent" : undefined,
              boxShadow: isMdDown ? "none" : undefined,
            }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              Entre na sua conta
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...register("email")}
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                fullWidth
                label="Senha"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        sx={{ mr: 0 }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, pt: 1.5 }}
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <Box>
              <Typography>
                Não tem uma conta?{" "}
                <Link href="/register" underline="hover">
                  Clique aqui
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar para erros */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
