import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, DollarSign, Package } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

const teaTypeColors = {
  "緑茶": "bg-green-100 text-green-800 border-green-200",
  "ほうじ茶": "bg-amber-100 text-amber-800 border-amber-200",
  "玄米茶": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "麦茶": "bg-orange-100 text-orange-800 border-orange-200",
  "烏龍茶": "bg-teal-100 text-teal-800 border-teal-200",
  "紅茶": "bg-red-100 text-red-800 border-red-200",
  "その他": "bg-gray-100 text-gray-800 border-gray-200"
};

export default function ReviewCard({ review, onClick }) {
  const cardProps = onClick ? { onClick, className: "overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer bg-white/90 backdrop-blur-sm border-sage-200 group" } : { className: "overflow-hidden bg-white/90 backdrop-blur-sm border-sage-200 group" };

  return (
    <Card {...cardProps}>
      {review.image_url && (
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-sage-50 to-beige-50">
          <img 
            src={review.image_url} 
            alt={review.tea_name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 right-4">
            <Badge className={`${teaTypeColors[review.tea_type]} border font-medium shadow-lg`}>
              {review.tea_type}
            </Badge>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-xl font-bold text-sage-800 leading-tight">
            {review.tea_name}
          </CardTitle>
          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-amber-700">{review.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sage-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{review.supermarket}</span>
          </div>
          <div className="flex items-center gap-2 text-sage-600">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium">¥{review.price}</span>
          </div>
          {review.volume && (
            <div className="flex items-center gap-2 text-sage-600 col-span-2">
              <Package className="w-4 h-4" />
              <span className="text-sm font-medium">{review.volume}</span>
            </div>
          )}
        </div>
        
        {review.review_text && (
          <p className="text-sage-700 text-sm leading-relaxed line-clamp-3 border-t border-sage-100 pt-3">
            {review.review_text}
          </p>
        )}
        
        <div className="text-xs text-sage-400 border-t border-sage-100 pt-3 flex justify-between items-center">
          <span>{format(new Date(review.created_date), 'yyyy年MM月dd日', { locale: ja })}</span>
          {review.jan_code && <span className="font-mono text-sage-300">JAN: {review.jan_code}</span>}
        </div>
      </CardContent>
    </Card>
  );
}