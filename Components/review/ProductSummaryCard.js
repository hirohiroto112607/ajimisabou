import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare } from "lucide-react";

const teaTypeColors = {
  "緑茶": "bg-green-100 text-green-800 border-green-200",
  "ほうじ茶": "bg-amber-100 text-amber-800 border-amber-200",
  "玄米茶": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "麦茶": "bg-orange-100 text-orange-800 border-orange-200",
  "烏龍茶": "bg-teal-100 text-teal-800 border-teal-200",
  "紅茶": "bg-red-100 text-red-800 border-red-200",
  "その他": "bg-gray-100 text-gray-800 border-gray-200"
};

export default function ProductSummaryCard({ product, onClick }) {
  return (
    <Card 
      className="overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer bg-white/90 backdrop-blur-sm border-sage-200 group"
      onClick={onClick}
    >
      {product.latestImage && (
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-sage-50 to-beige-50">
          <img 
            src={product.latestImage} 
            alt={product.teaName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 right-4">
            <Badge className={`${teaTypeColors[product.teaType]} border font-medium shadow-lg`}>
              {product.teaType}
            </Badge>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-sage-800 leading-tight">
          {product.teaName}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-amber-700">{product.avgRating.toFixed(1)}</span>
            <span className="text-sm text-amber-600">/ 平均</span>
          </div>
          <div className="flex items-center gap-2 text-sage-600">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">{product.reviewCount}件のレビュー</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}