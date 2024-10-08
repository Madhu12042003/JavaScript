const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-button");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("input").value;
    //console.log(inpWord);
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML=`
            <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()" style="height: 50px;width: 50px;">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>
            <p class="word-meaning">${data[0].meanings[1].definitions[0].definition}</p>
            <p class="word-example">${data[0].meanings[1].definitions[0].example || ""}</p>`;
            sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
            console.log(sound);
        })
        .catch( () => {
            result.innerHTML = `<h3 class="error">Couldn't find the word</h3>`;
        });
});

function playSound(){
    sound.play();
}