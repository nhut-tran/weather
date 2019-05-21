console.log('im up')

const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
window.addEventListener('keypress', (e)=>{
    if(e.keyCode===13){
        
    }
})
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    document.querySelector('#messeage-1').textContent='Loading....'
    document.querySelector('#messeage-2').textContent='Please wait.....'
    const location = address.value;
    fetch(`/weather?address=${location}`)
    .then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            document.querySelector('#messeage-1').textContent = data.error;
            document.querySelector('#messeage-2').textContent = 'Please try another search';
            
        }else{
            document.querySelector('#messeage-1').textContent = `${data.temp} ${data.summary}`;
            document.querySelector('#messeage-2').textContent= data.location;
            
        }
    })
})
})