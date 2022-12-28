import {useDispatch, useSelector} from "react-redux";
import {selectAllNotices, setFilter} from "../../store/notice-slice";
import {ReactSearchAutocomplete} from 'react-search-autocomplete'

export const Input = () => {

    const dispatch = useDispatch();
    const notices = useSelector(selectAllNotices);

    const handleOnSearch = (string, results) => {
        dispatch(setFilter(string))
    }


    const handleOnSelect = (item) => {
        dispatch(setFilter(item.title))
    }

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>title: {item.title}</span>
                <span style={{ display: 'block', textAlign: 'left' }}>description: {item.description}</span>
            </>
        )
    }

    return (
        <>
            <div style={{ width: 400 }}>
                <ReactSearchAutocomplete
                    items={notices}
                    fuseOptions={{ keys: ["title", "description"] }}
                    resultStringKeyName="title"
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    formatResult={formatResult}
                    inputDebounce={400}
                />
            </div>
        </>)


}