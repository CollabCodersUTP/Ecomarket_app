
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import { Filter, Grid3x3, List, ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { useProductos } from "../hooks/useProductos";
import { useCategorias } from "../hooks/useCategorias";
import { productoService } from "../services/productoService";
import { Alert, AlertDescription } from "./ui/alert";

export function ProductCatalog() {
  const navigate = useNavigate();
  const { productos: productosBackend, loading, error } = useProductos();
  const { categorias, loading: loadingCategorias } = useCategorias();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("relevance");
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [esOrganico, setEsOrganico] = useState<boolean | undefined>(undefined);
  const [esVegano, setEsVegano] = useState<boolean | undefined>(undefined);

  const handleCheckboxChange = (
    setter: React.Dispatch<React.SetStateAction<number[]>>,
    item: number,
    checked: boolean
  ) => {
    setter((prev) =>
      checked ? [...prev, item] : prev.filter((i) => i !== item)
    );
    setCurrentPage(1);
  };

  // Filtrar y ordenar productos
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = productosBackend.filter((product) => {
      if (!product.estaActivo) return false;

      if (selectedCategories.length > 0) {
        const categoriasSeleccionadas = categorias
          .filter(cat => selectedCategories.includes(cat.categoriaId))
          .map(cat => cat.nombreCategoria);

        if (!categoriasSeleccionadas.includes(product.categoria)) {
          return false;
        }
      }

      if (product.precio < priceRange[0] || product.precio > priceRange[1]) {
        return false;
      }

      if (esOrganico !== undefined && product.esOrganico !== esOrganico) {
        return false;
      }

      if (esVegano !== undefined && product.esVegano !== esVegano) {
        return false;
      }

      return true;
    });

    return productoService.sortProducts(filtered, sortBy as any);
  }, [productosBackend, selectedCategories, categorias, priceRange, esOrganico, esVegano, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setEsOrganico(undefined);
    setEsVegano(undefined);
    setPriceRange([0, 100]);
    setCurrentPage(1);
  };

  if (loading || loadingCategorias) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="mt-4 w-full"
            >
              Reintentar
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <Card className="p-6 sticky top-24 border-border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  <h3 className="text-foreground">Filtros</h3>
                </div>
                {(selectedCategories.length > 0 ||
                  esOrganico !== undefined ||
                  esVegano !== undefined ||
                  priceRange[0] !== 0 ||
                  priceRange[1] !== 100) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Limpiar
                  </Button>
                )}
              </div>

              <div className="mb-6">
                <h4 className="text-foreground mb-3">Categoría</h4>
                <div className="space-y-2">
                  {categorias.filter(cat => cat.estaActiva).map((categoria) => (
                    <label
                      key={categoria.categoriaId}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedCategories.includes(categoria.categoriaId)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(
                            setSelectedCategories,
                            categoria.categoriaId,
                            !!checked
                          )
                        }
                      />
                      <span className="text-sm text-muted-foreground">
                        {categoria.nombreCategoria}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-foreground mb-3">Precio</h4>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={priceRange}
                  onValueChange={(value) => {
                    setPriceRange(value);
                    setCurrentPage(1);
                  }}
                  className="mb-2"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>€{priceRange[0]}</span>
                  <span>€{priceRange[1]}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-foreground mb-3">Características</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={esOrganico === true}
                      onCheckedChange={(checked) => {
                        setEsOrganico(checked ? true : undefined);
                        setCurrentPage(1);
                      }}
                    />
                    <span className="text-sm text-muted-foreground">Orgánico</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={esVegano === true}
                      onCheckedChange={(checked) => {
                        setEsVegano(checked ? true : undefined);
                        setCurrentPage(1);
                      }}
                    />
                    <span className="text-sm text-muted-foreground">Vegano</span>
                  </label>
                </div>
              </div>
            </Card>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border border-border">
              <div>
                <p className="text-muted-foreground">
                  Mostrando{" "}
                  <span className="text-foreground">
                    {filteredAndSortedProducts.length}
                  </span>{" "}
                  {filteredAndSortedProducts.length === 1 ? "producto" : "productos"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Mostrar:</span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => {
                      setItemsPerPage(Number(value));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                      <SelectItem value="48">48</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Más Relevantes</SelectItem>
                    <SelectItem value="precio-asc">Precio: Menor a Mayor</SelectItem>
                    <SelectItem value="precio-desc">Precio: Mayor a Menor</SelectItem>
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

            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No se encontraron productos con los filtros seleccionados.
                </p>
                <Button onClick={handleClearFilters} className="mt-4" variant="outline">
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                    : "space-y-4"
                }
              >
                {paginatedProducts.map((product) => (
                  <Card
                    key={product.productoId}
                    className={`overflow-hidden cursor-pointer hover:shadow-xl transition-shadow border-border group ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                    onClick={() => navigate(`/product/${product.productoId}`)}
                  >
                    <div
                      className={viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-square"}
                    >
                      <ImageWithFallback
                        src={product.imagenPrincipal || ""}
                        alt={product.nombreProducto}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-3 flex-1">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        {product.esOrganico && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                            Orgánico
                          </Badge>
                        )}
                        {product.esVegano && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                            Vegano
                          </Badge>
                        )}
                        {product.estaVerificado && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                            Verificado
                          </Badge>
                        )}
                        {product.stock < 30 && (
                          <Badge variant="outline" className="border-destructive/50 text-destructive text-xs">
                            Pocas unidades
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-foreground line-clamp-2 font-medium text-sm">
                        {product.nombreProducto}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {product.categoria}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-primary font-bold text-lg">
                            €{product.precio.toFixed(2)}
                          </span>
                          {product.precioOriginal && product.precioOriginal > product.precio && (
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              €{product.precioOriginal.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm text-muted-foreground">
                            {product.calificacionPromedio.toFixed(1)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({product.totalCalificaciones})
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Stock: {product.stock} unidades
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}

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
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="text-muted-foreground">...</span>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
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