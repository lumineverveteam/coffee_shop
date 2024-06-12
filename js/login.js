import fetchLoginData from "./fetch-login-data.js";

const mailInput=document.getElementById('mail-input')
const passInput=document.getElementById('pass-input')
const errorContainer=document.getElementById('error-container')
const loginBtn=document.querySelector('.login-btn')
const errorSpan=document.querySelector('.error-span')
const mainsec=document.querySelector('.mainsec')
const checkboxRemember=document.getElementById('checkbox')
let rememberArray=JSON.parse(localStorage.getItem('remember')) || [];
let rememberUser={}
// Load remembered user data if available
window.addEventListener('load', () => {
    if (rememberArray.length > 0) {
        const lastRememberedUser = rememberArray[rememberArray.length - 1];
        mailInput.value = lastRememberedUser.Email;
        passInput.value = lastRememberedUser.password;
        checkboxRemember.checked = true;
    }
});
//functions
 function validPass(){

    fetchLoginData().then((data) => {
        const users=Array.isArray(data)?data:[data]
        let result=users.find(user=>user.Email===mailInput.value && user.password===passInput.value)
        if(result ){
            if (checkboxRemember.checked) {
                rememberUser = {
                    id: rememberArray.length+1,
                    Email: mailInput.value,
                    password: passInput.value
                };
                
                let rememberFind=rememberArray.find(user=>user.Email===rememberUser.Email && user.password===rememberUser.password)
               if(!rememberFind){
                rememberArray.push(rememberUser);
                addLocalStorage();
               }
               
            }
             window.location.href = 'index.html';
         
        }else{
            errorContainer.style.display='block'
        
        }
            })

 }
 function addLocalStorage(){
   
    localStorage.setItem('remember',JSON.stringify(rememberArray))
  

}

 //events
 loginBtn.addEventListener('click',(e)=>{
    // console.log(e);
    validPass()

})
mainsec.addEventListener('submit',(e)=>{
    e.preventDefault()
    validPass()
})
loginBtn.addEventListener('keypress',(e)=>{
    if(e.key='enter'){
        validPass()
    }

})


