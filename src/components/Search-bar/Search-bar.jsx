import './Search-bar.css';
import {SearchInput} from "../Search-input/Search-input";
import {useNavigation} from "react-router-dom";

export default function SearchBar() {
    const navigation = useNavigation();
    const searching = navigation.location && new URLSearchParams(navigation.location.search).has('searchInput');

    return (
        <div className='search'>
            <form id='search-form' role='search'>
                <SearchInput/>
                <div className='search-spinner' aria-hidden hidden={!searching}/>
                <div className='sr-only' aria-live="polite"/>
            </form>
        </div>
    );
}