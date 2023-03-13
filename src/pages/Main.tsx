import { TTNForm, StatusTTN, History, Loader } from "components";
import { useAppSelector } from "hooks/reduxHooks";
import { FC } from "react";

const Main: FC = () => {
    const isLoading = useAppSelector((state) => state.status.isLoading);

    return (
        <>
            <TTNForm />
            <div className="box">
                <StatusTTN />
                <History />
            </div>
            {isLoading && <Loader />}
        </>
    );
};

export default Main;
