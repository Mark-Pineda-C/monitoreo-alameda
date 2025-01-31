import { motion } from "framer-motion";

export function MotionScreen({ children, keyLabel }: { children: React.ReactNode; keyLabel: string }) {
  return (
    <motion.div
      key={keyLabel}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}
