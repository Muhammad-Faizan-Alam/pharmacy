// app/medicines/page.tsx
import Link from "next/link";

export default function MedicinesPage() {

  const categories = [
    {
      name: "Brain & Neurological",
      items: [
        "Alzheimer",
        "Parkinson's Disease",
        "Anxiety & Depression",
        "Sleep Disorders",
        "Stroke",
        "Vertigo",
        "Schizophrenia",
        "Epilepsy & Convulsions",
        "Brain Disorders",
        "Psychosis"
      ]
    },
    {
      name: "Chest & Respiratory",
      items: [
        "Allergies",
        "Asthma",
        "Lungs Diseases",
        "Congestion Relief",
        "Infection & Pneumonia",
        "Cough & Flu",
        "Dry Powder Inhaler"
      ]
    },
    {
      name: "Gastrointestinal",
      items: [
        "Probiotics",
        "Appetite",
        "Acidity",
        "Constipation",
        "Diarrhea",
        "Heartburn & Indigestion",
        "Haemorrhoids & Piles",
        "Irritable Bowel Syndrome",
        "Nausea & Vomiting",
        "Parasites",
        "Stomach Disorders",
        "Stomach Ulcer",
        "Flatulence"
      ]
    },
    {
      name: "Heart & Blood",
      items: [
        "Cholesterol",
        "High Blood Pressure",
        "Blood Disorders",
        "Heart Diseases",
        "Angina",
        "Anemia"
      ]
    },
    {
      name: "Muscles & Joints",
      items: [
        "Arthritis",
        "Gout",
        "Muscle & Joint Pain",
        "Muscle Spasm",
        "Bones"
      ]
    },
    {
      name: "Liver & Endocrine",
      items: [
        "Diabetes",
        "Hormonal Therapy",
        "Liver Disease",
        "Thyroid Disease",
        "Urinary Tract Infection",
        "Bladder"
      ]
    },
    {
      name: "Prostate",
      items: [
        "Kidney Disease",
        "All Infections"
      ]
    }
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Medicines</h1>
      
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
                    href={`/medicines/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
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