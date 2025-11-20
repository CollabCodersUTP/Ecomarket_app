import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { Leaf, Mail, Lock, User, Phone } from "lucide-react";

interface AuthPageProps {
  onNavigate: (page: string) => void;
}

export function AuthPage({ onNavigate }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState("login");

  // If user already logged in, redirect to account
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        onNavigate("account");
      }
    } catch (e) {
      // ignore
    }
  }, [onNavigate]);

  // State for Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // State for Register form
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);

  const handleLogin = async () => {
    setRegisterError(null);
    setRegisterSuccess(null);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = typeof data === "string" ? data : data?.mensaje || data?.error || JSON.stringify(data);
        setRegisterError(message || "Error en el login");
        return;
      }

      // Controller returns { mensaje, usuario: AuthResponse }
      const auth = data?.usuario || data;

      const userObj = {
        token: auth?.token,
        usuarioId: auth?.usuarioId,
        email: auth?.email,
        nombre: auth?.nombre,
        rol: auth?.rol,
      };

      if (userObj.token) {
        localStorage.setItem("user", JSON.stringify(userObj));
      }

      setRegisterSuccess("Inicio de sesión exitoso. Redirigiendo...");
      setTimeout(() => onNavigate("home"), 800);
    } catch (err: any) {
      setRegisterError(err?.message || "Error al conectar con el servidor");
    }
  };

  const handleRegister = async () => {
    setRegisterError(null);
    setRegisterSuccess(null);

    if (registerPassword !== registerConfirm) {
      setRegisterError("Las contraseñas no coinciden");
      return;
    }

    // Split nombre completo into nombre and apellido (simple heuristic)
    const parts = registerName.trim().split(/\s+/);
    const nombre = parts.slice(0, parts.length > 1 ? parts.length - 1 : 1).join(" ") || parts[0] || "";
    const apellido = parts.length > 1 ? parts[parts.length - 1] : "";

    const payload = {
      nombre,
      apellido,
      email: registerEmail,
      password: registerPassword,
      telefono: registerPhone,
      direccion: "",
      ciudad: "",
      pais: "",
      codigoPostal: "",
    };

    try {
      setRegisterLoading(true);

      const res = await fetch("http://localhost:8080/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // backend may return plain string or object
        const message = typeof data === "string" ? data : data?.mensaje || data?.error || JSON.stringify(data);
        setRegisterError(message || "Error en el registro");
        return;
      }

      // Expected AuthResponse: token, usuarioId, email, nombre, rol
      const token = data?.token || data?.Token || data?.authToken || data?.accessToken;
      // Some controllers may return the AuthResponse directly
      const authToken = token || data?.token || data?.token;

      // If token is not in root, try data.token (already attempted). As fallback, if data has 'token' return, use it.
      if (data?.token) {
        localStorage.setItem("token", data.token);
      } else if (authToken) {
        localStorage.setItem("token", authToken);
      }

      setRegisterSuccess("Registro exitoso. Redirigiendo...");
      // Navigate to home or call onNavigate
      setTimeout(() => onNavigate("home"), 1000);
    } catch (err: any) {
      setRegisterError(err?.message || "Error al conectar con el servidor");
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 border-border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-foreground mb-2">Bienvenido a Ecomarket</h2>
            <p className="text-muted-foreground">
              Únete a nuestra comunidad sostenible
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox />
                  <span className="text-sm text-muted-foreground">
                    Recordarme
                  </span>
                </label>
                <button className="text-sm text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <Button
                onClick={handleLogin}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={registerLoading}
              >
                Iniciar Sesión
              </Button>
              {registerError && (
                <p className="text-sm text-destructive mt-2">{registerError}</p>
              )}
              {registerSuccess && (
                <p className="text-sm text-success mt-2">{registerSuccess}</p>
              )}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-2 text-muted-foreground">
                    O continúa con
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Nombre Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Juan Pérez"
                    className="pl-10"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-phone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="+34 600 000 000"
                    className="pl-10"
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm">Confirmar Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="register-confirm"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={registerConfirm}
                    onChange={(e) => setRegisterConfirm(e.target.value)}
                  />
                </div>
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <Checkbox className="mt-1" />
                <span className="text-sm text-muted-foreground">
                  Acepto los términos y condiciones y la política de privacidad
                  de Ecomarket
                </span>
              </label>
              <Button
                onClick={handleRegister}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={registerLoading}
              >
                Crear Cuenta
              </Button>
              {registerError && (
                <p className="text-sm text-destructive mt-2">{registerError}</p>
              )}
              {registerSuccess && (
                <p className="text-sm text-success mt-2">{registerSuccess}</p>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </>
  );
}
