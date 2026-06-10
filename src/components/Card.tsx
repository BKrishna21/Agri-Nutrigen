import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface CardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, icon, children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white p-6 rounded-3xl border border-green-50 shadow-sm hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {icon && <div className="mb-4 text-green-600">{icon}</div>}
      <h3 className="text-xl font-bold text-green-900 mb-2">{title}</h3>
      {description && <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>}
      {children}
    </motion.div>
  );
};

export default Card;
