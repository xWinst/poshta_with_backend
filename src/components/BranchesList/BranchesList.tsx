import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "hooks/reduxHooks";
import warehouseTypes from "db/warehouseTypes.json";
import s from "./BranchesList.module.scss";

const trimString = (str: string) => {
    if (str.startsWith("С")) return str;

    let colonIndex = str.indexOf(":");
    let openBracketIndex = str.indexOf("(");

    if (openBracketIndex === -1) return str.slice(0, colonIndex);
    else return str.slice(0, Math.min(colonIndex, openBracketIndex));
};

const BranchesList: FC = () => {
    const { list, filter } = useAppSelector((state) => state.branches);

    const navigate = useNavigate();

    let visibleWaerehouses: string[] = [];
    warehouseTypes.forEach(({ ref }, i) => {
        if (filter[i]) visibleWaerehouses.push(ref);
    });

    const filteredList = list.filter((branch) =>
        visibleWaerehouses.includes(branch.type)
    );

    return (
        <>
            {list[0]?.isShow && (
                <>
                    <div className={s.title}>
                        <p className={s.city}>{list[0].city}</p>
                        <p>Список відділень:</p>
                    </div>
                    <ul className={s.list}>
                        {filteredList.map(({ id, name, adress }) => (
                            <li
                                key={id}
                                onClick={() => navigate(`/branches/${id}`)}
                            >
                                <p>{trimString(name)}</p>
                                <p className={s.adress}>{adress}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};

export default BranchesList;
