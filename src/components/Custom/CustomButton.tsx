
interface CustomButtonProps {
    containerStyles?: string,
    title: string,
    onClick?: () => void,
    textStyles?: string
}

const CustomButton = ({containerStyles, title, onClick, textStyles}: CustomButtonProps) => {
    return (
        <button 
        onClick={onClick}
        className={`p-1 rounded-xl shadow-lg ${containerStyles}`}>
            <span
            className={`font-semibold ${textStyles}`}>
                {title}
            </span>
        </button>
    );
};

export default CustomButton;