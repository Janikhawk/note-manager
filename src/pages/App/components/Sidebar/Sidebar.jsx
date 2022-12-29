import './Sidebar.css';
import {Directory} from "../../../../components/directory/Directory";
import {useSelector} from "react-redux";
import {selectRootLevel} from "../../../../store";

export default function Sidebar() {

    const directoriesRootIds = useSelector(selectRootLevel());

    return (
        <div className='sidebar'>
            <nav>
                <Directory
                    idList={directoriesRootIds}
                />
            </nav>
        </div>
    )
}