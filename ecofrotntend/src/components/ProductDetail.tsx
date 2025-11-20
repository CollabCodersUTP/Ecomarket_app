import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Minus,
  Loader2,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { useProducto } from "../hooks/useProductos";
import { Alert, AlertDescription } from "./ui/alert";

interface ProductDetailProps {
  onAddToCart: () => void;
}

export function ProductDetail({ onAddToCart }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { producto, loading, error } = useProducto(Number(id));
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Imágenes de ejemplo (puedes agregar más imágenes desde el backend)
  const images = producto?.imagenPrincipal
    ? [producto.imagenPrincipal, producto.imagenPrincipal, producto.imagenPrincipal]
    : [];

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || "Producto no encontrado"}
            <Button
              onClick={() => navigate("/catalog")}
              variant="outline"
              className="mt-4 w-full"
            >
              Volver al catálogo
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const descuento = producto.precioOriginal && producto.precioOriginal > producto.precio
    ? Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Botón volver */}
        <Button
          variant="ghost"
          onClick={() => navigate("/catalog")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al catálogo
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border border-border bg-white">
              <ImageWithFallback
                src={images[selectedImage] || ""}
                alt={producto.nombreProducto}
                className="w-full h-full object-cover cursor-zoom-in hover:scale-110 transition-transform duration-300"
              />
            </div>
            {images.length > 1 && (
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
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {producto.esOrganico && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Orgánico
                      </Badge>
                    )}
                    {producto.esVegano && (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Vegano
                      </Badge>
                    )}
                    {producto.estaVerificado && (
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        Certificado
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {producto.nombreProducto}
                  </h1>
                  <p className="text-muted-foreground">
                    Categoría: {producto.categoria}
                  </p>
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
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(producto.calificacionPromedio)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  ({producto.calificacionPromedio.toFixed(1)}) · {producto.totalCalificaciones} valoraciones
                </span>
              </div>
            </div>

            <div className="border-t border-b border-border py-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">
                  €{producto.precio.toFixed(2)}
                </span>
                {producto.precioOriginal && descuento > 0 && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      €{producto.precioOriginal.toFixed(2)}
                    </span>
                    <Badge variant="destructive">-{descuento}%</Badge>
                  </>
                )}
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
                    disabled={producto.stock === 0}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 text-foreground">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(producto.stock, quantity + 1))}
                    disabled={producto.stock === 0}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Badge
                  variant="outline"
                  className={`border-primary/50 ${producto.stock < 10 ? 'text-destructive border-destructive/50' : 'text-primary'}`}
                >
                  {producto.stock} disponibles
                </Badge>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                  onClick={() => {
                    onAddToCart();
                    alert(`${quantity} ${producto.nombreProducto} añadido al carrito`);
                  }}
                  disabled={producto.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {producto.stock === 0 ? "Sin stock" : "Añadir al Carrito"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    onAddToCart();
                    navigate("/checkout");
                  }}
                  disabled={producto.stock === 0}
                >
                  Comprar Ahora
                </Button>
              </div>

              {producto.stock > 0 && producto.stock < 10 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    ¡Última oportunidad! Solo quedan {producto.stock} unidades disponibles
                  </AlertDescription>
                </Alert>
              )}
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
                  <h4 className="text-foreground">{producto.vendedor}</h4>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">4.9 (523 ventas)</span>
                  </div>
                </div>
                <Button variant="outline">Ver Tienda</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Productor certificado de productos ecológicos. Envíos en 24-48h.
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
              Valoraciones ({producto.totalCalificaciones})
            </TabsTrigger>
            <TabsTrigger value="shipping" className="rounded-none">
              Envío y Devoluciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card className="p-6 border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">Descripción del Producto</h3>
              <p className="text-muted-foreground mb-4">
                {producto.descripcion}
              </p>
              <ul className="space-y-2 text-muted-foreground">
                {producto.esOrganico && (
                  <li className="flex items-start gap-2">
                    <Leaf className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    100% producto orgánico certificado
                  </li>
                )}
                {producto.esVegano && (
                  <li className="flex items-start gap-2">
                    <Leaf className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    Apto para veganos
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <Leaf className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  Sin pesticidas ni químicos sintéticos
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
              <h3 className="text-xl font-semibold text-foreground mb-4">Certificaciones Ecológicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {producto.esOrganico && (
                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <Award className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="text-foreground font-semibold mb-1">Certificado Orgánico UE</h4>
                      <p className="text-sm text-muted-foreground">
                        Cumple con los estándares de agricultura ecológica de la Unión Europea
                      </p>
                    </div>
                  </div>
                )}
                {producto.estaVerificado && (
                  <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                    <Award className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="text-foreground font-semibold mb-1">Producto Verificado</h4>
                      <p className="text-sm text-muted-foreground">
                        Verificado por nuestra plataforma
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Award className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Producción Sostenible</h4>
                    <p className="text-sm text-muted-foreground">
                      Certificado de huella de carbono reducida
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Award className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Comercio Justo</h4>
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
                <h3 className="text-xl font-semibold text-foreground mb-4">Valoraciones de Clientes</h3>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {producto.calificacionPromedio.toFixed(1)}
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(producto.calificacionPromedio)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {producto.totalCalificaciones} valoraciones
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-t border-border pt-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-foreground font-semibold">{review.author}</h4>
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
              <h3 className="text-xl font-semibold text-foreground mb-4">Información de Envío</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Envío Gratuito</h4>
                  <p className="text-muted-foreground">
                    Envío gratis en pedidos superiores a €30. Entrega en 3-5 días laborables.
                  </p>
                </div>
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Política de Devoluciones</h4>
                  <p className="text-muted-foreground">
                    Aceptamos devoluciones dentro de los 30 días posteriores a la compra.
                    El producto debe estar sin abrir y en su embalaje original.
                  </p>
                </div>
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Garantía de Calidad</h4>
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