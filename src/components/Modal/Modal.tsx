import { FC, useEffect, ReactPortal } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.scss";

const modalRoot = document.querySelector("#modal");

type ModalProps = {
    close: () => void;
    children: React.ReactNode;
};

const Modal: FC<ModalProps> = ({ close, children }): ReactPortal | null => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    });

    useEffect(() => {
        window.addEventListener("keydown", closeModal);
        return () => window.removeEventListener("keydown", closeModal);
    });

    const closeModal = (event: KeyboardEvent) => {
        if (event.code === "Escape") {
            close();
        }
    };

    const handleBackdropclick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            close();
        }
    };

    if (modalRoot) {
        return createPortal(
            <div className={s.overlay} onClick={handleBackdropclick}>
                <div className={s.modal}>{children}</div>
            </div>,
            modalRoot as Element
        );
    } else {
        return null;
    }
};

export default Modal;
