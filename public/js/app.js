console.log('im up')

const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
window.addEventListener('keypress', (e)=>{
    if(e.keyCode===13){
        
    }
})
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    document.querySelectorAll('#messeage').textContent=''
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
            
            document.querySelector('#messeage-1').textContent = `Current Temperature: ${Math.round((data.temp-32)/1.8)}`
           
            document.querySelector('#messeage-2').textContent = `Maxtemperature:  ${Math.round((data.temperatureHigh-32)/1.8)}`
            document.querySelector('#messeage-3').textContent= `Mintemperature: ${Math.round((data.temperatureLow-32)/1.8)}`
            document.querySelector('#messeage-4').textContent= `Humidity: ${data.humidity}`
            document.querySelector('#messeage-5').textContent=`RainPro: ${data.RainProbility}`;
            
            document.querySelector('#messeage-6').textContent= data.location;
            
        }
    })

    
})
address.value ='';
})