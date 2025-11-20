import { useEffect, useState } from "react";
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
  onAddToCart?: (product: any, quantity: number) => void;
}

interface ProductoResponse {
  productoId: number;
  nombreProducto: string;
  descripcion: string;
  precio: number;
  precioOriginal?: number;
  stock: number;
  imagenPrincipal?: string;
  esOrganico: boolean;
  esVegano: boolean;
  calificacionPromedio: number;
  totalCalificaciones: number;
  nombreCategoria: string;
  nombreVendedor: string;
}

export function ProductCatalog({ onNavigate, onAddToCart }: ProductCatalogProps) {
  const [products, setProducts] = useState<ProductoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("relevance");
  const itemsPerPage = 6;

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8080/api/productos");
        if (!res.ok) throw new Error("Error al cargar productos");
        const data = await res.json();
        setProducts(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter((p) => p.precio >= priceRange[0] && p.precio <= priceRange[1])
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.precio - b.precio;
        case "price-high":
          return b.precio - a.precio;
        case "rating":
          return b.calificacionPromedio - a.calificacionPromedio;
        case "newest":
          return 0; // Would need fecha_creacion from backend
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Reintentar</Button>
        </div>
      </div>
    );
  }

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
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border border-border">
              <div>
                <p className="text-muted-foreground">
                  Mostrando <span className="text-foreground">{paginatedProducts.length}</span> de{" "}
                  <span className="text-foreground">{filteredProducts.length}</span> productos
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Más Relevantes</SelectItem>
                    <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                    <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
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
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay productos que coincidan con tus criterios.</p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {paginatedProducts.map((product) => (
                  <Card
                    key={product.productoId}
                    className={`overflow-hidden cursor-pointer hover:shadow-xl transition-shadow border-border group ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    <div
                      className={
                        viewMode === "list"
                          ? "w-48 flex-shrink-0"
                          : "aspect-square"
                      }
                      onClick={() => onNavigate("product")}
                    >
                      <ImageWithFallback
                        src={product.imagenPrincipal || "https://via.placeholder.com/300"}
                        alt={product.nombreProducto}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-3 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        {product.esOrganico && (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            Orgánico
                          </Badge>
                        )}
                        {product.stock < 10 && (
                          <Badge variant="outline" className="border-destructive/50 text-destructive">
                            Pocas unidades
                          </Badge>
                        )}
                      </div>
                      <div
                        onClick={() => onNavigate("product")}
                        className="flex-1"
                      >
                        <h4 className="text-foreground line-clamp-2 mb-2">
                          {product.nombreProducto}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {product.nombreVendedor}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          {product.nombreCategoria}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-primary font-semibold">€{product.precio.toFixed(2)}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm text-muted-foreground">
                            {product.calificacionPromedio.toFixed(1)} ({product.totalCalificaciones})
                          </span>
                        </div>
                      </div>
                      {onAddToCart && (
                        <Button
                          size="sm"
                          onClick={() => onAddToCart(product, 1)}
                          disabled={product.stock === 0}
                        >
                          {product.stock > 0 ? "Añadir al Carrito" : "Agotado"}
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
