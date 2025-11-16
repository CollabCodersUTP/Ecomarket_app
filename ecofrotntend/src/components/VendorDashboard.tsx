import {useEffect, useState} from "react";
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
import {postElement, getElements, deleteById} from "./util/requests";
import {ModalDeleteConfirmation, ModalOperationState} from "./ui/modalConfirmation";

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


type Product = {
  productoId: number,
  nombreProducto:string,
  vendedor: string,
  categoria: string,
  stock:number,
  precio: number,
  calificacionPromedio: number,
  estaActivo: boolean
}

type Category = {
  "categoriaId": number,
  "nombreCategoria": string,
  "descripcion": string,
  "imagenUrl": null,
}

type BodyProduct = {
  vendedor: number,
  nombreProducto: string,
  categoria: number,
  descripcion: string,
  precio: number,
  stock: number
}

export function VendorDashboard(/*{ onNavigate }: VendorDashboardProps*/) {
  const [activeTab, setActiveTab] = useState("overview");
  const [openModal, setOpenModal] = useState<boolean>(null);
  const [childModal, setChildModal] = useState<boolean>(null);

  /*Categoria*/
  const [category, setCategory] = useState<Category[]>();


  /*Productos*/
  const [products, setProducts] = useState<Product[]>();
  let [activeProduct, setActiveProduct] =  useState<Product| null>(null);
  const [indexProduct, setIndexProduct] =  useState<number>(null);

  // State for Add Product Form

  const [productNameForm, setProductNameForm] = useState<string>("");
  const [categoryForm, setCategoryForm] = useState("");
  const [categoryIdForm, setCategoryIdForm] = useState<number>(null);
  const [descriptionForm, setDescriptionForm] = useState("");
  const [priceForm, setPriceForm] = useState<number>(0);
  const [stockForm, setStockForm] = useState<number>(0);

  const handleSelectedChange = (selectedElement:string) => {
        setCategoryForm(selectedElement);

        const selectedCat = category.find((cat) => cat.nombreCategoria === selectedElement);
        if (selectedCat){
          setCategoryIdForm(selectedCat.categoriaId);
          console.log("selected", selectedCat, categoryForm);
        }
  }

  const [bodyForm, setBodyForm] = useState<BodyProduct>();
  const submit = () => {
        const data: BodyProduct = {
              vendedor: 1,
              categoria: categoryIdForm,
              nombreProducto: productNameForm,
              descripcion: descriptionForm,
              precio: priceForm,
              stock: stockForm
        }

        const fetchFormProduct = async () => {
          const responseForm = await postElement("productos", data)
          console.log("responseForm", responseForm);
        }
        fetchFormProduct().catch(e => console.log(e))
  }

  useEffect(() => {
    setProducts(null);

    switch (activeTab) {
      case "overview":
        console.log( "En tab "+ activeTab);
        break;

      case "products":
        console.log( "En tab "+ activeTab);
        const fetchProd = async () => {
          const responseProducts = await getElements("productos")
          setProducts(responseProducts);
        }
        fetchProd().catch(e => console.log(e));

        break;

      case "add-product" :
        const fetchCat = async () => {
          const responseCategories = await getElements("categorias");
          setCategory(responseCategories);
        }
        fetchCat().catch(e => console.log(e));

    }
  }, [activeTab]);


  const handlePublishProduct = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Publishing product:", {
      productNameForm,
      categoryForm,
      descriptionForm,
      priceForm,
      stockForm,
    });
  }

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
                {products && products.slice(0, 3).map((product) => (
                  <div
                    key={product.productoId}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div>
                      <h4 className="text-foreground">{product.nombreProducto}</h4>
                      <p className="text-sm text-muted-foreground">
                         ventasss
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-primary">€{product.precio}</div>
                      <Badge
                        variant={
                          product.estaActivo === true
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
                  {products && products.map((product, index) => (
                    <TableRow key={product.productoId}>
                      <TableCell>
                        <div className="text-foreground">{product.nombreProducto}</div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {product.categoria}
                      </TableCell>
                      <TableCell className="text-foreground">
                        €{product.precio}
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
                        {product.calificacionPromedio}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            product.estaActivo === true
                              ? "default"
                              : "secondary"
                          }
                          className={
                            product.estaActivo === true
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {product.estaActivo === true
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
                          <Button variant="ghost" size="icon" onClick={() => {
                            setActiveProduct(product);
                            setOpenModal(true);
                            setIndexProduct(index);
                          }}>
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
          {activeProduct && (ModalDeleteConfirmation("productos", indexProduct, activeProduct.productoId, activeProduct.nombreProducto, products, setProducts,openModal, setOpenModal, setChildModal ))}
          {childModal && (ModalOperationState(childModal,setChildModal))}

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
                    value={productNameForm}
                    onChange={(e) => setProductNameForm(e.target.value)}
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
                        {category && category.map((categoria) => (
                            <SelectItem key={categoria.categoriaId} value={categoria.nombreCategoria}>{categoria.nombreCategoria}</SelectItem>
                        ))}
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
                    value={descriptionForm}
                    onChange={(e) => setDescriptionForm(e.target.value)}
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
                      value={priceForm}
                      onChange={(e) => setPriceForm(parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Inicial *</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="0"
                      value={stockForm}
                      onChange={(e) => setStockForm(parseInt(e.target.value))}
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
                  <Button type="button" variant="outline" onClick={bodyForm}>
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
