import React from "react";

const ArticleCard = ({ date, title, imageUrl, className = "" }) => {
  return (
    <div
      className={`relative w-[300px] h-[220px] rounded-xl overflow-hidden font-sans group cursor-pointer ${className}`}
    >
      {/* Image */}
      <img
        src={imageUrl}
        alt="article-cover"
        className="w-full h-full object-cover transition duration-300"
      />

      {/* Dark overlay from bottom to top on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Description sliding from bottom on hover */}
      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <p className="text-xs text-white/90 mb-1">{date}</p>
        <p className="text-lg text-white font-semibold">{title}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
