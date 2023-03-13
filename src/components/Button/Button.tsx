import { FC } from "react";
import s from "./Button.module.scss";

type ButtonProps = {
    cn?: string;
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
};

const Button: FC<ButtonProps> = ({
    cn,
    type = "button",
    onClick,
    children,
}) => {
    return (
        <button type={type} className={`${s.button} ${cn}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
