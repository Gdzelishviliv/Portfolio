import { motion } from "framer-motion";

interface BurgerLineProps {
  showOptions: boolean;
  position: "top" | "middle" | "bottom";
}

const BurgerLine:React.FC<BurgerLineProps> = ({ showOptions, position }) => {
  return (
    <motion.div
      className="w-[20px] h-[2px] bg-white rounded-[2px]"
      animate={{
        rotate:
          position === "top"
            ? showOptions
              ? 45
              : 0
            : position === "bottom"
            ? showOptions
              ? -45
              : 0
            : 0,
        y:
          position === "top"
            ? showOptions
              ? 7
              : 0
            : position === "bottom"
            ? showOptions
              ? -7
              : 0
            : 0,
        opacity: position === "middle" ? (showOptions ? 0 : 1) : 1,
      }}
      transition={{ duration: 0.3 }}
    />
  );
};

export default BurgerLine;
