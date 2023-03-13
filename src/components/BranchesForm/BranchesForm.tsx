import { FC, useState, FormEvent, ChangeEvent } from "react";
import { useAppDispatch } from "hooks/reduxHooks";
import { Button, Modal } from "components";
import { getBranches } from "redux/branchesOperation";
import s from "../TTNForm/TTNForm.module.scss";

const BranchesForm: FC = () => {
    const [city, setCity] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const submitData = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const pattern = /^[а-яА-ЯІіЇїЄєҐґ '-]+$/;
        if (pattern.test(city)) {
            dispatch(getBranches(city));
        } else setError(true);
    };

    const saveData = (event: ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const closeModal = () => {
        setError(false);
    };

    return (
        <form className={s.form} onSubmit={submitData}>
            <input
                value={city}
                onChange={saveData}
                placeholder="Введіть назву міста"
            />

            <Button type="submit">Пошук</Button>
            {error && (
                <Modal close={closeModal}>
                    <p className={s.title}>Невірна назва міста</p>
                    <p className={s.text}>
                        Назва міста може містити лише літери Української або
                        Російської абетки, тире та пробіл
                    </p>
                    <Button onClick={closeModal}>ОК</Button>
                </Modal>
            )}
        </form>
    );
};

export default BranchesForm;
