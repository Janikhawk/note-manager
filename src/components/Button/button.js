import * as icons from "react-icons/md";

const Button = ({icon, type}) => {
    const Icon = icon;
    return (
        <button type={type}>
            {icon && <Icon size='1.3em'/>}
        </button>
    )
}

export default Button;