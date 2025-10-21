import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Filter, Grid3x3, List, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCatalogProps {
  onNavigate: (page: string) => void;
}

const products = [
  {
    id: 1,
    name: "Aceite de Oliva Orgánico Extra Virgen",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1667885098658-f34fed001418?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdmVnZXRhYmxlcyUyMG1hcmtldHxlbnwxfHx8fDE3NjA1NzU3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Alimentación",
    certification: "Certificado Orgánico",
    origin: "España",
    rating: 4.8,
    stock: 45,
  },
  {
    id: 2,
    name: "Set de Productos Ecológicos para el Hogar",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1589365252845-092198ba5334?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMHByb2R1Y3RzfGVufDF8fHx8MTc2MDU4NTEyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Hogar Ecológico",
    certification: "100% Biodegradable",
    origin: "Alemania",
    rating: 4.9,
    stock: 23,
  },
  {
    id: 3,
    name: "Embalaje Sostenible Reutilizable",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1648587456176-4969b0124b12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHBhY2thZ2luZ3xlbnwxfHx8fDE3NjA2MjA2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Hogar Ecológico",
    certification: "Zero Waste",
    origin: "Francia",
    rating: 4.7,
    stock: 67,
  },
  {
    id: 4,
    name: "Cosméticos Naturales Veganos",
    price: 18.5,
    image:
      "https://images.unsplash.com/photo-1614267861476-0d129972a0f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwY29zbWV0aWNzfGVufDF8fHx8MTc2MDYyMjQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Cosmética Natural",
    certification: "Cruelty Free",
    origin: "Italia",
    rating: 4.9,
    stock: 34,
  },
  {
    id: 5,
    name: "Ropa Orgánica de Algodón",
    price: 32.0,
    image:
      "https://images.unsplash.com/photo-1554967651-3997ad1c43b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzYwNTc2ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Textil Sostenible",
    certification: "GOTS Certificado",
    origin: "Portugal",
    rating: 4.6,
    stock: 18,
  },
  {
    id: 6,
    name: "Jabón Artesanal Natural",
    price: 6.5,
    image:
      "https://images.unsplash.com/photo-1614267861476-0d129972a0f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwY29zbWV0aWNzfGVufDF8fHx8MTc2MDYyMjQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Cuidado Personal",
    certification: "Hecho a Mano",
    origin: "España",
    rating: 4.8,
    stock: 89,
  },
];

const categories = [
  "Alimentación",
  "Cosmética Natural",
  "Textil Sostenible",
  "Hogar Ecológico",
  "Cuidado Personal",
];
const certifications = [
  "Certificado Orgánico",
  "100% Biodegradable",
  "Zero Waste",
  "Cruelty Free",
  "GOTS Certificado",
];
const origins = ["España", "Francia", "Italia", "Portugal", "Alemania"];

export function ProductCatalog({ onNavigate }: ProductCatalogProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<
    string[]
  >([]);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);

  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    item: string,
    checked: boolean
  ) => {
    setter((prev) =>
      checked ? [...prev, item] : prev.filter((i) => i !== item)
    );
  };

  const applyFilters = () => {
    console.log("Applying filters:", {
      priceRange,
      categories: selectedCategories,
      certifications: selectedCertifications,
      origins: selectedOrigins,
    });
    // Aquí iría la lógica para filtrar los `products` y actualizar la vista
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <Card className="p-6 sticky top-24 border-border">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h3 className="text-foreground">Filtros</h3>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-foreground mb-3">Categoría</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            setSelectedCategories,
                            category,
                            !!checked
                          )
                        }
                      />
                      <span className="text-sm text-muted-foreground">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-foreground mb-3">Precio</h4>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>€{priceRange[0]}</span>
                  <span>€{priceRange[1]}</span>
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-6">
                <h4 className="text-foreground mb-3">Certificación</h4>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <label
                      key={cert}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedCertifications.includes(cert)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            setSelectedCertifications,
                            cert,
                            !!checked
                          )
                        }
                      />
                      <span className="text-sm text-muted-foreground">
                        {cert}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Origin */}
              <div className="mb-6">
                <h4 className="text-foreground mb-3">Origen</h4>
                <div className="space-y-2">
                  {origins.map((origin) => (
                    <label
                      key={origin}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedOrigins.includes(origin)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            setSelectedOrigins,
                            origin,
                            !!checked
                          )
                        }
                      />
                      <span className="text-sm text-muted-foreground">
                        {origin}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                onClick={applyFilters}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Aplicar Filtros
              </Button>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border border-border">
              <div>
                <p className="text-muted-foreground">
                  Mostrando{" "}
                  <span className="text-foreground">{products.length}</span>{" "}
                  productos
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Más Relevantes</SelectItem>
                    <SelectItem value="price-low">
                      Precio: Menor a Mayor
                    </SelectItem>
                    <SelectItem value="price-high">
                      Precio: Mayor a Menor
                    </SelectItem>
                    <SelectItem value="rating">Mejor Valorados</SelectItem>
                    <SelectItem value="newest">Más Recientes</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8"
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {products.map((product) => (
                <Card
                  key={product.id}
                  className={`overflow-hidden cursor-pointer hover:shadow-xl transition-shadow border-border group ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                  onClick={() => onNavigate("product")}
                >
                  <div
                    className={
                      viewMode === "list"
                        ? "w-48 flex-shrink-0"
                        : "aspect-square"
                    }
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-3 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {product.certification}
                      </Badge>
                      {product.stock < 30 && (
                        <Badge
                          variant="outline"
                          className="border-destructive/50 text-destructive"
                        >
                          Pocas unidades
                        </Badge>
                      )}
                    </div>
                    <h4 className="text-foreground line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Origen: {product.origin}
                    </p>
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
                      Stock: {product.stock} unidades
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
