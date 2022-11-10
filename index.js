console.log('Welcome to Notes app');

showNotes();

// If user adds a note, add it to the local styorage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addText = document.getElementById("addText");
    let notes = localStorage.getItem("notes");
    let notesObj = [];
    if (notes !== null) {
        notesObj = JSON.parse(notes);
    }
    if(addText.value!="")
        notesObj.push(addText.value);
    console.log(notesObj.length);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    console.log(notesObj);
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
    let noteNo=1;
    notesObj.forEach(function (element,index) {
        if(element!=""){
            html += `<div class="noteCard my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${noteNo++}</h5>
                <p class="card-text">${element}</p>
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
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}

// for search functionality
let searchTxt=document.getElementById('searchTxt');

searchTxt.addEventListener("input",function(){
    let inputVal=searchTxt.value;
    console.log(inputVal);
    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none"
        }
    })
})