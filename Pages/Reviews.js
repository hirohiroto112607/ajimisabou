import React, { useState, useEffect, useMemo } from "react";
import { TeaReview } from "@/entities/TeaReview";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductSummaryCard from "../Components/review/ProductSummaryCard";
import ReviewCard from "../Components/review/ReviewCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest_review");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const data = await TeaReview.list("-created_date");
    setReviews(data);
  };

  const groupedProducts = useMemo(() => {
    const products = reviews.reduce((acc, review) => {
      const key = review.jan_code || `no-jan-${review.id}`;
      if (!acc[key]) {
        acc[key] = {
          janCode: review.jan_code,
          teaName: review.tea_name,
          teaType: review.tea_type,
          reviews: [],
        };
      }
      acc[key].reviews.push(review);
      return acc;
    }, {});

    return Object.values(products).map(product => {
      const sortedReviews = product.reviews.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
      const totalRating = sortedReviews.reduce((sum, r) => sum + r.rating, 0);
      return {
        ...product,
        reviewCount: sortedReviews.length,
        avgRating: totalRating / sortedReviews.length,
        latestImage: sortedReviews[0]?.image_url || null,
        latestReviewDate: sortedReviews[0]?.created_date,
        reviews: sortedReviews,
      };
    });
  }, [reviews]);
  
  const filteredProducts = useMemo(() => {
    let filtered = [...groupedProducts];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.teaName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter(product => product.teaType === filterType);
    }
    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest_review":
          return new Date(b.latestReviewDate) - new Date(a.latestReviewDate);
        case "most_reviews":
          return b.reviewCount - a.reviewCount;
        case "highest_rating":
          return b.avgRating - a.avgRating;
        case "lowest_rating":
          return a.avgRating - b.avgRating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [groupedProducts, searchTerm, filterType, sortBy]);


  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-sage-800 mb-3">
            お茶商品一覧
          </h1>
          <p className="text-sage-600 text-lg">
            {groupedProducts.length}種類のお茶商品がレビューされています
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-sage-200"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
              <Input
                placeholder="商品名で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-sage-200 focus:ring-sage-400"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="border-sage-200">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="種類で絞り込み" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての種類</SelectItem>
                <SelectItem value="緑茶">緑茶</SelectItem>
                <SelectItem value="ほうじ茶">ほうじ茶</SelectItem>
                <SelectItem value="玄米茶">玄米茶</SelectItem>
                <SelectItem value="麦茶">麦茶</SelectItem>
                <SelectItem value="烏龍茶">烏龍茶</SelectItem>
                <SelectItem value="紅茶">紅茶</SelectItem>
                <SelectItem value="その他">その他</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-sage-200">
                <SelectValue placeholder="並び替え" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest_review">新着レビュー順</SelectItem>
                <SelectItem value="most_reviews">レビュー件数順</SelectItem>
                <SelectItem value="highest_rating">平均評価が高い順</SelectItem>
                <SelectItem value="lowest_rating">平均評価が低い順</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-sage-500 text-lg">商品が見つかりませんでした</p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.janCode || product.reviews[0].id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductSummaryCard
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-sage-800">
                    {selectedProduct.teaName} のレビュー一覧
                  </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-6">
                    {selectedProduct.reviews.map(review => (
                        <ReviewCard key={review.id} review={review} onClick={() => {}} />
                    ))}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}