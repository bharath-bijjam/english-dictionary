const inputEL= document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const titleEL = document.getElementById("title");
const meaningEL = document.getElementById("meaning");
const audioEL = document.getElementById("audio");


async function fetchAPI(word){
    try {
        infoTextEl.style.display="block";
        meaningContainer.style.display="none";
        infoTextEl.textContent=`Searching The meaning of "${word}"`
        const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res)=>res.json());
        if(result.title){
        meaningContainer.style.display="block";
        titleEL.innerText=word;
        meaningEL.innerText="N/A";
        audioEL.style.display="none";
  
        }
        else{
            audioEL.style.display="inline-flex";
            infoTextEl.style.display="none";
            meaningContainer.style.display="block";
            titleEL.innerText=result[0].word;
            meaningEL.innerText=result[0].meanings[0].definitions[0].definition;
            audioEL.src=result[0].phonetics[0].audio;           
        }
    
    } catch (error) {
        infoTextEl.textContent="Something went wrong!!"  }

   
    }


inputEL.addEventListener("keyup",(event)=>{
    if(event.target.value && event.key==="Enter"){
        fetchAPI(event.target.value)

    }
})