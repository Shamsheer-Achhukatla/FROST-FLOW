import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10 text-center"
    >
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
        {title}
      </h1>

      {subtitle && (
        <p className="text-gray-300 mt-3">
          {subtitle}
        </p>
      )}

      <div className="mt-4 h-1 w-32 mx-auto bg-cyan-400 rounded-full"></div>
    </motion.div>
  );
}