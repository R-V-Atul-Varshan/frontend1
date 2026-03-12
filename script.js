const API="https://b-hrc4.onrender.com"

let currentUser=""



function showLogin(){

signupPage.classList.add("hidden")
loginPage.classList.remove("hidden")

}



function signup(){

fetch(API+"/signup",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({

username:su_user.value,

password:su_pass.value

})

})

.then(r=>r.json())

.then(d=>{

alert(d.msg)

showLogin()

})

}



function login(){

fetch(API+"/login",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({

username:li_user.value,

password:li_pass.value

})

})

.then(r=>r.json())

.then(d=>{

if(d.msg=="success"){

currentUser=li_user.value

loginPage.classList.add("hidden")

dashboard.classList.remove("hidden")

}

else{

alert("Invalid login")

}

})

}



function upload(){

let file=image.files[0]

let form=new FormData()

form.append("image",file)

form.append("username",currentUser)

fetch(API+"/upload",{

method:"POST",

body:form

})

.then(r=>r.blob())

.then(blob=>{

let url=URL.createObjectURL(blob)

result.innerHTML=

`<img src="${url}">
<br>
<a href="${url}" download>
<button>Download Image</button>
</a>`

})

}



function loadHistory(){

fetch(API+"/history/"+currentUser)

.then(r=>r.json())

.then(data=>{

history.innerHTML=""

data.forEach(i=>{

let img=document.createElement("img")

img.src=API+"/"+i

history.appendChild(img)

})

})

}
