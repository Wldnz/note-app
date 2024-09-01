

export default function replaceText({sentence,replacement,start,end}){

    let newText = "" ;


    let j = 0;
    for(let i = 0; i < sentence.length; i++){
        if(i >= start && i <= end){
            newText += replacement.charAt(j);
            j++;
            if(i == end){
                newText += " ";
            }
        }else{
            newText += sentence.charAt(i);
        }
        
    }

    return newText;

}




// for(let i = sentence.wrongSenteceStartIndex; i = sentence.wrongSenteceEndIndex; i++){
//     abc += text.charAt(i);
//      console.log(i)
// }
