// components/Layout.tsx
import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

const tabs = [
  { name: "Vista General", href: "/vista-general" },
  { name: "Mis Productos", href: "/mis-productos" },
  { name: "Añadir Producto", href: "/anadir-producto" },
  { name: "Pedidos", href: "/pedidos" },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-green-600 text-white px-6 py-4">
        <h1 className="text-2xl font-bold">Panel de Vendedor</h1>
      </header>

      {/* Tabs */}
      <nav className="bg-white shadow px-6 py-2 flex space-x-4">
        {tabs.map((tab) => (
          <Link key={tab.name} href={tab.href}>
            <span
              className={`cursor-pointer px-3 py-1 rounded-md font-medium ${
                router.pathname === tab.href
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Main content */}
      <main className="p-6">{children}</main>
    </div>
  );
};
