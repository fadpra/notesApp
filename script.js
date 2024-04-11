//button to add note (anb)
const anb = document.querySelector("#addNote")
const formT = document.querySelector("#title")
const formC = document.querySelector("#content")
const formS = document.querySelector("#subject")

//display notes
const mainT = document.querySelector("#displayTitle")
const mainC = document.querySelector("#displayContent")

//notes list
const noteList = document.querySelector("#notes")
const noteT = document.querySelector(".noteTitle")
const noteC = document.querySelector(".noteContent")

//dropdown subject names
const subjects = document.querySelectorAll("#subList li")
//if certain subject btn was clicked the subject input will be filled
subjects.forEach(subject => {
    subject.addEventListener("click",()=>{
        formS.value = subject.innerHTML
    })
})

let noteArr = []

let storedNote = localStorage.getItem("note")

if(storedNote){
    noteArr = JSON.parse(storedNote)
    noteArr.forEach(note => {
        createNote(note)
    })
}

anb.addEventListener("click",() => {
    if(formT.value && formC.value && formS.value){
        let noteObj = {"title":formT.value, "content":formC.value, "subject":formS.value}
        createNote(noteObj)
        formT.value = ""
        formC.value = ""
        formS.value = ""
        noteArr.push(noteObj)
        localStorage.setItem("note",JSON.stringify(noteArr))
    }
})

function createNote(note){
    let noteDiv = document.createElement("div")
    noteDiv.classList.add("note")

    let noteTitle = document.createElement("h3")
    noteTitle.classList.add("noteTitle")
    noteTitle.innerHTML = note.title

    let noteSubject = document.createElement("h4")
    noteSubject.classList.add("noteSub")
    noteSubject.innerHTML = note.subject

    let openBtn = document.createElement("button")
    openBtn.classList.add("open")
    openBtn.innerHTML = "Open"

    let editBtn = document.createElement("button")
    editBtn.classList.add("edit")
    editBtn.innerHTML = "Edit"

    let deleteBtn = document.createElement("button")
    deleteBtn.classList.add("delete")
    deleteBtn.innerHTML = "Delete"

    noteDiv.appendChild(noteTitle)
    noteDiv.appendChild(noteSubject)
    noteDiv.appendChild(openBtn)
    noteDiv.appendChild(editBtn)
    noteDiv.appendChild(deleteBtn)

    noteList.appendChild(noteDiv)

    openBtn.addEventListener("click",()=>{
        mainT.innerHTML = note.title
        mainC.innerHTML = note.content
    })

    editBtn.addEventListener("click",()=>{
        let findIndex = noteArr.findIndex(n => n.content === note.content)
        if(findIndex !== -1){
            noteList.removeChild(noteDiv)
            noteArr.splice(findIndex,1)
            localStorage.setItem("note",JSON.stringify(noteArr))
            mainT.innerHTML = "My Notes App"
            mainC.innerHTML = "Click on a note that you want to see!"
            formT.value = note.title
            formC.value = note.content
            formS.value = note.subject
        }
    })

    deleteBtn.addEventListener("click",()=>{
        if(confirm("Are you sure that you want to delete this note?")){
            let findIndex = noteArr.findIndex(n => n.content === note.content)
            if(findIndex !== -1){
                noteList.removeChild(noteDiv)
                noteArr.splice(findIndex,1)
                localStorage.setItem("note",JSON.stringify(noteArr))
            }
            mainT.innerHTML = "My Notes App"
            mainC.innerHTML = "Click on a note that you want to see!"
        }
    })
}
