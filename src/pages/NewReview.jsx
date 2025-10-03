import React, { useState } from "react";
import { TeaReview } from "@/entities/TeaReview";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CheckCircle2 } from "lucide-react";
import ReviewForm from "@/components/ReviewForm";

export default function NewReview() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await TeaReview.create(data);
      setShowSuccess(true);
      setTimeout(() => {
        navigate(createPageUrl("Reviews"));
      }, 2000);
    } catch (error) {
      console.error("レビューの投稿に失敗しました", error);
    }
    setIsSubmitting(false);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-white/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border-2 border-sage-200">
          <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-sage-800 mb-3">投稿完了!</h2>
          <p className="text-sage-600 text-lg">レビューが正常に投稿されました</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-sage-800 mb-3">
            新規レビュー投稿
          </h1>
          <p className="text-sage-600 text-lg">
            お気に入りのお茶をレビューしましょう
          </p>
        </div>

        <ReviewForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}