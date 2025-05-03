// app/vitamins-supplements/page.tsx
import Link from "next/link";

export default function VitaminsSupplementsPage() {
  const categories = [
    {
      name: "Health Concerns",
      items: [
        "Hair & Skin & Nails",
        "Brain Health",
        "Joints & Bones Support",
        "Energy Boost",
        "Cardiovascular Health",
        "Digestive Health",
        "Immune Support",
        "Sexual Health",
        "Essential Fatty Acids",
        "Overall Wellness"
      ]
    },
    {
      name: "By Ingredients",
      items: [
        "Calcium & Magnesium",
        "Antioxidants",
        "Amino Acids",
        "Biotin",
        "Fish Oils & Omegas",
        "Collagen",
        "CoQ10",
        "Glucosamine & Chondroitin",
        "Folic Acid",
        "Enzyme & Digestive Aids",
        "Herb & Plant Nutrients",
        "L-Arginine",
        "L-Carnitine"
      ]
    },
    {
      name: "Women's Health",
      items: [
        "Women's Multivitamins",
        "Conception & Pregnancy",
        "Women 50++"
      ]
    },
    {
      name: "Men's Health",
      items: [
        "Men's Multivitamins",
        "Prostate Health",
        "Men 50++"
      ]
    },
    {
      name: "Child & Baby Supplements",
      items: [
        "Children's Multivitamins",
        "Gummies & Drops",
        "Children's Bone Health",
        "Nutritional Drinks"
      ]
    }
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Vitamins & Supplements</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              {category.name}
            </h2>
            <ul className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="text-gray-500 mr-2">•</span>
                  <Link 
                    href={`/vitamins-supplements/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}