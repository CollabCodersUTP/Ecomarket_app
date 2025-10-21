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
  Leaf
} from "lucide-react";

interface CheckoutProps {
  onNavigate: (page: string) => void;
}

const cartItems = [
  {
    id: 1,
    name: "Aceite de Oliva Orgánico Extra Virgen",
    price: 12.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1667885098658-f34fed001418?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdmVnZXRhYmxlcyUyMG1hcmtldHxlbnwxfHx8fDE3NjA1NzU3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "Cosméticos Naturales Veganos",
    price: 18.50,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1614267861476-0d129972a0f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwY29zbWV0aWNzfGVufDF8fHx8MTc2MDYyMjQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function Checkout({ onNavigate }: CheckoutProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("standard");

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = shippingMethod === "express" ? 5.99 : 0;
  const total = subtotal + shipping;

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
                      step >= s.number ? "text-foreground" : "text-muted-foreground"
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
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-foreground mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Cantidad: {item.quantity}
                        </p>
                        <div className="text-primary">
                          €{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => setStep(2)}
                  className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Continuar al Envío
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Card>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <Card className="p-6 border-border">
                <h2 className="text-foreground mb-6">Dirección de Envío</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" placeholder="Juan" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellidos</Label>
                      <Input id="lastName" placeholder="Pérez" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" placeholder="Calle Principal 123" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad</Label>
                      <Input id="city" placeholder="Madrid" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Código Postal</Label>
                      <Input id="postalCode" placeholder="28001" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" placeholder="+34 600 000 000" />
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <Label>Método de Envío</Label>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-foreground">Envío Estándar</div>
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
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-foreground">Envío Express</div>
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
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="text-foreground">Tarjeta de Crédito/Débito</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        <div className="text-foreground">PayPal</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex-1 cursor-pointer">
                        <div className="text-foreground">Transferencia Bancaria</div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Fecha de Expiración</Label>
                          <Input id="expiry" placeholder="MM/AA" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                        <Input id="cardName" placeholder="Juan Pérez" />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1"
                    >
                      Volver
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setStep(4)}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Confirmar Pedido
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <Card className="p-8 border-border text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-foreground mb-2">¡Pedido Confirmado!</h2>
                <p className="text-muted-foreground mb-6">
                  Gracias por tu compra. Recibirás un correo con los detalles de tu pedido.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Número de Pedido</p>
                  <p className="text-foreground">#ECO-2024-1234</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => onNavigate("orders")}
                    className="flex-1"
                  >
                    Ver Pedido
                  </Button>
                  <Button
                    onClick={() => onNavigate("home")}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Volver al Inicio
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-border sticky top-24">
              <h3 className="text-foreground mb-4">Resumen del Pedido</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Envío</span>
                  <span>{shipping === 0 ? "Gratis" : `€${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-foreground">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-start gap-2">
                  <Leaf className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-foreground text-sm mb-1">Compra Sostenible</h4>
                    <p className="text-xs text-muted-foreground">
                      Este pedido compensa 2.5kg de CO₂ y apoya a productores locales
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
