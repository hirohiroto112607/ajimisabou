import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Upload } from "lucide-react";

export default function ReviewForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    tea_name: "",
    tea_type: "",
    supermarket: "",
    price: "",
    volume: "",
    jan_code: "",
    rating: 5,
    review_text: "",
    image_url: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-sage-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-sage-800">
          新しいレビューを投稿
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-2">
                商品名 *
              </label>
              <Input
                value={formData.tea_name}
                onChange={(e) => handleInputChange("tea_name", e.target.value)}
                placeholder="例：伊右衛門"
                required
                className="border-sage-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-2">
                お茶の種類 *
              </label>
              <Select value={formData.tea_type} onValueChange={(value) => handleInputChange("tea_type", value)}>
                <SelectTrigger className="border-sage-200">
                  <SelectValue placeholder="種類を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="緑茶">緑茶</SelectItem>
                  <SelectItem value="ほうじ茶">ほうじ茶</SelectItem>
                  <SelectItem value="玄米茶">玄米茶</SelectItem>
                  <SelectItem value="麦茶">麦茶</SelectItem>
                  <SelectItem value="烏龍茶">烏龍茶</SelectItem>
                  <SelectItem value="紅茶">紅茶</SelectItem>
                  <SelectItem value="その他">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-2">
                購入店舗 *
              </label>
              <Input
                value={formData.supermarket}
                onChange={(e) => handleInputChange("supermarket", e.target.value)}
                placeholder="例：イオン"
                required
                className="border-sage-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-2">
                価格（円）
              </label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="158"
                className="border-sage-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-2">
                容量
              </label>
              <Input
                value={formData.volume}
                onChange={(e) => handleInputChange("volume", e.target.value)}
                placeholder="500ml"
                className="border-sage-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-sage-700 mb-2">
              JANコード
            </label>
            <Input
              value={formData.jan_code}
              onChange={(e) => handleInputChange("jan_code", e.target.value)}
              placeholder="4901777355473"
              className="border-sage-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sage-700 mb-2">
              評価 *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleInputChange("rating", rating)}
                  className="p-1"
                >
                  <Star
                    className={`w-8 h-8 ${
                      rating <= formData.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-sage-700 mb-2">
              レビューコメント
            </label>
            <textarea
              value={formData.review_text}
              onChange={(e) => handleInputChange("review_text", e.target.value)}
              placeholder="このお茶についての感想を書いてください..."
              rows={4}
              className="w-full px-3 py-2 border border-sage-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sage-700 mb-2">
              画像URL
            </label>
            <Input
              value={formData.image_url}
              onChange={(e) => handleInputChange("image_url", e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="border-sage-200"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !formData.tea_name || !formData.tea_type || !formData.supermarket}
            className="w-full bg-sage-600 hover:bg-sage-700 text-white"
          >
            {isSubmitting ? "投稿中..." : "レビューを投稿"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}