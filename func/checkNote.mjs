
import axios from "axios";

const baseUrl = "http://localhost:3000/api/v1";

export async function getAllNote(){
    const {data} = await axios.get('http://localhost:3000/api/v1/note');

    return data;
}


export const addNoteList = (data,noteListDiv) => {

    const dataNote = data.map(value => {
        const {id,title,desc,date} = value;
        return `<div class="note">
                    <h2>${title}</h2>
                    <p>${desc}</p>
                    <p>${date}</p>
                    <div class="pointer" data-id="${id}"></div>
                </div>`
    }).join('')
    noteListDiv.innerHTML = dataNote;
    addEventIntoNote();
}

export function addNewNote(button){
    button.addEventListener('click', function(){
        console.log(`Button ${this.textContent} got clicked`);
        document.querySelector('.sideRight').innerHTML = `<input type="text" placeholder="Title.." class="note-title"">
        <textarea placeholder="Description" class="description"></textarea>
        <div class="button button-note">
        <button type="submit" class="btn btn-save">Save Changes</button>
        <button type="submit" class="btn btn-check">Check All Grammar</button>
        <button type="submit" class="btn btn-discard">Delete Note</button>
        <button type="submit" class="btn btn-delete">Delete Note</button>
        <button type="submit" class="btn btn-close">Close Note</button>
        </div>`;
        addEventIntoNote2();
    })
}
function addEventIntoNote(){
    document.querySelectorAll('.pointer').forEach((value) => {
        value.addEventListener('click',async function(){
            const newDataNote = await getAllNote();
            const idElemenet = this.dataset.id
            const {id,title,desc,date} = newDataNote.filter((value) => value.id == idElemenet)[0];
            document.querySelector('.sideRight').innerHTML = `<input type="text" placeholder="Title.." class="note-title" value="${title}">
            <textarea placeholder="Description" class="description">${desc}</textarea>
            <div class="button button-note">
            <button type="submit" class="btn btn-save" data-id="${id}">Save Changes</button>
            <button type="submit" class="btn btn-check" data-id="${id}">Check All Grammar</button>
            <button type="submit" class="btn btn-discard" data-id="${id}">Delete Note</button>
            <button type="submit" class="btn btn-delete" data-id="${id}">Delete Note</button>
            <button type="submit" class="btn btn-close" data-id="${id}">Close Note</button>
            </div>`;
            addEventIntoNote2();
        })
    })
}


function addEventIntoNote2(){
    console.log('Button di klik')
    console.log(document.querySelector('.button'))
    Array.from(document.querySelector('.button').children).forEach((value) => {
        console.log(document.querySelector('.button'))
        value.addEventListener('click',async function() {
            console.log(this)
            const dataNote = getDataNoteValue(this);
            const {id,title,desc,date} = dataNote;
            if(this.textContent.includes('Save')){
                console.log(`this button "${this.textContent} got hit"`)
            }else if(this.textContent.includes("Check")){
                
                const data = await checkGrammarApi(desc);
                console.log(data);
                if (data.length == 0) return;
                const text = prettyArray(newArray(data));
                const modal = modalGrammar(text,id);
                modalGrammarSetup(500,dataNote);
            }else if(this.textContent.includes("Delete")){
                deleteApi(baseUrl,getDataNoteValue(this));
            }else if(this.textContent.includes("Discard") || this.textContent.includes("Close")){
                if(confirm("Are You Sure?")){
                    document.querySelector('.sideRight').innerHTML = "";
                }
            }
        })
    })
}

// module export 


// helper function

const headers = {
    'Content-Type' : 'application/x-www-form-urlencoded'
}


const saveAPi = async(baseUrl,data) => {
    const api = await axios.put(`${baseUrl}/update`,data,{
       headers
    })
}

const deleteApi = async(baseUrl,data) => {
    const api = await axios.delete(`${baseUrl}/delete`,{
        headers,
        data : data
    })
}

const prettyArray = (newArray) => {
    let text = "";
    for(let i = 0; i < JSON.stringify(newArray).length; i++){
        if(JSON.stringify(newArray).charAt(i) == ',' || JSON.stringify(newArray).charAt(i) == '{' || JSON.stringify(newArray).charAt(i) == '[' || JSON.stringify(newArray).charAt(i) == ']'){
            text += JSON.stringify(newArray).charAt(i) + "\n"
        }else if(JSON.stringify(newArray).charAt(i) == '}' ){
            text += "\n" +  JSON.stringify(newArray).charAt(i) + "\n"
        }else if(JSON.stringify(newArray).charAt(i) == '"' ){
            text += " " +  JSON.stringify(newArray).charAt(i) + " "
        }else{
        text += JSON.stringify(newArray).charAt(i);
        }
    }
    return text;
}

const modalGrammar = (text,id) => {
    document.body.innerHTML += `<div class="modal">
                        <h2>Grammar Check</h2>
                    <textarea class="description" readonly>${text}</textarea>
                        <div class="button">
                            <button type="submit" class="btn btn-close-save" data-set=${id}>Save Changes & Close</button>
                            <button type="submit" class="btn btn-close-modal" data-set=${id}>CLOSE</button>
                        </div>
                    </div>`;
}

const modalGrammarSetup = (delay,data) => {
    setTimeout(() =>   document.querySelector('.btn-close-modal').addEventListener('click',function(){
        console.log("Close Button got Injected");
        this.parentElement.parentElement.remove();
        location.reload();
    }),delay)
    setTimeout(() =>   document.querySelector('.btn-close-save').addEventListener('click',function(){
        saveAPi(baseUrl,data)
        this.parentElement.parentElement.remove();
        location.reload();
    }),delay)
}

const newArray = (data) => {
    let newArray = [];
    data.forEach((value,index) => {
        newArray.push({
            count : index + 1,
            sentence : value.sentence,
            replacement : value.replacement
        })
    })
    return newArray;
}

const checkGrammarApi = async(desc) => {
    let {data} = await axios.post('https://api.sapling.ai/api/v1/edits',{
        key : "ICT22NAYQ3VWWTJHLN9SCKFMZTL7O248",
        session_id: "test session",
        text : desc
    });
    return data = data.edits;
}

const getDataNoteValue = (target) => {
    const id = target.dataset.id? target.dataset.id : Date.now();
    const title = document.querySelector('.sideRight').children[0].value;
    const desc = document.querySelector('.sideRight').children[1].value;
    const date = '31/08/2024';
    const data = {id,title,desc,date};

    return data;

}

