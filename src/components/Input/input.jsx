import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setFilter} from "../../store/notice-slice";

export const Input = ({searching}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            dispatch(setFilter(searchTerm))
        }, 400)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])


    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return <input
        id='searchInput'
        className={[searching ? 'loading' : '', 'text-input'].join(' ')}
        aria-label='Search notes'
        placeholder='Search'
        type='search'
        name='searchInput'
        defaultValue={searchTerm}
        onChange={handleSearchInputChange}
    />;
}