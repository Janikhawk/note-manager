import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectDirectoryById, updateDirectoryAsync} from "../store/directory-slice";

export default function EditDirectory() {
    const navigate = useNavigate();
    const {directoryId} = useParams();
    const selectedDirectory = useSelector(state => selectDirectoryById(state, directoryId));
    const directoryData = {...selectedDirectory};

    const dispatch = useDispatch();

    const changeName = (event) => {
        directoryData.name = event.target.value;
    }

    const updateDirectory = async (event) => {
        try {
            event.preventDefault();
            dispatch(updateDirectoryAsync(directoryData));
            navigate(-1);
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <form id="folder-form" onSubmit={(e) => updateDirectory(e)}>
            <label>
                <span>Name</span>
                <input
                    className="text-input"
                    type="text"
                    name="name"
                    placeholder="Name"
                    defaultValue={directoryData.name}
                    onChange = {changeName}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button
                    type="button"
                    onClick={() => { navigate(-1); }}
                >Cancel</button>
            </p>
        </form>
    );
}