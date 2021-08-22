addNoteButton = document.querySelector(".add-note-button");
noteList = document.querySelector(".notes-list");
notePreview = document.querySelector(".note-preview");
noteTitle = document.querySelector(".note-title");
noteBody = document.querySelector(".note-body");


var notes = [];
var selectedNote = notes[0];

function selectNote(note){
    if (note){
        selectedNote = note.id;

        for (const noteItem of noteList.querySelectorAll(".note-item")){
            if (noteItem.dataset.noteId == selectedNote){
                noteItem.classList.add("note-item-selected")
            } else {
                noteItem.classList.remove("note-item-selected")
            }
        }

        notePreview.style.visibility = "visible";
        noteTitle.value = note.title;
        noteBody.value = note.body;
    } else {
        notePreview.style.visibility = "hidden";
    }
    
}

function refreshNotes() {
    notes = JSON.parse(localStorage.getItem("notes") || "[]");
    noteList.innerHTML = "";
    for (const note of notes) {
        noteList.insertAdjacentHTML("beforeend", 
        `<div class="note-item" data-note-id="${note.id}">
        <div class="note-item-title">${note.title}</div>
        <div class="note-item-body">${note.body}</div>
        <div class="note-item-time">${note.time}</div>
        </div>`)
    }
    for (const noteItem of noteList.querySelectorAll(".note-item")) {
        noteItem.addEventListener("click", ()=>{selectNote(notes.find((i)=>{
            return i.id == noteItem.dataset.noteId;
        }))});
        noteItem.addEventListener("dblclick", ()=>{deleteNote(noteItem)});
    }
}

function deleteNote(noteItem) {
    localStorage.setItem("notes", JSON.stringify(notes.filter((i)=>{
        return (i.id != noteItem.dataset.noteId);
    })));
    refreshNotes();
    selectNote(notes[0]);
}

function addNote() {
    localStorage.setItem("notes", JSON.stringify([...notes, {
        id: Date.now(),
        title: "New note",
        body: "Take note..."
    }]));
    refreshNotes();
}

function saveNote() {
    if (selectedNote){
        notes = notes.filter((i)=>{
        return i.id != selectedNote;
    });
    notes.push({
        id: selectedNote,
        title: noteTitle.value,
        body: noteBody.value
    });
    localStorage.setItem("notes", JSON.stringify(notes));
    }
    
    refreshNotes();
}

addNoteButton.addEventListener("click", ()=>{
    addNote();
});

noteTitle.addEventListener("change", ()=>{
    saveNote();
});

noteBody.addEventListener("change", ()=>{
    saveNote();
});

refreshNotes();
