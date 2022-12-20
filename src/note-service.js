import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getNotes(query) {
    await fakeNetwork(`getNotes:${query}`);
    let notes = await localforage.getItem("notes");
    if (!notes) notes = [];
    if (query) {
        notes = matchSorter(notes, query, { keys: ["first", "last"] });
    }
    return notes.sort(sortBy("last", "createdAt"));
}

export async function createNote() {
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2, 9);
    let note = { id, createdAt: Date.now() };
    let notes = await getNotes();
    notes.unshift(note);
    await set(notes);
    return note;
}

export async function getNote(id) {
    await fakeNetwork(`note:${id}`);
    let notes = await localforage.getItem("notes");
    let note = notes.find(note => note.id === id);
    return note ?? null;
}

export async function updateNote(id, updates) {
    await fakeNetwork();
    let notes = await localforage.getItem("notes");
    let note = notes.find(note => note.id === id);
    if (!note) throw new Error("No note found for", id);
    Object.assign(note, updates);
    await set(notes);
    return note;
}

export async function deleteNote(id) {
    let notes = await localforage.getItem("notes");
    let index = notes.findIndex(note => note.id === id);
    if (index > -1) {
        notes.splice(index, 1);
        await set(notes);
        return true;
    }
    return false;
}

function set(notes) {
    return localforage.setItem("notes", notes);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise(res => {
        setTimeout(res, Math.random() * 800);
    });
}
