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
        "overflow-hidden rounded shadow border-t-2 border-white",
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
      <div className="overflow-hidden border-2 border-black rounded">
        <div className="w-full h-full py-2 px-4 border-b-2 border-white border-opacity-80">
          {children}
        </div>
      </div>
    </button>
  );
};

export default Button;
