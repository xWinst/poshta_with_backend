import { BranchesForm, BranchesFilter, BranchesList, Loader } from "components";
import { useAppSelector } from "hooks/reduxHooks";
import { FC } from "react";

const Branches: FC = () => {
    const isLoading = useAppSelector((state) => state.branches.isLoading);

    return (
        <>
            <BranchesForm />
            <BranchesFilter />
            <BranchesList />
            {isLoading && <Loader />}
        </>
    );
};

export default Branches;
