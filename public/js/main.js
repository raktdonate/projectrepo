const input=document.querySelectorAll('.inp')
let a=0;
const btn=document.querySelector('.btn')
btn.addEventListener('click',()=>{
    for(let i=0;i<input.length;i++){
        console.log(input[i].value)
    }
    a++;
    // console.log(input[0],input[1])
    if(input[0].value>=18&&input[1].value>=40&&input[4].value==='Female'){
        var tag = document.createElement("p");
        var text = document.createTextNode("You are eligible to donate!!");
        tag.appendChild(text);
        var element = document.querySelector(".eligibilitybox");
        console.log(element.children)
        if(a==0){
            element.appendChild(tag);
        }
        else{
            element.replaceChild(tag, element.lastChild);
        }
    }
    else{
        var tag = document.createElement("p");
        var text = document.createTextNode("Not eligible to donate!!");
        tag.appendChild(text);
        var element = document.querySelector(".eligibilitybox");
        if(a==0){
            element.appendChild(tag);
        }
        else{
            element.replaceChild(tag, element.lastChild);
        }
    }
})