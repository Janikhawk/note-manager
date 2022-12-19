const Folder = ({folderData}) => {
    const [expand, setExpand] = useState(false);

    return (
        <div>
            <span onClick={() => setExpand(!expand)}>
                {folderData.name}
            </span>
            <div style={{display: expand ? 'block' : 'none', poaddingLeft: 20}}>
                {folderData.items && folderData.items.map((childFolderData) => (
                    <Folder folderData = {childFolderData}/>
                ))}
            </div>
        </div>
    )
};

export default Folder;