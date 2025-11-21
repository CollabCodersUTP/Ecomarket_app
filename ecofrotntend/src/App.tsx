import { useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { ProductCatalog } from "./components/ProductCatalogNew";
import { AuthPage } from "./components/AuthPage";
import { AccountPage } from "./components/AccountPage";
import { ProductDetail } from "./components/ProductDetail";
import { VendorDashboard } from "./components/VendorDashboard";
import { Checkout } from "./components/CheckoutNew";
import { AdminPanel } from "./components/AdminPanel";
import { OrderTracking } from "./components/OrderTracking";
import { ReturnsManagement } from "./components/ReturnsManagement";
import { Toaster } from "./components/ui/sonner";
import { useCart } from "./hooks/useCart";

function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const cart = useCart();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onNavigate={handleNavigate}
        currentPage={currentPage}
        cartCount={cart.getCount()}
      />

      {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
      {currentPage === "catalog" && (
        <ProductCatalog
          onNavigate={handleNavigate}
          onAddToCart={cart.addItem}
        />
      )}
      {currentPage === "auth" && <AuthPage onNavigate={handleNavigate} />}
      {currentPage === "account" && <AccountPage onNavigate={handleNavigate} />}
      {currentPage === "product" && (
        <ProductDetail
          onNavigate={handleNavigate}
          onAddToCart={(product: any, qty: number) =>
            cart.addItem(product, qty)
          }
        />
      )}
      {currentPage === "vendor" && (
        <VendorDashboard onNavigate={handleNavigate} />
      )}
      {currentPage === "cart" && (
        <Checkout
          onNavigate={handleNavigate}
          cartItems={cart.items}
          onUpdateQuantity={cart.updateQuantity}
          onRemoveItem={cart.removeItem}
          cartTotal={cart.getTotal()}
        />
      )}
      {currentPage === "checkout" && (
        <Checkout
          onNavigate={handleNavigate}
          cartItems={cart.items}
          onUpdateQuantity={cart.updateQuantity}
          onRemoveItem={cart.removeItem}
          cartTotal={cart.getTotal()}
        />
      )}
      {currentPage === "admin" && <AdminPanel />}
      {currentPage === "orders" && (
        <OrderTracking onNavigate={handleNavigate} />
      )}
      {currentPage === "returns" && (
        <ReturnsManagement onNavigate={handleNavigate} />
      )}
      {currentPage === "favorites" && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-foreground mb-2">Favoritos</h2>
            <p className="text-muted-foreground">
              Esta sección está en desarrollo
            </p>
          </div>
        </div>
      )}

      <Toaster position={"top-center"}/>

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
                  <button
                    //onClick={() => handleNavigate("catalog")}
                    className="hover:text-primary"
                  >
                    Catálogo de Productos
                  </button>
                </li>
                <li>
                  <button
                    //onClick={() => handleNavigate("catalog")}
                    className="hover:text-primary"
                  >
                    Categorías
                  </button>
                </li>
                <li>
                  <button
                    //onClick={() => handleNavigate("catalog")}
                    className="hover:text-primary"
                  >
                    Ofertas Especiales
                  </button>
                </li>
                <li>
                  <button
                    //onClick={() => handleNavigate("catalog")}
                    className="hover:text-primary"
                  >
                    Nuevos Productos
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-foreground mb-4">Vender</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button
                    //onClick={() => handleNavigate("vendor")}
                    className="hover:text-primary"
                  >
                    Empezar a Vender
                  </button>
                </li>
                <li>
                  <button
                    //onClick={() => handleNavigate("vendor")}
                    className="hover:text-primary"
                  >
                    Guía del Vendedor
                  </button>
                </li>
                <li>
                  <button className="hover:text-primary">
                    Certificaciones
                  </button>
                </li>
                <li>
                  <button className="hover:text-primary">Tarifas</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-foreground mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button className="hover:text-primary">
                    Centro de Ayuda
                  </button>
                </li>
                <li>
                  <button
                    //onClick={() => handleNavigate("orders")}
                    className="hover:text-primary"
                  >
                    Seguimiento de Pedidos
                  </button>
                </li>
                <li>
                  <button
                    //onClick={() => handleNavigate("returns")}
                    className="hover:text-primary"
                  >
                    Devoluciones
                  </button>
                </li>
                <li>
                  <button className="hover:text-primary">Contacto</button>
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
  );
}

export default App;
