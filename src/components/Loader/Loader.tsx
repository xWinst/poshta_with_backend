import { FC, ReactPortal } from "react";
import { createPortal } from "react-dom";
import s from "./Loader.module.scss";

const loaderRoot = document.querySelector("#loader");

const Loader: FC = (): ReactPortal | null => {
    if (loaderRoot) {
        return createPortal(
            <div className={s.overlay}>
                <div className={s.spinner}>
                    <div className={s.item}></div>
                    <div className={s.item}></div>
                    <div className={s.item}></div>
                    <div className={s.item}></div>
                    <div className={s.item}></div>
                </div>
            </div>,
            loaderRoot as Element
        );
    } else {
        return null;
    }
};

export default Loader;
