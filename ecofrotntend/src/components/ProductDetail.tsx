import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Award, 
  Leaf, 
  Truck, 
  Shield,
  Plus,
  Minus
} from "lucide-react";

interface ProductDetailProps {
  onNavigate: (page: string) => void;
  onAddToCart: () => void;
}

export function ProductDetail({ onNavigate, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1667885098658-f34fed001418?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdmVnZXRhYmxlcyUyMG1hcmtldHxlbnwxfHx8fDE3NjA1NzU3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1589365252845-092198ba5334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHByb2R1Y3RzfGVufDF8fHx8MTc2MDU4NTEyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1648587456176-4969b0124b12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHBhY2thZ2luZ3xlbnwxfHx8fDE3NjA2MjA2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  ];

  const reviews = [
    {
      id: 1,
      author: "María González",
      rating: 5,
      date: "Hace 2 días",
      comment: "Excelente producto, muy buena calidad. Llegó en perfectas condiciones y el sabor es increíble.",
    },
    {
      id: 2,
      author: "Carlos Ruiz",
      rating: 4,
      date: "Hace 1 semana",
      comment: "Muy bueno, aunque el precio es un poco alto. La calidad lo compensa.",
    },
    {
      id: 3,
      author: "Ana Martínez",
      rating: 5,
      date: "Hace 2 semanas",
      comment: "Compra repetida. Producto 100% recomendable y el vendedor muy profesional.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border border-border bg-white">
              <ImageWithFallback
                src={images[selectedImage]}
                alt="Producto"
                className="w-full h-full object-cover cursor-zoom-in hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square overflow-hidden rounded-lg border-2 cursor-pointer transition-all ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`Vista ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <Badge className="mb-2 bg-primary/10 text-primary border-primary/20">
                    Certificado Orgánico
                  </Badge>
                  <h1 className="text-foreground mb-2">
                    Aceite de Oliva Orgánico Extra Virgen
                  </h1>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">(4.8) · 127 valoraciones</span>
              </div>
            </div>

            <div className="border-t border-b border-border py-4">
              <div className="flex items-baseline gap-2">
                <span className="text-primary">€12.99</span>
                <span className="text-muted-foreground line-through">€15.99</span>
                <Badge variant="destructive">-19%</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                IVA incluido · Envío calculado al finalizar la compra
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-foreground">Cantidad:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 text-foreground">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Badge variant="outline" className="border-primary/50 text-primary">
                  45 disponibles
                </Badge>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                  onClick={() => {
                    onAddToCart();
                    onNavigate("cart");
                  }}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Añadir al Carrito
                </Button>
                <Button variant="outline" size="lg">
                  Comprar Ahora
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-border">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Envío Gratis</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Pago Seguro</p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Garantía 30 días</p>
              </div>
            </div>

            {/* Seller Info */}
            <Card className="p-4 border-border">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-12 h-12 bg-primary/10">
                  <Leaf className="w-6 h-6 text-primary" />
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-foreground">EcoFarm S.L.</h4>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">4.9 (523 ventas)</span>
                  </div>
                </div>
                <Button variant="outline">Ver Tienda</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Productor certificado de productos ecológicos desde 2015. Envíos en 24-48h.
              </p>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-8">
          <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0">
            <TabsTrigger value="description" className="rounded-none">
              Descripción
            </TabsTrigger>
            <TabsTrigger value="certifications" className="rounded-none">
              Certificaciones
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-none">
              Valoraciones (127)
            </TabsTrigger>
            <TabsTrigger value="shipping" className="rounded-none">
              Envío y Devoluciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card className="p-6 border-border">
              <h3 className="text-foreground mb-4">Descripción del Producto</h3>
              <p className="text-muted-foreground mb-4">
                Aceite de oliva virgen extra de primera prensada en frío, procedente de olivares ecológicos certificados en Andalucía. 
                Producido siguiendo métodos tradicionales que respetan el medio ambiente y garantizan la máxima calidad.
              </p>
              <p className="text-muted-foreground mb-4">
                Este aceite destaca por su sabor afrutado y equilibrado, ideal para ensaladas, tostadas y platos mediterráneos. 
                Rico en antioxidantes naturales y ácidos grasos esenciales.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Leaf className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  100% aceitunas orgánicas españolas
                </li>
                <li className="flex items-start gap-2">
                  <Leaf className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  Sin pesticidas ni químicos sintéticos
                </li>
                <li className="flex items-start gap-2">
                  <Leaf className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  Botella de vidrio oscuro para preservar propiedades
                </li>
                <li className="flex items-start gap-2">
                  <Leaf className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  Producción sostenible y de comercio justo
                </li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="certifications" className="mt-6">
            <Card className="p-6 border-border">
              <h3 className="text-foreground mb-4">Certificaciones Ecológicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Award className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="text-foreground mb-1">Certificado Orgánico UE</h4>
                    <p className="text-sm text-muted-foreground">
                      Cumple con los estándares de agricultura ecológica de la Unión Europea
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Award className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="text-foreground mb-1">Denominación de Origen</h4>
                    <p className="text-sm text-muted-foreground">
                      Protegido por la D.O. Aceites de Andalucía
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Award className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="text-foreground mb-1">Producción Sostenible</h4>
                    <p className="text-sm text-muted-foreground">
                      Certificado de huella de carbono reducida
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Award className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="text-foreground mb-1">Comercio Justo</h4>
                    <p className="text-sm text-muted-foreground">
                      Garantiza precios justos para los productores
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="p-6 border-border">
              <div className="mb-6">
                <h3 className="text-foreground mb-4">Valoraciones de Clientes</h3>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-primary mb-2">4.8</div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">127 valoraciones</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-t border-border pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-foreground">{review.author}</h4>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <Card className="p-6 border-border">
              <h3 className="text-foreground mb-4">Información de Envío</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-foreground mb-2">Envío Gratuito</h4>
                  <p className="text-muted-foreground">
                    Envío gratis en pedidos superiores a €30. Entrega en 3-5 días laborables.
                  </p>
                </div>
                <div>
                  <h4 className="text-foreground mb-2">Política de Devoluciones</h4>
                  <p className="text-muted-foreground">
                    Aceptamos devoluciones dentro de los 30 días posteriores a la compra. 
                    El producto debe estar sin abrir y en su embalaje original.
                  </p>
                </div>
                <div>
                  <h4 className="text-foreground mb-2">Garantía de Calidad</h4>
                  <p className="text-muted-foreground">
                    Todos nuestros productos están garantizados. Si no estás satisfecho, 
                    te devolvemos el 100% de tu dinero.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
