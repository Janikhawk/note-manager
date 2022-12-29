import '../../styles/input.css';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectDirectoryById, updateDirectoryAsync} from "../../store";

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
        <form className="form" onSubmit={(e) => updateDirectory(e)}>
            <label className='label'>
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
            <p className='form-buttons'>
                <button className='button' type="submit">Save</button>
                <button
                    className='button'
                    type="button"
                    onClick={() => navigate(-1)}
                >Cancel</button>
            </p>
        </form>
    );
}