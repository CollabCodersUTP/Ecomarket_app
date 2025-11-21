// components/Pill.tsx
interface PillProps {
  text: string;
  color?: "green" | "red" | "yellow" | "blue" | "gray";
}

export const Pill: React.FC<PillProps> = ({ text, color = "green" }) => {
  const colorMap: Record<string, string> = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    blue: "bg-blue-100 text-blue-800",
    gray: "bg-gray-100 text-gray-800",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colorMap[color]}`}>
      {text}
    </span>
  );
};
