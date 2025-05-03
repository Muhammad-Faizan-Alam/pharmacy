// app/surgical-support-braces/page.tsx
import Link from "next/link";

export default function SurgicalSupportBracesPage() {
  const categories = [
    {
      name: "Surgical Supplies",
      items: [
        "Syringe",
        "IV Sets",
        "Camula",
        "Butterfly",
        "Infusion",
        "Lancets",
        "Needles",
        "Masks",
        "Bandages"
      ]
    },
    {
      name: "Mobility Support",
      items: [
        "Wheelchairs",
        "Commode Chairs",
        "Walkers",
        "Cane & Crutches",
        "Rollators"
      ]
    },
    {
      name: "Support & Braces",
      items: [
        "Knee Support",
        "Elbow Supporter",
        "Lumbosacral Belts",
        "Ankle Support",
        "Wrist Support"
      ]
    },
    {
      name: "OT Dresses & PPE",
      items: [
        "Surgical Gowns",
        "Scrubs",
        "Face Masks",
        "PPE",
        "Gloves"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Surgical & Support Braces</h1>

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
                    href={`/surgical-support-braces/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
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