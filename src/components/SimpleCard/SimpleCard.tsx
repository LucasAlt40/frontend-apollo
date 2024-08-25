import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
};

const SimpleCard = ({ title, description, children }: Props) => {
  return (
    <div className="w-full bg-tinnyGray rounded-lg p-4 mb-5">
      <div>
        <p className="text-lg font-bold">{title}</p>
        <span>{description}</span>
      </div>
      {children}
    </div>
  );
};

export default SimpleCard;
