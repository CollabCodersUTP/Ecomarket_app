// components/StatCard.tsx
interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => {
  const isPositive = change.startsWith("+");
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col">
      <span className="text-gray-500">{title}</span>
      <span className="text-2xl font-bold mt-1">{value}</span>
      <span
        className={`mt-2 text-sm font-medium ${
          isPositive ? "text-green-600" : "text-red-600"
        }`}
      >
        {change} vs mes anterior
      </span>
    </div>
  );
};
