import { useState } from "react";
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

const salesData = [
  { name: "Ene", ventas: 4000 },
  { name: "Feb", ventas: 3000 },
  { name: "Mar", ventas: 5000 },
  { name: "Abr", ventas: 4500 },
  { name: "May", ventas: 6000 },
  { name: "Jun", ventas: 5500 },
];

const products = [
  {
    id: 1,
    name: "Aceite de Oliva Orgánico",
    category: "Alimentación",
    price: 12.99,
    stock: 45,
    sales: 127,
    status: "active",
  },
  {
    id: 2,
    name: "Jabón Natural de Lavanda",
    category: "Cosmética",
    price: 6.5,
    stock: 89,
    sales: 234,
    status: "active",
  },
  {
    id: 3,
    name: "Bolsa Reutilizable Algodón",
    category: "Hogar",
    price: 8.99,
    stock: 12,
    sales: 56,
    status: "low-stock",
  },
];

export function VendorDashboard({ onNavigate }: VendorDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // State for Add Product Form
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [certification, setCertification] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [origin, setOrigin] = useState("");

  const handlePublishProduct = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Publishing product:", {
      productName,
      category,
      certification,
      description,
      price,
      stock,
      origin,
    });
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
                {products.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div>
                      <h4 className="text-foreground">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.sales} ventas
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-primary">€{product.price}</div>
                      <Badge
                        variant={
                          product.status === "active"
                            ? "default"
                            : "destructive"
                        }
                        className="mt-1"
                      >
                        Stock: {product.stock}
                      </Badge>
                    </div>
                  </div>
                ))}
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
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="text-foreground">{product.name}</div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {product.category}
                      </TableCell>
                      <TableCell className="text-foreground">
                        €{product.price}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            product.stock > 20 ? "default" : "destructive"
                          }
                        >
                          {product.stock}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {product.sales}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            product.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            product.status === "active"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {product.status === "active"
                            ? "Activo"
                            : "Stock Bajo"}
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
                          <Button variant="ghost" size="icon">
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
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alimentacion">
                          Alimentación
                        </SelectItem>
                        <SelectItem value="cosmetica">
                          Cosmética Natural
                        </SelectItem>
                        <SelectItem value="textil">
                          Textil Sostenible
                        </SelectItem>
                        <SelectItem value="hogar">Hogar Ecológico</SelectItem>
                        <SelectItem value="personal">
                          Cuidado Personal
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certification">Certificación *</Label>
                    <Select
                      value={certification}
                      onValueChange={setCertification}
                    >
                      <SelectTrigger id="certification">
                        <SelectValue placeholder="Seleccionar certificación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="organico">
                          Certificado Orgánico
                        </SelectItem>
                        <SelectItem value="biodegradable">
                          100% Biodegradable
                        </SelectItem>
                        <SelectItem value="zero-waste">Zero Waste</SelectItem>
                        <SelectItem value="cruelty-free">
                          Cruelty Free
                        </SelectItem>
                        <SelectItem value="gots">GOTS Certificado</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Label htmlFor="origin">Origen *</Label>
                    <Input
                      id="origin"
                      placeholder="España"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    />
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
