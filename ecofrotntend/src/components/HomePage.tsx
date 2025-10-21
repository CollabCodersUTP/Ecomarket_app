import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Leaf, ShoppingBag, Users, Award, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const categories = [
  { name: "Alimentación", icon: "🥬", products: 234 },
  { name: "Cosmética Natural", icon: "🧴", products: 156 },
  { name: "Textil Sostenible", icon: "👕", products: 189 },
  { name: "Hogar Ecológico", icon: "🏡", products: 112 },
  { name: "Cuidado Personal", icon: "🌿", products: 98 },
  { name: "Bebés y Niños", icon: "🍼", products: 87 },
];

const featuredProducts = [
  {
    id: 1,
    name: "Aceite de Oliva Orgánico Extra Virgen",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1667885098658-f34fed001418?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdmVnZXRhYmxlcyUyMG1hcmtldHxlbnwxfHx8fDE3NjA1NzU3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    certification: "Certificado Orgánico",
    seller: "EcoFarm S.L.",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Set de Productos Ecológicos para el Hogar",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1589365252845-092198ba5334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHByb2R1Y3RzfGVufDF8fHx8MTc2MDU4NTEyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    certification: "100% Biodegradable",
    seller: "Green Home",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Embalaje Sostenible Reutilizable",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1648587456176-4969b0124b12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHBhY2thZ2luZ3xlbnwxfHx8fDE3NjA2MjA2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    certification: "Zero Waste",
    seller: "PackGreen",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Cosméticos Naturales Veganos",
    price: 18.50,
    image: "https://images.unsplash.com/photo-1614267861476-0d129972a0f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwY29zbWV0aWNzfGVufDF8fHx8MTc2MDYyMjQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    certification: "Cruelty Free",
    seller: "Natural Beauty Co.",
    rating: 4.9,
  },
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-primary">
              Marketplace de Productos Ecológicos y Sostenibles
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conectamos productores responsables con consumidores conscientes. Descubre productos certificados que cuidan de ti y del planeta.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button
                onClick={() => onNavigate("catalog")}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Explorar Productos
              </Button>
              <Button
                onClick={() => onNavigate("vendor")}
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Vender en Ecomarket
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-foreground">Certificación Verificada</h4>
                <p className="text-muted-foreground text-sm">
                  Todos los productos son certificados
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-foreground">Comunidad Sostenible</h4>
                <p className="text-muted-foreground text-sm">
                  Más de 5,000 vendedores comprometidos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-foreground">Impacto Positivo</h4>
                <p className="text-muted-foreground text-sm">
                  Reducción de huella de carbono garantizada
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-foreground mb-2">Categorías Principales</h2>
          <p className="text-muted-foreground">
            Explora nuestra amplia selección de productos ecológicos
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-border hover:border-primary/50"
              onClick={() => onNavigate("catalog")}
            >
              <div className="text-center space-y-2">
                <div className="text-4xl mb-2">{category.icon}</div>
                <h4 className="text-foreground">{category.name}</h4>
                <p className="text-muted-foreground text-sm">
                  {category.products} productos
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-foreground mb-2">Productos Destacados</h2>
            <p className="text-muted-foreground">
              Los favoritos de nuestra comunidad ecológica
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow border-border group"
                onClick={() => onNavigate("product")}
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {product.certification}
                  </Badge>
                  <h4 className="text-foreground line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-primary">€{product.price}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-muted-foreground">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    por {product.seller}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-primary-foreground mb-4">
            ¿Eres Productor Ecológico?
          </h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Únete a nuestra comunidad de vendedores comprometidos con la sostenibilidad. 
            Llega a miles de clientes que valoran productos responsables.
          </p>
          <Button
            onClick={() => onNavigate("vendor")}
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
          >
            Comenzar a Vender
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
