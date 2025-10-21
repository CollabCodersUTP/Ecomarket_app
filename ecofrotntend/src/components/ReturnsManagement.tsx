import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  PackageX, 
  RotateCcw, 
  CheckCircle2, 
  Clock,
  AlertCircle,
  Upload
} from "lucide-react";

interface ReturnsManagementProps {
  onNavigate: (page: string) => void;
}

const returnHistory = [
  {
    id: "#RET-001",
    order: "#ECO-1230",
    product: "Jabón Natural Lavanda",
    date: "12 Oct 2024",
    status: "approved",
    refundAmount: 6.50,
  },
  {
    id: "#RET-002",
    order: "#ECO-1215",
    product: "Bolsa Algodón",
    date: "05 Oct 2024",
    status: "processing",
    refundAmount: 8.99,
  },
  {
    id: "#RET-003",
    order: "#ECO-1198",
    product: "Aceite Oliva Orgánico",
    date: "28 Sep 2024",
    status: "completed",
    refundAmount: 12.99,
  },
];

export function ReturnsManagement({ onNavigate }: ReturnsManagementProps) {
  const [returnReason, setReturnReason] = useState("damaged");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-foreground mb-2">Gestión de Devoluciones y Reembolsos</h1>
            <p className="text-muted-foreground">
              Solicita devoluciones y consulta el historial de tus solicitudes
            </p>
          </div>

          <Tabs defaultValue="new-return" className="space-y-6">
            <TabsList className="bg-white border border-border">
              <TabsTrigger value="new-return">Nueva Devolución</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
              <TabsTrigger value="policy">Política de Devoluciones</TabsTrigger>
            </TabsList>

            {/* New Return Tab */}
            <TabsContent value="new-return">
              <Card className="p-6 border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <PackageX className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-foreground">Solicitar Devolución</h3>
                    <p className="text-sm text-muted-foreground">
                      Completa el formulario para iniciar el proceso
                    </p>
                  </div>
                </div>

                <form className="space-y-6">
                  {/* Order Selection */}
                  <div className="space-y-2">
                    <Label>Selecciona el Pedido</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4 p-4 border border-border rounded-lg cursor-pointer hover:border-primary">
                        <RadioGroup defaultValue="order-1" className="flex-1">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="order-1" id="order-1" />
                            <Label htmlFor="order-1" className="flex-1 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                                    <ImageWithFallback
                                      src="https://images.unsplash.com/photo-1667885098658-f34fed001418?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdmVnZXRhYmxlcyUyMG1hcmtldHxlbnwxfHx8fDE3NjA1NzU3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                      alt="Producto"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <div className="text-foreground">Aceite de Oliva Orgánico</div>
                                    <div className="text-sm text-muted-foreground">
                                      Pedido #ECO-2024-1234 · Entregado el 10 Oct 2024
                                    </div>
                                  </div>
                                </div>
                                <div className="text-foreground">€12.99</div>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  {/* Return Reason */}
                  <div className="space-y-2">
                    <Label>Motivo de la Devolución</Label>
                    <RadioGroup value={returnReason} onValueChange={setReturnReason}>
                      <div className="flex items-center space-x-2 p-3 border border-border rounded-lg cursor-pointer hover:border-primary">
                        <RadioGroupItem value="damaged" id="damaged" />
                        <Label htmlFor="damaged" className="flex-1 cursor-pointer">
                          <div className="text-foreground">Producto dañado o defectuoso</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border border-border rounded-lg cursor-pointer hover:border-primary">
                        <RadioGroupItem value="wrong-item" id="wrong-item" />
                        <Label htmlFor="wrong-item" className="flex-1 cursor-pointer">
                          <div className="text-foreground">Producto incorrecto</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border border-border rounded-lg cursor-pointer hover:border-primary">
                        <RadioGroupItem value="not-as-described" id="not-as-described" />
                        <Label htmlFor="not-as-described" className="flex-1 cursor-pointer">
                          <div className="text-foreground">No coincide con la descripción</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border border-border rounded-lg cursor-pointer hover:border-primary">
                        <RadioGroupItem value="changed-mind" id="changed-mind" />
                        <Label htmlFor="changed-mind" className="flex-1 cursor-pointer">
                          <div className="text-foreground">Cambio de opinión</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border border-border rounded-lg cursor-pointer hover:border-primary">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other" className="flex-1 cursor-pointer">
                          <div className="text-foreground">Otro motivo</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción Detallada</Label>
                    <Textarea
                      id="description"
                      placeholder="Por favor, proporciona más detalles sobre el motivo de la devolución..."
                      rows={5}
                    />
                  </div>

                  {/* Photos Upload */}
                  <div className="space-y-2">
                    <Label>Fotos del Producto (Opcional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-foreground mb-1">
                        Arrastra imágenes aquí o haz clic para seleccionar
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Las fotos ayudan a procesar tu devolución más rápido
                      </p>
                    </div>
                  </div>

                  {/* Refund Method */}
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-start gap-3">
                      <RotateCcw className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-foreground mb-1">Método de Reembolso</h4>
                        <p className="text-sm text-muted-foreground">
                          El reembolso se realizará automáticamente al método de pago original 
                          dentro de 5-10 días hábiles una vez aprobada la devolución.
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onNavigate("orders")}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Enviar Solicitud de Devolución
                    </Button>
                  </div>
                </form>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <Card className="border-border">
                <div className="p-6 border-b border-border">
                  <h3 className="text-foreground">Historial de Devoluciones</h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Devolución</TableHead>
                      <TableHead>Pedido</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Reembolso</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {returnHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-foreground">{item.id}</TableCell>
                        <TableCell className="text-muted-foreground">{item.order}</TableCell>
                        <TableCell className="text-muted-foreground">{item.product}</TableCell>
                        <TableCell className="text-muted-foreground">{item.date}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : item.status === "processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {item.status === "approved" ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Aprobado
                              </>
                            ) : item.status === "processing" ? (
                              <>
                                <Clock className="w-3 h-3 mr-1" />
                                Procesando
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Completado
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-foreground">€{item.refundAmount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Policy Tab */}
            <TabsContent value="policy">
              <Card className="p-6 border-border">
                <h3 className="text-foreground mb-6">Política de Devoluciones y Reembolsos</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-foreground mb-2">Plazo de Devolución</h4>
                    <p className="text-muted-foreground">
                      Aceptamos devoluciones dentro de los 30 días posteriores a la recepción del pedido. 
                      Los productos deben estar sin abrir, sin usar y en su embalaje original.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-foreground mb-2">Productos No Retornables</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        Productos de higiene personal abiertos
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        Productos alimenticios perecederos
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        Productos personalizados o hechos a medida
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-foreground mb-2">Proceso de Reembolso</h4>
                    <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
                      <li>Solicita la devolución a través del formulario</li>
                      <li>Espera la aprobación del vendedor (1-2 días hábiles)</li>
                      <li>Envía el producto de vuelta al vendedor</li>
                      <li>Una vez recibido y verificado, se procesará el reembolso</li>
                      <li>El reembolso llegará a tu cuenta en 5-10 días hábiles</li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="text-foreground mb-2">Gastos de Envío</h4>
                    <p className="text-muted-foreground">
                      Si el producto está defectuoso o se envió incorrectamente, cubriremos los gastos de envío 
                      de la devolución. En otros casos, los gastos de envío correrán a cargo del comprador.
                    </p>
                  </div>

                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-foreground mb-1">Garantía de Satisfacción</h4>
                        <p className="text-sm text-muted-foreground">
                          Tu satisfacción es nuestra prioridad. Si tienes algún problema con tu pedido, 
                          nuestro equipo de soporte está aquí para ayudarte.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
