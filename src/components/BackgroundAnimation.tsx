import React from "react";
import { motion } from "framer-motion";
export function BackgroundAnimation() {
  return <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-gray-900" />
      {/* Animated circles */}
      <motion.div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl" animate={{
      x: [0, 100, 0],
      y: [0, 50, 0]
    }} transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }} />
      <motion.div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl" animate={{
      x: [0, -100, 0],
      y: [0, -50, 0]
    }} transition={{
      duration: 15,
      repeat: Infinity,
      ease: "linear"
    }} />
    </div>;
}