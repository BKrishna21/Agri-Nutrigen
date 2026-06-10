import React from 'react';
import Card from '../components/Card';
import { MapPin, AlertCircle, Wheat, TrendingUp, Users, Droplets } from 'lucide-react';

export default function Dashboard() {
  const sampleData = [
    {
      region: "Karnataka Region",
      deficiency: "Iron Deficiency",
      crop: "Spinach, Ragi (Finger Millet)",
      soil: "Red Soil",
      impact: "High",
      population: "1.2M"
    },
    {
      region: "Punjab Region",
      deficiency: "Vitamin A",
      crop: "Carrots, Sweet Potatoes",
      soil: "Alluvial Soil",
      impact: "Medium",
      population: "800K"
    },
    {
      region: "Tamil Nadu",
      deficiency: "Zinc Deficiency",
      crop: "Rice (Biofortified), Pulses",
      soil: "Black Soil",
      impact: "High",
      population: "2.5M"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fdfdfb] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-green-950 mb-2">Regional Dashboard</h1>
          <p className="text-gray-600">Overview of nutritional needs and crop suggestions across different regions.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border border-green-50 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Population Impacted</p>
              <p className="text-2xl font-bold text-gray-900">4.5M</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-green-50 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Critical Deficiencies</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-green-50 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Adoption Rate</p>
              <p className="text-2xl font-bold text-gray-900">68%</p>
            </div>
          </div>
        </div>

        {/* Main Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {sampleData.map((item, index) => (
            <Card key={index} title={item.region} className="relative overflow-hidden group">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Soil Type</p>
                    <p className="text-gray-700 font-medium">{item.soil}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Primary Deficiency</p>
                    <p className="text-red-700 font-bold">{item.deficiency}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Wheat className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Suggested Crops</p>
                    <p className="text-green-800 font-bold">{item.crop}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                  <div className="flex items-center space-x-1">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-gray-500">Water Need: Medium</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {item.impact} Priority
                  </span>
                </div>
              </div>
              
              <Wheat className="absolute -bottom-4 -right-4 w-24 h-24 text-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
