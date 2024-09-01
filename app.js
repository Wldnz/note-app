import axios from "axios";
import replaceText from "./func/replaceAlltext";
import {addNewNote,getAllNote,addNoteList} from './func/checkNote.mjs';

const noteList = document.querySelector('.note-list')
const data = await getAllNote();
const addNoteButton = document.querySelector('.btn-add');


// ketika web di refresh maka akan menampilkan list list note yang sudah di buat.
addNoteList(data,noteList);
// untuk menambahkan event (ketika button di click) akan menampilkan note baru;
addNewNote(addNoteButton);