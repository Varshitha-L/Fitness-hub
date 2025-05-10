function display(a)
{
   
    let disp= document.getElementById("disp")
    if(disp.innerHTML=='0')
    {
        disp.innerHTML = a
    }else{
        disp.innerHTML = disp.innerHTML+a
    }
    
} 
// display()
function u_clear(){

    let data=document.getElementById("disp")
    disp.innerHTML = 0
}
function calculate(){
    let data =document.getElementById("disp")
    let expression = data.innerHTML
    let res=eval(expression)
    console.log(res)
    data.innerHTML=res //to display
}