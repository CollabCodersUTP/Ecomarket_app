import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  ShoppingCart,
  CreditCard,
  Truck,
  CheckCircle2,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import { CartItem } from "../hooks/useCart";

interface CheckoutProps {
  onNavigate: (page: string) => void;
  cartItems?: CartItem[];
  onUpdateQuantity?: (productoId: number, cantidad: number) => void;
  onRemoveItem?: (productoId: number) => void;
  cartTotal?: number;
}

export function Checkout({
  onNavigate,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  cartTotal = 0,
}: CheckoutProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pedidoNumero, setPedidoNumero] = useState("");

  // Form data
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    telefono: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });

  const subtotal = cartTotal;
  const shipping = shippingMethod === "express" ? 5.99 : 0;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProcessPayment = async () => {
    setError(null);
    setSuccess(false);

    // Validate form
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.direccion ||
      !formData.ciudad ||
      !formData.codigoPostal ||
      !formData.telefono
    ) {
      setError("Por favor completa todos los campos de envío");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    try {
      setIsProcessing(true);

      // Get user from localStorage
      const userRaw = localStorage.getItem("user");
      if (!userRaw) {
        setError("Debes estar logueado para realizar una compra");
        onNavigate("auth");
        return;
      }

      const user = JSON.parse(userRaw);

      // Prepare order payload
      const pedido = {
        usuarioId: user.usuarioId,
        nombreDestinatario: formData.nombre + " " + formData.apellido,
        direccionEnvio: formData.direccion,
        ciudad: formData.ciudad,
        codigoPostal: formData.codigoPostal,
        telefonoContacto: formData.telefono,
        metodoEnvio: shippingMethod === "express" ? "EXPRESS" : "STANDARD",
        metodoPago:
          paymentMethod === "card"
            ? "CARD"
            : paymentMethod === "paypal"
            ? "PAYPAL"
            : "TRANSFER",
        subtotal: parseFloat(subtotal.toFixed(2)),
        costoEnvio: parseFloat(shipping.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
        items: cartItems.map((item) => ({
          productoId: item.productoId,
          cantidad: item.cantidad,
          precio: item.precio,
        })),
      };

      // Send order to backend
      const res = await fetch("http://localhost:8080/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });

      // Try to parse JSON response
      let data: any = null;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await res.json();
        } catch (jsonErr) {
          console.error("Error parsing JSON response:", jsonErr);
          data = null;
        }
      } else {
        // Response is not JSON (plain text error)
        const text = await res.text();
        data = { error: text };
      }

      if (!res.ok) {
        const message =
          (data && typeof data === "object" && data.error) ||
          (data && typeof data === "object" && data.mensaje) ||
          (typeof data === "string" ? data : "") ||
          "Error al procesar el pedido";
        setError(message);
        return;
      }

      // Success
      setSuccess(true);
      setPedidoNumero(data?.numeroPedido || data?.pedidoId || "N/A");

      // Clear cart (if function is provided)
      // Note: This will be handled by calling clearCart from App

      // Move to confirmation step
      setStep(4);
    } catch (err: any) {
      setError(err.message || "Error al procesar el pago");
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = [
    { number: 1, title: "Carrito", icon: ShoppingCart },
    { number: 2, title: "Envío", icon: Truck },
    { number: 3, title: "Pago", icon: CreditCard },
    { number: 4, title: "Confirmación", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 max-w-2xl mx-auto">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      step >= s.number
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-sm ${
                      step >= s.number
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight
                    className={`w-6 h-6 mx-2 ${
                      step > s.number ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Cart */}
            {step === 1 && (
              <Card className="p-6 border-border">
                <h2 className="text-foreground mb-6">Tu Carrito</h2>
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Tu carrito está vacío
                    </p>
                    <Button onClick={() => onNavigate("catalog")}>
                      Continuar comprando
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div
                          key={item.productoId}
                          className="flex gap-4 p-4 bg-muted/30 rounded-lg"
                        >
                          <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={
                                item.imagenPrincipal ||
                                "https://via.placeholder.com/100"
                              }
                              alt={item.nombreProducto}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-foreground mb-1">
                              {item.nombreProducto}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              Precio: €{item.precio.toFixed(2)}
                            </p>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  onUpdateQuantity &&
                                  onUpdateQuantity(
                                    item.productoId,
                                    item.cantidad - 1
                                  )
                                }
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="px-2">{item.cantidad}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  onUpdateQuantity &&
                                  onUpdateQuantity(
                                    item.productoId,
                                    item.cantidad + 1
                                  )
                                }
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  onRemoveItem && onRemoveItem(item.productoId)
                                }
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-primary">
                              €{(item.precio * item.cantidad).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() => setStep(2)}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Continuar al Envío
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </>
                )}
              </Card>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <Card className="p-6 border-border">
                <h2 className="text-foreground mb-6">Dirección de Envío</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        placeholder="Juan"
                        value={formData.nombre}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apellido">Apellidos</Label>
                      <Input
                        id="apellido"
                        name="apellido"
                        placeholder="Pérez"
                        value={formData.apellido}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="juan@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input
                      id="direccion"
                      name="direccion"
                      placeholder="Calle Principal 123"
                      value={formData.direccion}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ciudad">Ciudad</Label>
                      <Input
                        id="ciudad"
                        name="ciudad"
                        placeholder="Madrid"
                        value={formData.ciudad}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="codigoPostal">Código Postal</Label>
                      <Input
                        id="codigoPostal"
                        name="codigoPostal"
                        placeholder="28001"
                        value={formData.codigoPostal}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      placeholder="+34 600 000 000"
                      value={formData.telefono}
                      onChange={handleInputChange}
                    />
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <Label>Método de Envío</Label>
                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={setShippingMethod}
                    >
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label
                          htmlFor="standard"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-foreground">
                                Envío Estándar
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Entrega en 3-5 días laborables
                              </div>
                            </div>
                            <div className="text-primary">Gratis</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary">
                        <RadioGroupItem value="express" id="express" />
                        <Label
                          htmlFor="express"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-foreground">
                                Envío Express
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Entrega en 24-48 horas
                              </div>
                            </div>
                            <div className="text-primary">€5.99</div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Volver
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Continuar al Pago
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <Card className="p-6 border-border">
                <h2 className="text-foreground mb-6">Información de Pago</h2>
                <div className="space-y-4">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="text-foreground">
                          Tarjeta de Crédito/Débito (Simulado)
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        <div className="text-foreground">PayPal (Simulado)</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex-1 cursor-pointer">
                        <div className="text-foreground">
                          Transferencia Bancaria (Simulado)
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-sm text-muted-foreground">
                        Este es un entorno de prueba. Usa datos ficticios.
                      </p>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="Juan Pérez"
                          value={formData.cardName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1"
                      disabled={isProcessing}
                    >
                      Volver
                    </Button>
                    <Button
                      type="button"
                      onClick={handleProcessPayment}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={isProcessing}
                    >
                      {isProcessing
                        ? "Procesando..."
                        : "Confirmar Pedido y Pagar"}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <Card className="p-6 border-border text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-foreground mb-2 text-2xl">
                  ¡Pedido Confirmado!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Tu pedido ha sido procesado correctamente.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-6 text-left">
                  <p className="text-sm text-muted-foreground">
                    Número de Pedido:
                  </p>
                  <p className="text-foreground font-mono text-lg">
                    {pedidoNumero}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Recibirás un email de confirmación con los detalles de tu
                  pedido y seguimiento del envío.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => onNavigate("home")}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Ir al Inicio
                  </Button>
                  <Button
                    onClick={() => onNavigate("catalog")}
                    variant="outline"
                    className="flex-1"
                  >
                    Continuar Comprando
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="p-6 border-border sticky top-24">
              <h3 className="text-foreground mb-4">Resumen del Pedido</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-foreground">
                    €{subtotal.toFixed(2)}
                  </span>
                </div>
                {shipping > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envío:</span>
                    <span className="text-foreground">
                      €{shipping.toFixed(2)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between">
                  <span className="text-foreground font-semibold">Total:</span>
                  <span className="text-primary font-semibold text-lg">
                    €{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
