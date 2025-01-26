import { motion } from "framer-motion";

export function Loader({ size = "md", color = "primary" }) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const colorClasses = {
    primary: ["bg-blue-500", "bg-blue-400", "bg-blue-300"],
    secondary: ["bg-purple-500", "bg-purple-400", "bg-purple-300"],
    accent: ["bg-pink-500", "bg-pink-400", "bg-pink-300"],
    white: ["bg-white", "bg-gray-200", "bg-gray-300"],
  };

  const circleVariants = {
    start: { scale: 0, opacity: 0.5 },
    end: { scale: 1, opacity: 1 },
  };

  const containerVariants = {
    start: { rotate: 0 },
    end: {
      rotate: 360,
      transition: {
        duration: 1.5,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  };

  return (
    <motion.div
      className={`relative inline-flex ${sizeClasses[size]}`}
      variants={containerVariants}
      initial="start"
      animate="end"
    >
      {[...Array(3)].map((_, index) => (
        <motion.span
          key={index}
          className={`absolute w-3 h-3 rounded-full ${colorClasses[color][index]}`}
          variants={circleVariants}
          initial="start"
          animate="end"
          transition={{
            duration: 0.75,
            yoyo: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 0.15,
          }}
          style={{
            top: "0%",
            left: "50%",
            rotate: index * 120,
            translateX: "-50%",
            originY: "150%",
          }}
        />
      ))}
    </motion.div>
  );
}
