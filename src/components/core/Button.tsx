"use client";

import type React from "react";
import { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      fullWidth ? "w-full" : "",
    ].join(" ");

    const variantStylesMap: Record<string, string> = {
      primary: [
        "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm",
        "hover:from-orange-600 hover:to-amber-600 hover:shadow-md",
        "focus:ring-orange-500",
        "active:from-orange-700 active:to-amber-700",
      ].join(" "),
      secondary: [
        "bg-gray-100 text-gray-900 shadow-sm",
        "hover:bg-gray-200 hover:shadow-md",
        "focus:ring-gray-500",
        "active:bg-gray-300",
      ].join(" "),
      outline: [
        "border-2 border-orange-500 text-orange-600 bg-transparent",
        "hover:bg-orange-50 hover:border-orange-600",
        "focus:ring-orange-500",
        "active:bg-orange-100",
      ].join(" "),
      ghost: [
        "text-gray-600 bg-transparent",
        "hover:bg-gray-100 hover:text-gray-900",
        "focus:ring-gray-500",
        "active:bg-gray-200",
      ].join(" "),
      danger: [
        "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm",
        "hover:from-red-600 hover:to-red-700 hover:shadow-md",
        "focus:ring-red-500",
        "active:from-red-700 active:to-red-800",
      ].join(" "),
    };

    const sizeStylesMap: Record<string, string> = {
      sm: "px-3 py-2 text-sm gap-2",
      md: "px-4 py-3 text-base gap-2",
      lg: "px-6 py-4 text-lg gap-3",
      xl: "px-8 py-5 text-xl gap-3",
    };

    const iconSizeMap: Record<string, string> = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-7 w-7",
    };

    const combinedClasses = [
      baseStyles,
      variantStylesMap[variant],
      sizeStylesMap[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={combinedClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <div
              className={[
                "animate-spin rounded-full border-2 border-current border-t-transparent",
                iconSizeMap[size],
              ].join(" ")}
            />
            Loading...
          </>
        ) : (
          <>
            {leftIcon && <div className={iconSizeMap[size]}>{leftIcon}</div>}
            {children}
            {rightIcon && <div className={iconSizeMap[size]}>{rightIcon}</div>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
