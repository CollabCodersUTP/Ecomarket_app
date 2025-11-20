import {useEffect, useState} from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {ModalDeleteConfirmation, ModalOperationState} from "./ui/modalConfirmation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "./ui/table";
import {Users, Package, TrendingUp, DollarSign, UserCheck, ShoppingBag, Eye, Edit,Trash2,} from "lucide-react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,} from "recharts";
import {getElements} from "./util/requests";

/*interface AdminPanelProps {
  onNavigate: (page: string) => void;
}*/

const salesData = [
  { name: "Ene", ventas: 12000 },
  { name: "Feb", ventas: 15000 },
  { name: "Mar", ventas: 18000 },
  { name: "Abr", ventas: 16000 },
  { name: "May", ventas: 22000 },
  { name: "Jun", ventas: 25000 },
];

const categoryData = [
  { name: "Alimentación", value: 35 },
  { name: "Cosmética", value: 25 },
  { name: "Textil", value: 20 },
  { name: "Hogar", value: 20 },
];

const COLORS = ["#2d5a2d", "#8fbc8f", "#a0c4a0", "#6b8e6b"];

const vendors = [
  {
    id: 1,
    name: "EcoFarm S.L.",
    products: 23,
    sales: 12567,
    rating: 4.9,
    status: "verified",
  },
  {
    id: 2,
    name: "Green Home",
    products: 18,
    sales: 8432,
    rating: 4.7,
    status: "verified",
  },
  {
    id: 3,
    name: "Natural Beauty Co.",
    products: 34,
    sales: 15234,
    rating: 4.8,
    status: "verified",
  },
  {
    id: 4,
    name: "PackGreen",
    products: 12,
    sales: 5678,
    rating: 4.6,
    status: "pending",
  },
];

const orders = [
  {
    id: "#ECO-5678",
    customer: "María González",
    total: 45.99,
    status: "delivered",
    date: "Hoy",
  },
  {
    id: "#ECO-5677",
    customer: "Carlos Ruiz",
    total: 32.5,
    status: "in-transit",
    date: "Ayer",
  },
  {
    id: "#ECO-5676",
    customer: "Ana Martínez",
    total: 78.99,
    status: "processing",
    date: "Hace 2 días",
  },
  {
    id: "#ECO-5675",
    customer: "Luis Fernández",
    total: 23.45,
    status: "pending",
    date: "Hace 3 días",
  },
];

type Product = {
  productoId: number,
  nombreProducto:string,
  vendedor: string,
  categoria: string,
  stock:number,
  precio: number,
  calificacionPromedio: number,
}

/*
{
      id: 1,
      name: "Aceite de Oliva Orgánico",
      vendor: "EcoFarm S.L.",
      category: "Alimentación",
      sales: 456,
      status: "active",
    },
    {
      id: 2,
      name: "Jabón Natural Lavanda",
      vendor: "Natural Beauty Co.",
      category: "Cosmética",
      sales: 789,
      status: "active",
    },
    {
      id: 3,
      name: "Bolsa Algodón Reutilizable",
      vendor: "PackGreen",
      category: "Hogar",
      sales: 234,
      status: "pending",
    }
 */
