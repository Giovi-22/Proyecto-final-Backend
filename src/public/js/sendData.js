const form = document.getElementById('form');
const sendButton = document.getElementById('send');
const spinner = document.createElement('span');
const toastrElement = document.getElementById('info');
const progressBar = document.getElementById('progress-bar');
spinner.classList.add('spinner');

sendButton.addEventListener('click',async ()=>{
  if(sendButton.querySelector('span')){
    sendButton.removeChild(sendButton.querySelector('span'));
  } 
const jsonData = {
    password: form.elements['password'].value,
    confirm: form.elements['confirm'].value,
    token: getUrlToken()
}

const requestOptions = {
  method: 'put',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(jsonData)
};

    sendButton.appendChild(spinner);
    fetch(`${window.location.href.split('/')[0]}//${window.location.href.split('/')[2]}/api/session/restorepassword`, requestOptions)
    .then((response)=>{
      if(response.status <= 400){
        sendButton.removeChild(sendButton.querySelector('span'));
        toastr('success',"successfully restore the password");
        setTimeout(()=>{
          window.location.href = "https://main--chic-duckanoo-ad7ca7.netlify.app"
        },4000)
      }else{
        sendButton.removeChild(sendButton.querySelector('span'));
        toastr('failed',`Failed to restore the password, error: ${response.status}`);
      }})
    .catch( (error)=>{
      toastr('failed',`Failed restore passoword, error: ${response.status}`);
      sendButton.removeChild(sendButton.querySelector('span'));
      console.error('Error al enviar la solicitud:', error);
    });
  
})

function toastr(status,message){
  switch(status){
    case 'success':
      toastrElement.classList.remove('hidde');
      toastrElement.getElementsByTagName('p')[0].innerText=message;
      toastrElement.classList.add('show','successfully');
      progressBar.classList.add('show-progress','succesfully-progress');
      setTimeout(()=>{
        toastrElement.classList.remove('show','successfully');
        progressBar.classList.remove('show-progress','succesfully-progress');
        toastrElement.classList.add('hidde')
      },3000);
      break;
    case 'failed':
      toastrElement.classList.remove('hidde');
      toastrElement.getElementsByTagName('p')[0].innerText=message;
      toastrElement.classList.add('show','failed');
      progressBar.classList.add('show-progress','failed-progress');
      setTimeout(()=>{
        toastrElement.classList.remove('show','failed');
        progressBar.classList.remove('show-progress','failed-progress');
        toastrElement.classList.add('hidde')
      },3000);
      break;
    default: console.log("se ha seleccionado un toastr incorrecto");
      break;
    }
}

function getUrlToken(){
  const jwt = window.location.href.split('/')[6];
  if(!jwt){
    return "";
  }
  return jwt;
}