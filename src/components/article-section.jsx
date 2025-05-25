import React from "react";
import ArticleCard from "./medicincard";

const ArticlesSection = () => {
  const articles = [
    {
      date: "April 29, 2025",
      title: "Medicines",
      imageUrl: "/asset/article/Medicines_1.webp",
    },
    {
      date: "April 15, 2025",
      title: "babyChild",
      imageUrl: "/asset/article/Baby_Child.webp",
    },
    {
        date: "April 15, 2025",
        title: "Electronics",
        imageUrl: "/asset/article/Electronics.webp",
      },
      {
        date: "April 15, 2025",
        title: "Supplements",
        imageUrl: "/asset/article/Vitamins-_-Supplements.webp",
      },
      {
        date: "April 15, 2025",
        title: "SkinCare",
        imageUrl: "/asset/article/Skin-Care.webp",
      },
  ];

  return (
    <div className="flex flex-wrap px-11 bg-primary py-12 gap-5">
      {articles.map((article, index) => (
        <ArticleCard
          key={index}
          date={article.date}
          title={article.title}
          imageUrl={article.imageUrl}
        />
      ))}
    </div>
  );
};

export default ArticlesSection;
