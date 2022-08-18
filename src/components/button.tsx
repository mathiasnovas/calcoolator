import classNames from "classnames";

export const Button = ({
  title,
  size,
  variant = "default",
  onClick,
  children,
  className,
}: {
  title?: string;
  size?: "small";
  variant?: "default" | "orange" | "blue" | "green";
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      title={title || ""}
      className={classNames(
        "py-2 px-4 rounded shadow",
        {
          "bg-orange-300": variant === "orange",
          "bg-blue-200": variant === "blue",
          "bg-pink-200": variant === "default",
          "bg-teal-200": variant === "green",
          "text-xs": size === "small",
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
