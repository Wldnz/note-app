
const json = require('body-parser/lib/types/json');
const fs = require('fs');
const nodePath = require('path');

const realtivePath = '../data/data.json';

const path = nodePath.resolve(__dirname,realtivePath); 



function getAllData(){
    let data = fs.readFileSync(path,'utf8');
    data = JSON.parse(data);
    // return sebauh object bukan object string
    return data
}


function insertData(data){
    let dataFile = getAllData();
    
    dataFile.push(data)
    fs.writeFileSync(path,JSON.stringify(dataFile))
}

function changeAlldata(data){
    fs.writeFileSync(path,JSON.stringify(data))
}

const checkDataIsSucessfullUpdate = (data1,data2) => {
    return (data1.filter((value,index) => !data2.includes(value)));
}

const checkDataId = (dataFile,data,id) => {
    let isFind = false;
    const newData = dataFile.map((value) => {
        if(value.id == id){
            console.log('Data dengan id yang sama berhasil ditemukan dan akan dilakukan Perubahan')
            isFind =  true;
            return value = data;
        }
        return value;
    });
    return {
        newData,
        isFind
    };
}


function updateData(id,data){
    let dataFile = getAllData();
   
    const {newData,isFind} = checkDataId(dataFile,data,id);
    if(isFind){
        console.log("Data Sudah Ada, Dan akan melakukan perubahan")
        return changeAlldata(newData)
    }else{
        console.log("Data Masih Blm Ada Di Data, & Akan Ditambahkan Kedalam Data");
        insertData(data)
    }
    
}

function deleteData(id){
    let dataFile = getAllData();

    const newData = dataFile.filter((value) => value.id != id);

    changeAlldata(newData);

}

exports.modules = {
    getAllData,
    insertData,
    updateData,
    deleteData,
}
