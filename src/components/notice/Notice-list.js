import {Notice} from './Notice';
import {useDispatch} from "react-redux";
import './Notice-list.css';
import {updateNoticesPositions} from "../../store/notice-slice";
import {useCallback, useEffect, useState} from "react";
import update from 'immutability-helper'

export const ItemTypes = {
    CARD: 'card',
}

export function NoticeList({noticeList}) {
    const [notices, setNotices] = useState(noticeList);

    useEffect(() => {
        setNotices(noticeList);
    }, [noticeList]);

    const dispatch = useDispatch();
    const moveNotice = useCallback(
        (id, toIndex, fromIndex) => {
            dispatch(updateNoticesPositions(update(notices, {
                $splice: [
                    [fromIndex, 1],
                    [toIndex, 0, notices[fromIndex]],
                ],
            })))
        },
        [notices, setNotices, dispatch],
    );

    return (
            <div>
                {notices.length > 0 ?
                    (
                        <div  className='note-list'>
                            {notices.map((notice, index) => (
                                <Notice
                                    key={notice.id}
                                    id={notice.id}
                                    notice={notice}
                                    moveNotice={moveNotice}
                                    index={index}
                                />
                            ))}
                        </div>
                    ) :
                    (<i>No notices in current directory</i>)
                }
            </div>
    )
};
