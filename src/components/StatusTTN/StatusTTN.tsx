import { FC } from "react";
import { Icon } from "components";
import { useAppSelector } from "hooks/reduxHooks";
import s from "./StatusTTN.module.scss";
import { useNavigate } from "react-router";

const getBranch = (branch: string, city: string) => {
    const index = branch.indexOf(":") + 1;
    return `${branch.slice(0, index)} ${city}, ${branch.slice(index)}`;
};

const StatusTTN: FC = () => {
    const {
        status,
        receivedDate,
        deliveryDate,
        dispatchDate,
        senderBranch,
        senderCity,
        recipientBranch,
        recipientCity,
        isParcelDelivered,
        senderBranchId,
        recipientBranchId,
        error,
    } = useAppSelector((state) => state.status);

    const navigate = useNavigate();

    if (!status) return null;

    const getInfo = (id: string) => {
        navigate(`/branches/${id}`);
    };

    return (
        <div className={s.container}>
            {error ? (
                <p className={s.error}>{error}&nbsp;&#128577;</p>
            ) : (
                <>
                    <p className={s.title}>Статус</p>
                    <p className={s.status}>{status}</p>

                    {receivedDate && (
                        <div className={s.infoBox}>
                            <p>Дата та час:</p>
                            <p>{receivedDate}</p>
                        </div>
                    )}

                    <p className={s.title}>Відправка</p>

                    {dispatchDate ? (
                        <>
                            <div className={s.infoBox}>
                                <p>Дата та час:</p>
                                <p>{dispatchDate}</p>
                            </div>
                            <div className={s.infoBox}>
                                <p>Адреса:</p>
                                <div title="Клацніть щоб перейти до подробиць відділення">
                                    <Icon
                                        cn={s.icon}
                                        icon="info"
                                        w={20}
                                        onClick={() => getInfo(senderBranchId)}
                                    />
                                </div>
                                <p>{getBranch(senderBranch, senderCity)}</p>
                            </div>
                        </>
                    ) : (
                        <p>Інформація відсутня</p>
                    )}

                    <p className={s.title}>Доставка</p>
                    <div className={s.infoBox}>
                        {isParcelDelivered ? (
                            <p>Дата та час:</p>
                        ) : (
                            <p>Очікуваний час:</p>
                        )}
                        <div className={s.textBox}>
                            <p>{deliveryDate}</p>
                        </div>
                    </div>

                    <div className={s.infoBox}>
                        <p>Адреса:</p>
                        <div title="Клацніть щоб перейти до подробиць відділення">
                            <Icon
                                cn={s.icon}
                                icon="info"
                                w={20}
                                onClick={() => getInfo(recipientBranchId)}
                            />
                        </div>
                        <p>{getBranch(recipientBranch, recipientCity)}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default StatusTTN;
