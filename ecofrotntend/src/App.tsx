import { useState } from "react";
import { Header } from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { ProductCatalog } from "./components/ProductCatalog";
import { AuthPage } from "./components/AuthPage";
import { AccountPage } from "./components/AccountPage";
import { ProductDetail } from "./components/ProductDetail";
import { VendorDashboard } from "./components/VendorDashboard";
import { Checkout } from "./components/Checkout";
import { AdminPanel } from "./components/AdminPanel";
import { OrderTracking } from "./components/OrderTracking";
import { ReturnsManagement } from "./components/ReturnsManagement";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header cartCount={cartCount} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<ProductCatalog />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route
            path="/product/:id"
            element={<ProductDetail onAddToCart={handleAddToCart} />}
          />
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/cart" element={<Checkout />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/orders" element={<OrderTracking />} />
          <Route path="/returns" element={<ReturnsManagement />} />
          <Route
            path="/favorites"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-foreground mb-2">Favoritos</h2>
                  <p className="text-muted-foreground">
                    Esta sección está en desarrollo
                  </p>
                </div>
              </div>
            }
          />
        </Routes>

        <Toaster />

        {/* Footer */}
        <footer className="bg-white border-t border-border mt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-foreground mb-4">Sobre Ecomarket</h4>
                <p className="text-muted-foreground text-sm">
                  Marketplace líder en productos ecológicos y sostenibles.
                  Conectamos productores responsables con consumidores
                  conscientes.
                </p>
              </div>
              <div>
                <h4 className="text-foreground mb-4">Comprar</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="/catalog" className="hover:text-primary">
                      Catálogo de Productos
                    </a>
                  </li>
                  <li>
                    <a href="/catalog" className="hover:text-primary">
                      Categorías
                    </a>
                  </li>
                  <li>
                    <a href="/catalog" className="hover:text-primary">
                      Ofertas Especiales
                    </a>
                  </li>
                  <li>
                    <a href="/catalog" className="hover:text-primary">
                      Nuevos Productos
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-foreground mb-4">Vender</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="/vendor" className="hover:text-primary">
                      Empezar a Vender
                    </a>
                  </li>
                  <li>
                    <a href="/vendor" className="hover:text-primary">
                      Guía del Vendedor
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary">
                      Certificaciones
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary">
                      Tarifas
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-foreground mb-4">Soporte</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary">
                      Centro de Ayuda
                    </a>
                  </li>
                  <li>
                    <a href="/orders" className="hover:text-primary">
                      Seguimiento de Pedidos
                    </a>
                  </li>
                  <li>
                    <a href="/returns" className="hover:text-primary">
                      Devoluciones
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary">
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>
                © 2024 Ecomarket. Todos los derechos reservados. | Política de
                Privacidad | Términos y Condiciones
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;