import '../../styles/input.css';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAllNoticesTags, selectNoticeById, updateNoticeAsync} from "../../store";
import Tag from "../Create/Tag/Tag";

export default function EditNotice() {
    const navigate = useNavigate();
    const {noticeId} = useParams();
    const selectedNotice = useSelector(state => selectNoticeById(state, noticeId));
    const noticeData = {...selectedNotice};
    const noticesTags = useSelector(selectAllNoticesTags());

    const dispatch = useDispatch();

    const navigateBack = () => {
        navigate(`/directory/${noticeData.directoryId}`)
    }

    const updateNotice = async (event) => {
        try {
            event.preventDefault();
            dispatch(updateNoticeAsync(noticeData));
            navigateBack();
        } catch(err) {
            console.log(err)
        }
    }

    const handleTagAddition = (tags) => {
        noticeData.tags = tags;
    }

    return (
        <form className="form" onSubmit={(e) => updateNotice(e)}>
            <label className='label'>
                <span>Title</span>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    defaultValue={noticeData.title}
                    onChange = {(event) => {noticeData.title = event.target.value}}
                />
            </label>
            <label className='label'>
                <span>Description</span>
                <textarea
                    name="description"
                    defaultValue={noticeData.description}
                    rows={6}
                    onChange = {(event) => {noticeData.description = event.target.value}}
                />
            </label>
            <label className='label'>
                <span>Tags</span>
                <Tag
                    suggestions={noticesTags}
                    defaultTags={noticeData.tags || []}
                    onTagAdded={handleTagAddition}
                />
            </label>
            <p className='form-buttons'>
                <button className='button' type="submit">Save</button>
                <button
                    className='button'
                    type="button"
                    onClick={navigateBack}
                >Cancel</button>
            </p>
        </form>
    );
}