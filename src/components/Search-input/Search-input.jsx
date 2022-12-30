import './Search-input.css';
import {useDispatch, useSelector} from "react-redux";
import {selectAllNotices, setFilter} from "../../store";
import {ReactSearchAutocomplete} from 'react-search-autocomplete'
import {useState} from "react";

export const SearchInput = () => {

    const dispatch = useDispatch();
    const notices = useSelector(selectAllNotices);

    const [isAdvanced, setAdvanced] = useState(false);

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
                {isAdvanced ? (<span style={{ display: 'block', textAlign: 'left' }}>tags: {item.tags}</span>) : (<span></span>)}
            </>
        )
    }

    const handleAdvancedToggle = (val) => {
        setAdvanced(val.target.checked)
    }

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: 400 }}>
                { isAdvanced ? (
                    <>
                        <div className='as-notification'>Tags are included for search</div>
                        <ReactSearchAutocomplete
                            items={notices}
                            fuseOptions={{ keys: ["title", "description", "tags"]}}
                            resultStringKeyName="title"
                            onSearch={handleOnSearch}
                            onSelect={handleOnSelect}
                            formatResult={formatResult}
                            inputDebounce={400}
                        />
                    </>
                ) : (
                    <>
                        <ReactSearchAutocomplete
                            items={notices}
                            fuseOptions={{ keys: ["title", "description"]}}
                            resultStringKeyName="title"
                            onSearch={handleOnSearch}
                            onSelect={handleOnSelect}
                            formatResult={formatResult}
                            inputDebounce={400}
                        />
                    </>

                )}
            </div>
            <div className='advanced'>
                <input type="checkbox" onChange={(val) => handleAdvancedToggle(val)}/> Advanced search
            </div>
        </div>)


}