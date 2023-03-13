import { FC, useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { Button, Modal } from "components";
import s from "./TTNForm.module.scss";
import { getStatus } from "redux/statusOperation";

const TTNForm: FC = () => {
    const currentTTN = useAppSelector((state) => state.history.currentTTN);
    const [TTN, setTTN] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (currentTTN) {
            setTTN(currentTTN);
            dispatch(getStatus(currentTTN));
        }
    }, [currentTTN, dispatch]);

    const submitData = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const pattern = /^[125]\d{13}$/;
        if (pattern.test(TTN)) {
            dispatch(getStatus(TTN));
        } else setError(true);
    };

    const saveData = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length > 14) return;
        if (Number(value) || !value) setTTN(value);
    };

    const closeModal = () => {
        setError(false);
    };

    return (
        <form className={s.form} onSubmit={submitData}>
            <input
                value={TTN}
                onChange={saveData}
                placeholder="Введіть ТТН"
                title="Введіть номер з 14 цифр"
            />

            <Button type="submit">Пошук</Button>
            {error && (
                <Modal close={closeModal}>
                    <p className={s.title}>Невірний формат номеру ТТН</p>
                    <p className={s.text}>
                        Номер може містити лише цифри, починатися з 1 або з 2,
                        або з 5 та мати загальну довжину 14 цифр
                    </p>
                    <Button onClick={closeModal}>ОК</Button>
                </Modal>
            )}
        </form>
    );
};

export default TTNForm;
