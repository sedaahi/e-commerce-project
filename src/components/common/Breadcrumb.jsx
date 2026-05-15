import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-2 text-[14px] font-bold">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={item.label} className="flex items-center gap-2">
            {item.to && !isLast ? (
              <Link to={item.to} className="text-[#252B42]">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#BDBDBD]">{item.label}</span>
            )}

            {!isLast && (
              <ChevronRight size={16} className="text-[#BDBDBD]" />
            )}
          </div>
        );
      })}
    </nav>
  );
}