import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  MapPin,
  Calendar,
  Phone,
  Mail,
  Download
} from "lucide-react";

interface OrderTrackingProps {
  onNavigate: (page: string) => void;
}

const orderSteps = [
  { 
    id: 1, 
    title: "Pedido Realizado", 
    date: "16 Oct 2024, 10:30", 
    completed: true,
    description: "Tu pedido ha sido confirmado"
  },
  { 
    id: 2, 
    title: "En Preparación", 
    date: "16 Oct 2024, 14:20", 
    completed: true,
    description: "El vendedor está preparando tu pedido"
  },
  { 
    id: 3, 
    title: "En Ruta", 
    date: "Estimado: 17 Oct 2024", 
    completed: false,
    description: "Tu pedido será recogido por el transportista"
  },
  { 
    id: 4, 
    title: "Entregado", 
    date: "Estimado: 18 Oct 2024", 
    completed: false,
    description: "Recibirás tu pedido"
  },
];

const orderItems = [
  {
    id: 1,
    name: "Aceite de Oliva Orgánico Extra Virgen",
    quantity: 2,
    price: 12.99,
    image: "https://images.unsplash.com/photo-1667885098658-f34fed001418?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdmVnZXRhYmxlcyUyMG1hcmtldHxlbnwxfHx8fDE3NjA1NzU3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "Cosméticos Naturales Veganos",
    quantity: 1,
    price: 18.50,
    image: "https://images.unsplash.com/photo-1614267861476-0d129972a0f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwY29zbWV0aWNzfGVufDF8fHx8MTc2MDYyMjQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function OrderTracking({ onNavigate }: OrderTrackingProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-foreground mb-2">Seguimiento de Pedido</h1>
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground">Pedido #ECO-2024-1234</p>
              <Badge className="bg-blue-100 text-blue-800">En Preparación</Badge>
            </div>
          </div>

          {/* Tracking Timeline */}
          <Card className="p-8 mb-6 border-border">
            <h3 className="text-foreground mb-6">Estado del Envío</h3>
            <div className="relative">
              {orderSteps.map((step, index) => (
                <div key={step.id} className="flex gap-4 pb-8 last:pb-0">
                  {/* Timeline Line */}
                  {index < orderSteps.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-border" />
                  )}
                  
                  {/* Icon */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.completed 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {step.id === 1 && <CheckCircle2 className="w-6 h-6" />}
                    {step.id === 2 && <Package className="w-6 h-6" />}
                    {step.id === 3 && <Truck className="w-6 h-6" />}
                    {step.id === 4 && <MapPin className="w-6 h-6" />}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={step.completed ? "text-foreground" : "text-muted-foreground"}>
                        {step.title}
                      </h4>
                      {step.completed && (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      {step.date}
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Delivery Address */}
            <Card className="p-6 border-border">
              <h3 className="text-foreground mb-4">Dirección de Entrega</h3>
              <div className="space-y-2 text-muted-foreground">
                <p className="text-foreground">Juan Pérez</p>
                <p>Calle Principal 123, 3º A</p>
                <p>28001 Madrid, España</p>
                <div className="flex items-center gap-2 mt-4">
                  <Phone className="w-4 h-4" />
                  <p>+34 600 000 000</p>
                </div>
              </div>
            </Card>

            {/* Contact Support */}
            <Card className="p-6 border-border">
              <h3 className="text-foreground mb-4">¿Necesitas Ayuda?</h3>
              <p className="text-muted-foreground mb-4">
                Nuestro equipo de soporte está aquí para ayudarte
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  soporte@ecomarket.com
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  +34 900 123 456
                </Button>
              </div>
            </Card>
          </div>

          {/* Order Items */}
          <Card className="p-6 border-border mb-6">
            <h3 className="text-foreground mb-4">Productos del Pedido</h3>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-foreground">
                      €{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      €{item.price} cada uno
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>€44.48</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between text-foreground">
                <span>Total</span>
                <span>€44.48</span>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onNavigate("home")}
            >
              Volver al Inicio
            </Button>
            <Button
              variant="outline"
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar Factura
            </Button>
            <Button
              onClick={() => onNavigate("returns")}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Gestionar Devolución
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
