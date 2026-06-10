import React from 'react';
import { motion } from 'motion/react';
import { Sprout, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fdfdfb]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-green-700 uppercase bg-green-100 rounded-full"
            >
              AgriNutrigen
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-green-950 mb-8 leading-[1.1] tracking-tight"
            >
              Genomic-Driven <span className="text-green-600 italic serif">Crop Planning</span> for a Healthier Future
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 mb-10 leading-relaxed"
            >
              AgriNutrigen bridges the gap between agricultural productivity and community nutrition by recommending crops based on regional nutritional deficiencies and soil health.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/planner"
                className="w-full sm:w-auto px-8 py-4 bg-green-600 text-white rounded-full font-bold text-lg hover:bg-green-700 transition-all flex items-center justify-center group"
              >
                Start Planning <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-4 bg-white text-green-900 border border-green-100 rounded-full font-bold text-lg hover:bg-green-50 transition-all"
              >
                View Dashboard
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-100/50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-200/30 rounded-full blur-3xl opacity-50" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white border-y border-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="What it does"
              description="Analyzes regional nutritional data and soil composition to suggest the most beneficial crops for both farmers and the community."
              icon={<Sprout className="w-8 h-8" />}
            />
            <Card
              title="Problem it solves"
              description="Addresses hidden hunger and nutritional deficiencies by aligning local food production with the specific dietary needs of the population."
              icon={<ShieldCheck className="w-8 h-8" />}
            />
            <Card
              title="Key Benefits"
              description="Improves public health, enhances soil sustainability, and increases farmer income through high-value, nutrient-dense crop selection."
              icon={<Zap className="w-8 h-8" />}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to transform your community's nutrition?</h2>
              <p className="text-green-100 text-lg mb-10 max-w-2xl mx-auto">
                Join us in building a sustainable and nutrient-rich agricultural ecosystem. Start your first plan today.
              </p>
              <Link
                to="/planner"
                className="inline-block px-10 py-4 bg-white text-green-900 rounded-full font-bold text-lg hover:bg-green-50 transition-all"
              >
                Launch Planner
              </Link>
            </div>
            {/* Abstract background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-800 rounded-full -mr-32 -mt-32 opacity-50" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-800 rounded-full -ml-32 -mb-32 opacity-50" />
          </div>
        </div>
      </section>
    </div>
  );
}
