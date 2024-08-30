

function replaceText({sentece,replacement,start,end}){

    let newText = "" ;


    for(let i = 0; i = sentece.length; i++){
        
        if(i == start && i == end){
           if(!newText.includes(replacement)){
               newText += replacement +  " ";
           }
        }else{
            newText += text.charAt(i);
        }
        
    }

    return newText;

}




// for(let i = sentence.wrongSenteceStartIndex; i = sentence.wrongSenteceEndIndex; i++){
//     abc += text.charAt(i);
//      console.log(i)
// }
