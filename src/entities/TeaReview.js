// 簡易版のTeaReviewエンティティ（実際の実装ではバックエンドAPIと連携）
export class TeaReview {
  static async list(sortBy = "-created_date") {
    // ダミーデータを返す（実際の実装ではAPIコールを行う）
    return [
      {
        id: 1,
        tea_name: "伊右衛門",
        tea_type: "緑茶",
        supermarket: "セブンイレブン",
        price: 150,
        volume: "525ml",
        jan_code: "4901777355473",
        rating: 4,
        review_text: "さっぱりとした味わいで、渋みも程よく美味しいです。コンビニで手軽に買えるのも良いですね。",
        image_url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        created_date: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        tea_name: "お～いお茶",
        tea_type: "緑茶",
        supermarket: "ファミリーマート",
        price: 140,
        volume: "525ml",
        jan_code: "4901777279421",
        rating: 5,
        review_text: "定番の味で安心して飲めます。緑茶本来の風味がしっかりと感じられて、毎日飲んでも飽きません。",
        image_url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        created_date: "2024-01-14T15:20:00Z"
      },
      {
        id: 3,
        tea_name: "午後の紅茶 ストレート",
        tea_type: "紅茶",
        supermarket: "ローソン",
        price: 160,
        volume: "500ml",
        jan_code: "4902102072373",
        rating: 3,
        review_text: "甘すぎず、紅茶の香りも良いです。ただし、もう少し濃い目の方が好みです。",
        image_url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        created_date: "2024-01-13T09:45:00Z"
      }
    ];
  }

  static async create(data) {
    // ダミーの作成処理（実際の実装ではAPIコールを行う）
    console.log("新しいレビューを作成:", data);
    return {
      id: Date.now(),
      ...data,
      created_date: new Date().toISOString()
    };
  }
}