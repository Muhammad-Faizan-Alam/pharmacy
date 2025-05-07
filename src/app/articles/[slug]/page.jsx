// components/ArticleDetailCard.jsx
import React from "react";

const demoData = {
  "top-10-health-supplements": {
    title: "Top 10000 Health Supplements",
    content: "Here are the top 10 health supplements for boosting immunity...",
    imageUrl: "/asset/article/Medicines_1.webp",
  },
  "skin-care-tips-for-summer": {
    title: "Skin Care Tips for Summer",
    content: "Keep your skin hydrated and protected from UV rays in summer...",
    imageUrl: "/asset/article/Baby_Child.webp",
  },
  "electronics": {
    title: "Electronics",
    content: "Electronics and health monitoring gadgets are trending...",
    imageUrl: "/asset/article/Electronics.webp",
  },
};

const ArticleDetailCard = ({ params }) => {
  const { slug } = params;
  const article = demoData[slug];

  if (!article) {
    return <div className="p-10 text-red-500">Article not found.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 my-10">
      {/* Article Image */}
      <div className="h-64 bg-gray-100 flex items-center justify-center">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{article.title}</h1>
        <p className="text-gray-700 text-base leading-relaxed">{article.content}</p>
      </div>
    </div>
  );
};

export default ArticleDetailCard;
