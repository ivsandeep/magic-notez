console.log('Welcome to Notes app');

let title=[];
showNotes();

// If user adds a note, add it to the local styorage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTitle=document.getElementById("title");
    title.push(addTitle.value);
    let addText = document.getElementById("addText");
    let notes = localStorage.getItem("notes");
    let notesObj = [];
    let myObj={
        title:addTitle.value,
        text:addText.value
    }
    if (notes !== null) {
        notesObj = JSON.parse(notes);
    }
    if(addText.value!="")
        notesObj.push(myObj);
    // console.log(notesObj.length);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    addTitle.value="";
    // console.log(notesObj);
    console.log(title)
    showNotes();
})  

// function to show notes from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesObj = [];
    if (notes !== null) {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element,index) {

        if(element!=""){
            html += `<div class="noteCard my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title"> ${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete note</button>
                </div>
                </div>`
            }
        });
        // console.log(notesObj.length);
    let notesElem=document.getElementById('notes');
    if(notesObj.length!==0){
        notesElem.innerHTML=html;
    }
    else {
        notesElem.innerHTML=`Nothing to show here, add your first note...`;
    }
}

// function to delete a note

function deleteNote(index){
    console.log(`I'am deleting`, index);
    let notes = localStorage.getItem("notes");
    let notesObj = [];
    if (notes !== null) {
        notesObj = JSON.parse(notes);
    }
    title.splice(index,1);
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}

// for search functionality
let searchNote=document.getElementById('searchNote');

searchNote.addEventListener("input",function(){
    let inputVal=searchNote.value;
    console.log(inputVal);
    // let notes = localStorage.getItem("notes");
    // let notesObj=JSON.parse(notes);
    let noteCard=document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element){
        let cardTxt=element.getElementsByTagName('h5')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none"
        }
    })
})

