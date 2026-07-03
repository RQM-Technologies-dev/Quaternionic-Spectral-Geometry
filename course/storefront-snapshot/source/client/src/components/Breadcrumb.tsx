import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-white/50 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/">
              <a className="flex items-center gap-1 text-gray-600 hover:text-blue-900 transition-colors">
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </a>
            </Link>
          </li>

          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {item.href ? (
                <Link href={item.href}>
                  <a className="text-gray-600 hover:text-blue-900 transition-colors">
                    {item.label}
                  </a>
                </Link>
              ) : (
                <span className="text-gray-900 font-semibold">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
