// app/medicated-cosmetics/page.tsx
import Link from "next/link";

export default function MedicatedCosmeticsPage() {
  const categories = [
    {
      name: "Face Care",
      items: [
        "Face Wash & Cleanser",
        "Acne Treatments",
        "Sun Protectors",
        "Skin Whitening",
        "Serums"
      ]
    },
    {
      name: "Hair Care",
      items: [
        "Medicated Shampoo",
        "Oils & Serums",
        "Hair & Scalp Treatments",
        "Hair Loss Products"
      ]
    },
    {
      name: "Oral Care",
      items: [
        "Toothpastes",
        "Mouth Washes"
      ]
    },
    {
      name: "Medicated Creams & Lotions",
      items: []
    },
    {
      name: "Medicated Soaps",
      items: []
    },
    {
      name: "Hand Sanitizers",
      items: []
    },
    {
      name: "Gels",
      items: []
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Medicated Cosmetics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              {category.name}
            </h2>
            {category.items.length > 0 ? (
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-gray-500 mr-2">•</span>
                    <Link
                      href={`/medicated-cosmetics/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">Coming soon</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}