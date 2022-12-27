import * as icons from "react-icons/md";

const Button = ({icon, type, onClick}) => {
    const Icon = icon;
    return (
        <button type={type} onClick={onClick}>
            {icon && <Icon size='1.3em'/>}
        </button>
    )
}

export default Button;