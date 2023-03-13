import { Icon, Button } from "components";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleBtnClick = () => {
        navigate("/", { replace: true });
    };

    return (
        <div className="container">
            <h2 className="title">404 Сторінка не знайдена</h2>
            <Icon cn="img404" icon="404" w={500} />
            <p>Ой! Сторінка, яку ви шукаєте, не існує.</p>

            <Button onClick={handleBtnClick}>Перейти на головну</Button>
        </div>
    );
};

export default PageNotFound;
