import { FC } from "react";
import icons from "images/icons.svg";

type IconProps = {
    icon: string;
    cn?: string;
    onClick?: React.MouseEventHandler<SVGSVGElement>;
    w?: number;
    h?: number;
};

const Icon: FC<IconProps> = ({ icon, cn, onClick, w, h = w }) => {
    return (
        <svg className={cn} onClick={onClick} width={w} height={h}>
            <use href={`${icons}#${icon}`} />
        </svg>
    );
};

export default Icon;
