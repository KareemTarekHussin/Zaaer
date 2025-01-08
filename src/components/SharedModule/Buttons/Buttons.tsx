import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-extrabold transition duration-200 ",
  {
    variants: {
      variant: {
        primary: "bg-white text-black  hover:bg-gray-800 hover:border-0 hover:text-slate-50 shadow-md",
        outline: "bg-transparent hover:bg-black text-black hover:text-white border border-gray-300 hover:border-0 duration-0 ",
        destructive: "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-400/40 ",
        ghost: "bg-black hover:bg-white text-white hover:text-black shadow-md",
        secondary: "bg-mainColor hover:bg-[#bcd358] text-black shadow-md",
      },
      size: {
        xs: "px-2 text-xs h-6",
        sm: "px-3 text-sm h-8",
        md: "px-4 text-md h-10",
        lg: "px-6 text-lg h-12",
      },
      fullWidth: {
        true: "w-full",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "md",
    },
  }
);

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ className, children, variant, size, fullWidth, rounded, ...rest }: IProps) => {
  return (
    <button
      className={`${buttonVariants({ variant, size, fullWidth, rounded })} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
