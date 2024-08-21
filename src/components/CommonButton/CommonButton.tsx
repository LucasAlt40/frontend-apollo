import React from "react";

interface CommonButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  onClick,
  children,
  disabled = false,
  style = {},
}) => {
  const customStyles: React.CSSProperties = {
    alignItems: "center",
    background: "var(--color-rose)",
    borderRadius: "50px",
    border: "none",
    display: "flex",
    gap: "10px",
    height: "50px",
    justifyContent: "center",
    padding: " 10px",
    position: "relative",
    width: "320px",
    color: "#FFF",
    fontSize: "1rem",
    fontWeight: 500,
    ...style,
  };

  return (
    <button onClick={onClick} disabled={disabled} style={customStyles}>
      {children}
    </button>
  );
};

export default CommonButton;
