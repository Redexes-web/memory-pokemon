const numberOfCards = 28
let currentPair = [];
let tries = 0;
let finded = 0;

let shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  } 

let getDoubleRandomizedImages = (numberOfImages) => {
    images = Array.from(Array(numberOfImages+1).keys())
    images.shift();
    images = images.map(x => x + ".png")
    images = images.concat(images);
    return shuffle(images);

}
let memoImages = getDoubleRandomizedImages(14)





let showImage = (id) => {
    let current = document.getElementById("card-" + id);
    current.style.backgroundImage = "url('img/" + memoImages[id] + "')";
}
let removeBackgroundFromId = (id) => {
    let div = document.getElementById("card-" + id);
    div.setAttribute('style', '');

}
let clickedDiv = (currentId) => {
    checkPairs(currentId);
}
let checkPairs = (currentId) => {

    if (currentPair.length < 2) {
        currentPair.push(currentId)
        showImage(currentId);
        if (currentPair.length === 2 && currentPair[0] != currentPair[1]) {
            tries+=1;
            document.getElementById('tries').innerHTML = tries
            if (pairs[currentPair[0]] === pairs[currentPair[1]]) {
                finded+=2
                document.getElementById("card-" + currentPair[0]).style.backgroundColor = "rgba(0,200,50,.5)"
                document.getElementById("card-" + currentPair[1]).style.backgroundColor ="rgba(0,200,50,.5)"
                document.getElementById('finded').innerHTML = finded
                if (finded === numberOfCards) {
                    alert("win!!!")
                }
                currentPair = []
            }
        }
    }
    else{
        for (const id of currentPair) {
            removeBackgroundFromId(id)
        }
        currentPair = []
    checkPairs(currentId)
    }
}
let getPairs = () => {
    let pairs =[]
    for (let i = 0; i < numberOfCards; i++) {
        pairs.push(memoImages[i])
    }
    return pairs
}

let pairs = getPairs();

let generateBoard = () =>{
    let app = document.getElementById('app');
    let cards = [];

    let triesTitle = document.createElement("h2");
    triesTitle.innerHTML = "nombre d'essais: "
    let triesCounter = document.createElement("span");
    triesCounter.id = "tries"
    triesCounter.innerHTML = "0"
    triesTitle.appendChild(triesCounter)
    
    let findedTitle = document.createElement("h2");
    let findedCounter = document.createElement("span");
    findedTitle.innerHTML = "nombre de carte retournées: "
    findedCounter.id = "finded"
    findedCounter.innerHTML = "0"
    findedTitle.appendChild(findedCounter)
    
    let title = document.createElement("h1");
    title.innerHTML = "Memory Pokemon"

    let header = document.createElement("header");
    header.appendChild(title);
    header.appendChild(triesTitle);
    header.appendChild(findedTitle);
    document.body.prepend(header)
    for (let index = 0; index < numberOfCards; index++) {
        let card = document.createElement("div");
        card.id = "card-"+index
        card.setAttribute('onclick','checkPairs('+ index +')')
        app.appendChild(card)
        
    }
}
generateBoard();
