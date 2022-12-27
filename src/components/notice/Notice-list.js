import {Notice} from './Notice';
import {Form, useNavigation, useParams, useSubmit} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import './Notice-list.css';
import {getNoticesAsync, selectByDirectoryId} from "../../store/notice-slice";

// export async function rootLoader({request}) {
//     const url = new URL(request.url);
//     const searchInput = url.searchParams.get('searchInput');
//     const directories = await getDirectories(searchInput);
//     return {data: directories, searchInput};
// }

export const NoticeList = () => {
    const {directoryId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNoticesAsync());
    }, [dispatch])

    const noticeList = useSelector(selectByDirectoryId(directoryId));



    return (
        <>

            {noticeList.length > 0 ?
                (
                    <div className='note-list'>
                        {noticeList.map((notice) => (
                            <Notice key={notice.id} notice={notice}/>
                        ))}
                    </div>

                ) :
                (<i>No notices in current folder</i>)
            }
        </>
    )
};
