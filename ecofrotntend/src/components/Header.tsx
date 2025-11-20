import { useEffect, useState } from "react";
import { Search, ShoppingCart, User, Heart, Menu, Leaf } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  /*onNavigate: (page: string) => void;
  currentPage: string;*/
  cartCount: number;
}

export function Header({ onNavigate, currentPage, cartCount }: HeaderProps) {
  const [user, setUser] = useState<null | { nombre?: string; email?: string; rol?: string }>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch (e) {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    onNavigate("auth");
  };
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            //onClick={() => onNavigate("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-primary">Ecomarket</span>
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="search"
                placeholder="Buscar productos ecológicos..."
                className="pl-10 bg-input-background border-border"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              //onClick={() => onNavigate("catalog")}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              //onClick={() => onNavigate("favorites")}
            >
              <Heart className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              //onClick={() => onNavigate("cart")}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Button>
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setMenuOpen((s) => !s);
                    onNavigate("account");
                  }}
                >
                  <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                    {user.nombre ? user.nombre.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                  </div>
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onNavigate("auth")}
              >
                <User className="w-5 h-5" />
              </Button>
            )}
            <Button
              //onClick={() => onNavigate("vendor")}
              className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Vender
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
