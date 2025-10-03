
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Upload, Loader2, Camera } from "lucide-react";
import { UploadFile } from "@/integrations/Core";

const teaTypes = ["緑茶", "ほうじ茶", "玄米茶", "麦茶", "烏龍茶", "紅茶", "その他"];

export default function ReviewForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    tea_name: "",
    supermarket: "",
    price: "",
    rating: 5,
    tea_type: "緑茶",
    volume: "",
    review_text: "",
    image_url: "",
    pros: "",
    cons: "",
    jan_code: "" // Added jan_code to formData
  });
  const [isUploading, setIsUploading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      setFormData(prev => ({ ...prev, image_url: file_url }));
    } catch (error) {
      console.error("画像のアップロードに失敗しました", error);
    }
    setIsUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-sage-200 shadow-lg">
        <CardHeader className="border-b border-sage-100">
          <CardTitle className="text-sage-800 flex items-center gap-2">
            <Camera className="w-5 h-5" />
            商品画像
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4">
            {formData.image_url ? (
              <div className="relative w-full max-w-md">
                <img 
                  src={formData.image_url} 
                  alt="プレビュー" 
                  className="w-full h-64 object-cover rounded-xl shadow-lg border-2 border-sage-200"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormData(prev => ({ ...prev, image_url: "" }))}
                  className="mt-3 w-full border-sage-300 hover:bg-sage-50"
                >
                  画像を削除
                </Button>
              </div>
            ) : (
              <div className="w-full max-w-md">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-sage-300 rounded-xl cursor-pointer bg-sage-50 hover:bg-sage-100 transition-colors duration-300">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {isUploading ? (
                      <Loader2 className="w-12 h-12 text-sage-500 animate-spin mb-3" />
                    ) : (
                      <Upload className="w-12 h-12 text-sage-500 mb-3" />
                    )}
                    <p className="text-sm text-sage-600 font-medium">
                      {isUploading ? "アップロード中..." : "クリックして画像を選択"}
                    </p>
                    <p className="text-xs text-sage-400 mt-1">PNG, JPG (最大10MB)</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-sage-200 shadow-lg">
        <CardHeader className="border-b border-sage-100">
          <CardTitle className="text-sage-800">基本情報</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="jan_code" className="text-sage-700 font-medium">JANコード</Label>
            <Input
              id="jan_code"
              value={formData.jan_code}
              onChange={(e) => setFormData(prev => ({ ...prev, jan_code: e.target.value }))}
              className="border-sage-200 focus:ring-sage-400"
              placeholder="例: 4901085601905"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tea_name" className="text-sage-700 font-medium">商品名 *</Label>
            <Input
              id="tea_name"
              value={formData.tea_name}
              onChange={(e) => setFormData(prev => ({ ...prev, tea_name: e.target.value }))}
              required
              className="border-sage-200 focus:ring-sage-400"
              placeholder="例: おーいお茶 緑茶"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="supermarket" className="text-sage-700 font-medium">スーパー名 *</Label>
              <Input
                id="supermarket"
                value={formData.supermarket}
                onChange={(e) => setFormData(prev => ({ ...prev, supermarket: e.target.value }))}
                required
                className="border-sage-200 focus:ring-sage-400"
                placeholder="例: イオン"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-sage-700 font-medium">価格(円) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                required
                className="border-sage-200 focus:ring-sage-400"
                placeholder="98"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="tea_type" className="text-sage-700 font-medium">お茶の種類 *</Label>
              <Select
                value={formData.tea_type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, tea_type: value }))}
              >
                <SelectTrigger className="border-sage-200 focus:ring-sage-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {teaTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="volume" className="text-sage-700 font-medium">容量</Label>
              <Input
                id="volume"
                value={formData.volume}
                onChange={(e) => setFormData(prev => ({ ...prev, volume: e.target.value }))}
                className="border-sage-200 focus:ring-sage-400"
                placeholder="例: 500ml, 2L"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sage-700 font-medium">評価 *</Label>
            <div className="flex gap-2 items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform duration-200 hover:scale-125"
                >
                  <Star
                    className={`w-10 h-10 transition-colors duration-200 ${
                      star <= (hoveredRating || formData.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-sage-200"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-3 text-xl font-bold text-sage-700">{formData.rating}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-sage-200 shadow-lg">
        <CardHeader className="border-b border-sage-100">
          <CardTitle className="text-sage-800">詳細レビュー</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="review_text" className="text-sage-700 font-medium">レビュー本文</Label>
            <Textarea
              id="review_text"
              value={formData.review_text}
              onChange={(e) => setFormData(prev => ({ ...prev, review_text: e.target.value }))}
              className="min-h-32 border-sage-200 focus:ring-sage-400"
              placeholder="味や香り、コストパフォーマンスなどについて自由に書いてください"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pros" className="text-sage-700 font-medium">良い点</Label>
            <Textarea
              id="pros"
              value={formData.pros}
              onChange={(e) => setFormData(prev => ({ ...prev, pros: e.target.value }))}
              className="min-h-24 border-sage-200 focus:ring-sage-400"
              placeholder="この商品の良いところ"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cons" className="text-sage-700 font-medium">気になる点</Label>
            <Textarea
              id="cons"
              value={formData.cons}
              onChange={(e) => setFormData(prev => ({ ...prev, cons: e.target.value }))}
              className="min-h-24 border-sage-200 focus:ring-sage-400"
              placeholder="改善してほしいところや気になる点"
            />
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            投稿中...
          </>
        ) : (
          "レビューを投稿"
        )}
      </Button>
    </form>
  );
}
