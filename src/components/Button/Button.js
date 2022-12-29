import '../../styles/input.css';

const Button = ({icon, type, onClick}) => {
    const Icon = icon;
    return (
        <button className='button' type={type} onClick={onClick}>
            {icon && <Icon size='1.3em'/>}
        </button>
    )
}

export default Button;