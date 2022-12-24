import { getNodeText } from "@testing-library/react";
import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

const noteList = [];
const noteMap = {};

export async function getDirectories(query) {
    let notes = await fetchDirectories();
    if (!notes) notes = [];
    console.log(notes);
    const asd = normalizeList(notes);
    console.log(asd);
    return asd;
}

function normalizeList(list) {
    return list = list.reduce((acc, curr) => {
        if (!curr.parentId) {
            acc.push(curr)
        } else {
            const parent = acc.find(note => note.id === curr.parentId);
            if (!parent) return acc;
            parent.children ? parent.children.push(curr) : parent.children = [curr];
        }
        return acc;
    }, [])
}

export async function fetchDirectories() {
    try {
        const response = await fetch('http://localhost:4200/directories');
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

export async function createNote({parentId, ...updates}) {
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2, 9);
    let note = { id, createdAt: Date.now(), ...updates };
    let notes = await getDirectories();
    if (parentId) {
        const parentNote = notes.find(note => note.id === parentId);
        parentNote && parentNote.children ? parentNote.children.push(note) : parentNote.children = [note];
    } else {
        notes.unshift(note);
    }
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
