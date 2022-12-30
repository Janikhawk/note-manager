import './Tag.css';
import {WithContext as ReactTags} from "react-tag-input";
import {useEffect, useState} from "react";

const COUNTRIES = [
    'KAZAKHSTAN', 'RUSSIA', 'USA'
];

const mapToTagsArray = (list) => list.map(listItem => ({id: listItem, text: listItem}));
const tagsArrayToFlatArray = (list) => list.map(listItem => listItem.text);

const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function Tag({defaultTags, onTagAdded}) {

    const [tags, setTags] = useState([]);

    useEffect(() => {
        setTags(mapToTagsArray(defaultTags));
    }, [defaultTags]);

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        const newTagArr = [...tags, tag];
        setTags(newTagArr);
        onTagAdded(tagsArrayToFlatArray(newTagArr));
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    return (<ReactTags
        tags={tags}
        suggestions={mapToTagsArray(COUNTRIES)}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        inputFieldPosition="bottom"
        autocomplete
    />)
}