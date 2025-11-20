import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Package,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit,
  Eye,
  Trash2,
  Upload,
  BarChart3,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface VendorDashboardProps {
  onNavigate: (page: string) => void;
}

interface ProductoVendedor {
  productoId: number;
  nombreProducto: string;
  descripcion: string;
  precio: number;
  precioOriginal: number;
  stock: number;
  esOrganico: boolean;
  esVegano: boolean;
  nombreCategoria: string;
  nombreVendedor: string;
  imagenPrincipal: string;
  estaActivo: boolean;
  estaVerificado: boolean;
  fechaCreacion: string;
}

type Category = {
  categoriaId: number;
  nombreCategoria: string;
  descripcion: string;
  imagenUrl: null;
};

const salesData = [
  { name: "Ene", ventas: 4000 },
  { name: "Feb", ventas: 3000 },
  { name: "Mar", ventas: 5000 },
  { name: "Abr", ventas: 4500 },
  { name: "May", ventas: 6000 },
  { name: "Jun", ventas: 5500 },
];

export function VendorDashboard({ onNavigate }: VendorDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Categories
  const [category, setCategory] = useState<Category[] | undefined>();

  // Products
  const [productos, setProductos] = useState<ProductoVendedor[] | undefined>();

  // Form states for Add Product
  const [productName, setProductName] = useState("");
  const [categoryForm, setCategoryForm] = useState("");
  const [categoryIdForm, setCategoryIdForm] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [esOrganico, setEsOrganico] = useState(false);
  const [esVegano, setEsVegano] = useState(false);

  // User and error states
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSelectedChange = (selectedElement: string) => {
    setCategoryForm(selectedElement);
    if (category) {
      const selectedCat = category.find((cat) => cat.nombreCategoria === selectedElement);
      if (selectedCat) {
        setCategoryIdForm(selectedCat.categoriaId);
      }
    }
  };

  useEffect(() => {
    setProductos(undefined);

    switch (activeTab) {
      case "overview":
        break;

      case "products":
        const fetchProd = async () => {
          const responseProducts = await fetch("http://localhost:8080/api/productos");
          if (responseProducts.ok) {
            const data = await responseProducts.json();
            setProductos(data);
          }
        };
        fetchProd().catch((e) => console.log(e));
        break;

      case "add-product":
        const fetchCat = async () => {
          const responseCategories = await fetch("http://localhost:8080/api/categorias");
          if (responseCategories.ok) {
            const data = await responseCategories.json();
            setCategory(data);
          }
        };
        fetchCat().catch((e) => console.log(e));
        break;
    }
  }, [activeTab]);

  // Load user from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  // Load vendor products
  useEffect(() => {
    if (user) {
      cargarProductos();
    }
  }, [user]);

  const cargarProductos = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/productos/vendedor/${user.usuarioId}`
      );
      if (response.ok) {
        const data = await response.json();
        setProductos(data);
      }
    } catch (err) {
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const handlePublishProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!productName || !categoryForm || !description || !price || !stock) {
      setError("Todos los campos son requeridos");
      return;
    }

    if (!user) {
      setError("Debe estar autenticado");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        nombreProducto: productName,
        descripcion: description,
        precio: parseFloat(price),
        stock: parseInt(stock),
        categoriaId: categoryIdForm,
        esOrganico,
        esVegano,
      };

      const response = await fetch("http://localhost:8080/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(
          "Producto publicado correctamente. Pendiente de verificación."
        );
        setProductName("");
        setCategoryForm("");
        setDescription("");
        setPrice("");
        setStock("");
        setEsOrganico(false);
        setEsVegano(false);
        setActiveTab("products");
        await cargarProductos();
      } else {
        const errorData = await response.text();
        setError(errorData || "Error al publicar producto");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarProducto = async (productoId: number) => {
    if (
      !user ||
      !confirm("¿Está seguro de que desea eliminar este producto?")
    ) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/productos/${productoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        setSuccess("Producto eliminado correctamente");
        await cargarProductos();
      } else {
        setError("Error al eliminar producto");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-foreground mb-2">Panel de Vendedor</h1>
          <p className="text-muted-foreground">
            Gestiona tus productos y visualiza tus métricas
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-white border border-border">
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="products">Mis Productos</TabsTrigger>
            <TabsTrigger value="add-product">Añadir Producto</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
          </TabsList>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800">{success}</p>
            </div>
          )}

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Ventas Totales</span>
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div className="text-foreground mb-1">€24,567</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  +12.5% vs mes anterior
                </div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Pedidos</span>
                  <ShoppingBag className="w-5 h-5 text-primary" />
                </div>
                <div className="text-foreground mb-1">417</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  +8.2% vs mes anterior
                </div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Productos</span>
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div className="text-foreground mb-1">23</div>
                <div className="text-sm text-muted-foreground">3 activos</div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Valoración</span>
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div className="text-foreground mb-1">4.9 ⭐</div>
                <div className="text-sm text-muted-foreground">
                  523 valoraciones
                </div>
              </Card>
            </div>

            {/* Sales Chart */}
            <Card className="p-6 border-border">
              <h3 className="text-foreground mb-6">Evolución de Ventas</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient
                      id="colorVentas"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#2d5a2d" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2d5a2d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8f1e8" />
                  <XAxis dataKey="name" stroke="#5a6b5a" />
                  <YAxis stroke="#5a6b5a" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="ventas"
                    stroke="#2d5a2d"
                    fillOpacity={1}
                    fill="url(#colorVentas)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Recent Products */}
            <Card className="p-6 border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-foreground">Productos Recientes</h3>
                <Button variant="outline" size="sm">
                  Ver Todos
                </Button>
              </div>
              <div className="space-y-3">
                {productos && productos.slice(0, 3).map((producto: ProductoVendedor) => (
                  <div
                    key={producto.productoId}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div>
                      <h4 className="text-foreground">
                        {producto.nombreProducto}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {producto.nombreCategoria}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-primary">€{producto.precio}</div>
                      <Badge
                        variant={
                          producto.stock > 20 ? "default" : "destructive"
                        }
                        className="mt-1"
                      >
                        Stock: {producto.stock}
                      </Badge>
                    </div>
                  </div>
                ))}
                {!productos || productos.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    No hay productos aún
                  </p>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="border-border">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-foreground">Gestión de Productos</h3>
                  <Button
                    onClick={() => setActiveTab("add-product")}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Producto
                  </Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Ventas</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productos && productos.map((producto: ProductoVendedor) => (
                    <TableRow key={producto.productoId}>
                      <TableCell>
                        <div className="text-foreground">
                          {producto.nombreProducto}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {producto.nombreCategoria}
                      </TableCell>
                      <TableCell className="text-foreground">
                        €{producto.precio.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            producto.stock > 20 ? "default" : "destructive"
                          }
                        >
                          {producto.stock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">-</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            producto.estaActivo ? "default" : "secondary"
                          }
                          className={
                            producto.estaActivo
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {producto.estaActivo ? "Activo" : "Stock Bajo"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleEliminarProducto(producto.productoId)
                            }
                            disabled={loading}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Add Product Tab */}
          <TabsContent value="add-product">
            <Card className="p-6 border-border max-w-3xl">
              <h3 className="text-foreground mb-6">Añadir Nuevo Producto</h3>
              <form onSubmit={handlePublishProduct} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Nombre del Producto *</Label>
                  <Input
                    id="product-name"
                    placeholder="Ej: Aceite de Oliva Orgánico Extra Virgen"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría *</Label>
                    <Select value={categoryForm} onValueChange={handleSelectedChange}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {category && category.map((cat) => (
                          <SelectItem key={cat.categoriaId} value={String(cat.categoriaId)}>
                            {cat.nombreCategoria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Certificaciones</Label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={esOrganico}
                          onChange={(e) => setEsOrganico(e.target.checked)}
                        />
                        <span className="text-sm">Orgánico</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={esVegano}
                          onChange={(e) => setEsVegano(e.target.checked)}
                        />
                        <span className="text-sm">Vegano</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción Ecológica *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe las características ecológicas de tu producto, origen, proceso de producción sostenible..."
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio (€) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Inicial *</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="0"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU (opcional)</Label>
                    <Input id="sku" placeholder="Código interno (opcional)" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Imágenes del Producto *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-foreground mb-1">
                      Arrastra imágenes aquí o haz clic para seleccionar
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Recomendado: imágenes de alta calidad (mín. 800x800px)
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Publicar Producto
                  </Button>
                  <Button type="button" variant="outline">
                    Guardar como Borrador
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="border-border">
              <div className="p-6 border-b border-border">
                <h3 className="text-foreground">Pedidos Recientes</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-foreground">#ECO-1234</TableCell>
                    <TableCell className="text-muted-foreground">
                      María González
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Aceite de Oliva Orgánico
                    </TableCell>
                    <TableCell className="text-foreground">€12.99</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        En preparación
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">Hoy</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-foreground">#ECO-1233</TableCell>
                    <TableCell className="text-muted-foreground">
                      Carlos Ruiz
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Jabón Natural
                    </TableCell>
                    <TableCell className="text-foreground">€6.50</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-100 text-blue-800">
                        En ruta
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Ayer
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-foreground">#ECO-1232</TableCell>
                    <TableCell className="text-muted-foreground">
                      Ana Martínez
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Bolsa Reutilizable
                    </TableCell>
                    <TableCell className="text-foreground">€8.99</TableCell>
                    <TableCell>
                      <Badge className="bg-gray-100 text-gray-800">
                        Entregado
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Hace 2 días
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
