const  socket=io('http://localhost:8000')
 
const form = document.getElementById('send-container')
const messsageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")
var audio=new Audio("facebook-messenger-tone-wapking-fm-mp3-17015-19072-43455.mp3")
const append=(message,position)=>{
    const messageElement=document.createElement('div')
    messageElement.innerText=message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position=="left") {
        audio.play();
    }
    
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInp.value;
    append(`You: ${message}`,'right')
    socket.emit('send',message);
    messageInp.value='';
})
const name=prompt("Enter your Name to join");
    socket.emit('new-user-joined',name);


socket.on('user-joined',name=>{
append(`${name} joined the chat`,"left")
})
socket.on('receive',data=>{
    append(`${data.name} : ${data.message}`,'left')
})

socket.on('left',name=>{
    append(`${name.name} left the chat`,'left')
})