export function AdminPanel(/*{ onNavigate }: AdminPanelProps*/) {
  const [activeTab, setActiveTab] = useState("vendors");
  const [openModal, setOpenModal] = useState<boolean>(null);
  const [childModal, setChildModal] = useState<boolean>(null);

  /*Product*/
  const [products, setProducts] =  useState<Product[]>();
  let [activeProduct, setActiveProduct] =  useState<Product| null>(null);
  const [indexProduct, setIndexProduct] =  useState<number>(null);

  /*Vendor*/
  const [Vendors, setVendors] = useState([]);
  const [indexVendor, setIndexVendor] = useState([]);

  useEffect(() => {
    setProducts(null);

    switch (activeTab) {
      case "vendors":
        console.log( "En tab "+ activeTab);
        break;

      case "products":
        console.log( "En tab "+ activeTab);
        let fetchProd = async () => {
          const response = await getElements("productos")
          setProducts(response);
        }
        fetchProd().catch(e => console.log(e));

        break;
    }
  }, [activeTab]);

  /*
  useEffect(() => {
    console.log(products);
  }, [products]);*/

  useEffect(() => {
    console.log(activeProduct);
  }, [activeProduct]);

  useEffect(() => {
    console.log(indexProduct);
  }, [indexProduct]);

  /*
    useEffect(() => {
      console.log(deletedProduct);

    }, [deletedProduct, products, activeProduct]);*/



  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-foreground mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground">
            Monitoreo y control de la plataforma Ecomarket
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Ventas Totales</span>
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div className="text-foreground mb-1">€125,647</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              +18.2% vs mes anterior
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Usuarios Activos</span>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="text-foreground mb-1">12,458</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              +12.5% vs mes anterior
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Vendedores</span>
              <UserCheck className="w-5 h-5 text-primary" />
            </div>
            <div className="text-foreground mb-1">487</div>
            <div className="text-sm text-muted-foreground">
              23 pendientes de verificación
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Productos</span>
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div className="text-foreground mb-1">3,245</div>
            <div className="text-sm text-muted-foreground">
              156 publicados hoy
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 border-border">
            <h3 className="text-foreground mb-6">Ventas Mensuales</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8f1e8" />
                <XAxis dataKey="name" stroke="#5a6b5a" />
                <YAxis stroke="#5a6b5a" />
                <Tooltip />
                <Bar dataKey="ventas" fill="#2d5a2d" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 border-border">
            <h3 className="text-foreground mb-6">Distribución por Categoría</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-white border border-border">
            <TabsTrigger value="vendors">Vendedores</TabsTrigger>
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
          </TabsList>

          {/* Vendors Tab */}
          <TabsContent value="vendors">
            <Card className="border-border">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-foreground">Gestión de Vendedores</h3>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Exportar Datos
                  </Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead>Ventas Totales</TableHead>
                    <TableHead>Valoración</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell className="text-foreground">
                        {vendor.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {vendor.products}
                      </TableCell>
                      <TableCell className="text-foreground">
                        €{vendor.sales.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-muted-foreground">
                            {vendor.rating}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            vendor.status === "verified"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            vendor.status === "verified"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {vendor.status === "verified"
                            ? "Verificado"
                            : "Pendiente"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
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

          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="border-border">
              <div className="p-6 border-b border-border">
                <h3 className="text-foreground">Gestión de Productos</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Ventas</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products && products.map((product, index) => (
                      <TableRow key={product.productoId}>
                        <TableCell className="text-foreground">
                          {product.nombreProducto}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {product.vendedor}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {product.categoria}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {product.stock}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {product.precio}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
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

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="border-border">
              <div className="p-6 border-b border-border">
                <h3 className="text-foreground">Gestión de Pedidos</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="text-foreground">
                        {order.id}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.customer}
                      </TableCell>
                      <TableCell className="text-foreground">
                        €{order.total}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "in-transit"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {order.status === "delivered"
                            ? "Entregado"
                            : order.status === "in-transit"
                            ? "En ruta"
                            : order.status === "processing"
                            ? "Procesando"
                            : "Pendiente"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.date}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="p-6 border-border">
              <h3 className="text-foreground mb-4">Estadísticas de Usuarios</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-muted-foreground mb-2">Compradores</div>
                  <div className="text-foreground">11,245</div>
                  <div className="text-sm text-green-600 mt-1">
                    +234 esta semana
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-muted-foreground mb-2">Vendedores</div>
                  <div className="text-foreground">487</div>
                  <div className="text-sm text-green-600 mt-1">
                    +12 esta semana
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-muted-foreground mb-2">
                    Administradores
                  </div>
                  <div className="text-foreground">8</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Personal activo
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  )
}
