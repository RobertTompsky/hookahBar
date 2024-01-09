import { ReactNode } from "react";

type changeQty = (operation: string) => void
interface CustomButtonProps {
    containerStyles?: string,
    title?: string,
    icon?: ReactNode
    onClick?: () => void | changeQty,
    textStyles?: string
}

const CustomButton = ({containerStyles, title, onClick, textStyles, icon}: CustomButtonProps) => {
    return (
        <button 
        onClick={onClick}
        className={`btn rounded-2xl ${containerStyles}`}>
            {icon && <span>{icon}</span>}
            {title && <span
            className={`font-semibold ${textStyles}`}>
                {title}
            </span>}
        </button>
    );
};

export default CustomButton;