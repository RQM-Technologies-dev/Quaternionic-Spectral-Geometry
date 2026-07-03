import { Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KeyTakeawaysProps {
  takeaways: string[];
}

export default function KeyTakeaways({ takeaways }: KeyTakeawaysProps) {
  return (
    <Card className="mb-8 border-2 bg-gradient-to-br from-amber-50 to-yellow-50" style={{ borderColor: '#fbbf24' }}>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-500">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-amber-900">
            Key Takeaways
          </h3>
        </div>
        <p className="text-sm text-amber-800 mb-4">
          Remember these essential concepts:
        </p>
        <ul className="space-y-3">
          {takeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <span className="text-amber-900 font-medium">{takeaway}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
