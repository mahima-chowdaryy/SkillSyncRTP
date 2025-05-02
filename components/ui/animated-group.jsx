import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AnimatedGroup = ({
  children,
  className,
  variants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
        },
      },
    },
  },
  initial = "hidden",
  animate = "visible",
  ...props
}) => {
  // Convert children to array to wrap each child in a motion.div
  const childrenArray = React.Children.toArray(children);

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      animate={animate}
      variants={variants.container}
      {...props}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={variants.item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
