import localforage from "localforage";

export async function getDirectories() {
    try {
        const response = await fetch('http://localhost:4200/directories');
        let directories = await response.json();
        if (!directories) directories = [];
        return normalizeList(directories);
    } catch (err) {
        console.log(err);
    }
}

export async function createDirectory(directory) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(directory)
    };
    fetch('http://localhost:4200/directories', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
}

export async function updateDirectory() {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'NAME' })
        };
        const response = await fetch('http://localhost:4200/directories/1', requestOptions);
        const data = await response.json();
        return data;
    } catch (err) {
    }

}



export async function getNoteListByFolderId(folderId) {
    const notices = await fetchNotes();
    if (!notices) return [];
    // they are not the same type
    return notices.filter(notice => notice.directoryId == folderId);
}

export async function fetchNotes() {
    try {
        const response = await fetch('http://localhost:4200/notices');
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

export async function createNote(notice) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notice)
    };
    fetch('http://localhost:4200/notices', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
}

// export async function updateNote(id, updates) {
//     await fakeNetwork();
//     let notes = await localforage.getItem("notes");
//     let note = notes.find(note => note.id === id);
//     if (!note) throw new Error("No note found for", id);
//     Object.assign(note, updates);
//     await set(notes);
//     return note;
// }
//
// export async function deleteNote(id) {
//     let notes = await localforage.getItem("notes");
//     let index = notes.findIndex(note => note.id === id);
//     if (index > -1) {
//         notes.splice(index, 1);
//         await set(notes);
//         return true;
//     }
//     return false;
// }

function normalizeList(list) {
    const idMapping = list.reduce((acc, el, i) => {
        acc[el.id] = i;
        return acc;
    }, {});
    let root;
    list.forEach((el) => {
        el.isOpen = false;
        if (!el.parentId) {
            root = el;
            return;
        }
        const parentEl = list[idMapping[el.parentId]];
        parentEl.children ? parentEl.children.push(el) : parentEl.children = [el];
    });

    return root.children;
}
