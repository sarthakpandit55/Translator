
const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcons = document.querySelector(".exchange"),
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i")

selectTag.forEach((tag, id) => {
    for (const country_code in countries){

        // seting the English and Hindi as default language.
        let selected;
        if(id == 0 && country_code == "en-GB"){
            selected = 'selected';
        }
        else if(id == 1 && country_code == "hi-IN"){
            selected = 'selected';
        }
        
        // This is the where I am adding options tag inside select tag.
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

// Exchange the textarea by clicking the exchange button.

exchangeIcons.addEventListener("click", () => {
    let tempText = fromText.value;
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
})

translateBtn.addEventListener("click", () =>{
    let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text)return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    
    // fetching API response and returning it with parsing into js object
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translation");
    });
})

icons.forEach(icon => {
    icon.addEventListener("click", (target) => {
        if(icon.classList.contains("fa-copy")){

            // enabled the copy button to copy the text of the textarea.
            if(icon.id == "from"){
                navigator.clipboard.writeText(fromText.value);
            }
            else{
                navigator.clipboard.writeText(toText.value);
            }
        }
        // enables the volume button to speak the text of the textarea
        else{
            let utterance;
            if(icon.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            }
            else{
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});