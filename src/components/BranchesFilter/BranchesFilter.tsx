import { FC } from "react";
import { Icon } from "components";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { changeFilter } from "redux/branchesReducer";
import warehouseTypes from "db/warehouseTypes.json";
import s from "./BranchesFilter.module.scss";

const BranchesFilter: FC = () => {
    const filter = useAppSelector((state) => state.branches.filter);

    const dispatch = useAppDispatch();

    return (
        <ul className={s.filter}>
            {warehouseTypes.map(({ description }, i) => (
                <li key={description}>
                    <label className={s.checkBox}>
                        <input
                            className={s.hidden}
                            type="checkbox"
                            onChange={() => {}}
                            checked={filter[i]}
                        />
                        <Icon
                            cn={s.checkBoxIcon}
                            icon="check"
                            w={16}
                            h={15}
                            onClick={() => dispatch(changeFilter(i))}
                        />
                        <p>{description}</p>
                    </label>
                </li>
            ))}
        </ul>
    );
};

export default BranchesFilter;
