import { motion, Variants } from 'framer-motion';

export default function AnimatedHeading({
  variants,
  className,
  children,
  infinity,
}: {
  variants: Variants;
  className?: string;
  children: React.ReactNode;
  infinity?: boolean;
}) {
  return (
    <motion.h1
      initial="hidden"
      whileInView="visible"
      viewport={{ once: infinity }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.h1>
  );
}
