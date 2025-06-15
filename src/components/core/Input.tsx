
import type React from "react";
import { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "outline" | "filled";
  inputSize?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      variant = "default",
      inputSize = "md",
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      "rounded-md",
      "transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-1",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      fullWidth ? "w-full" : "",
    ].join(" ");

    const variantStylesMap: Record<string, string> = {
      default: "bg-white border border-gray-300 text-gray-900 focus:ring-blue-500",
      outline: "bg-transparent border-2 border-gray-400 text-gray-900 focus:ring-blue-600",
      filled: "bg-gray-100 border border-gray-200 text-gray-800 focus:ring-blue-400",
    };

    const sizeStylesMap: Record<string, string> = {
      sm: "px-2 py-1 text-sm",
      md: "px-3 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    };

    const combinedClasses = [
      baseStyles,
      variantStylesMap[variant],
      sizeStylesMap[inputSize],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <input
        ref={ref}
        className={combinedClasses}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
