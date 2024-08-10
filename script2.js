var clusters ='';
var gameArea = document.querySelector("#gamearea");
var newcluster ='';
var images;
var randomnos;
let i;
var countTap = 1;
var check_class = '';
var check_id = 10000;
var reset = '';
var count = 0 ;//change
var resetElements;
var presetElements;
var preset = '';
var scoree = 0;
var time;

function generateRandom() {
    // Step 1: Create an array with numbers 1 to 9, each appearing twice
    const numbers = [];
    for (i = 1; i <= 9; i++) {
      numbers.push(i, i,i,i);
    }
  
    // Step 2: Shuffle the array to randomize the order
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
  
    return numbers;
}

function generateimages() {
    images = ["1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png",
        "1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png",
      "1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png",
    "1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png"];

    randomnos = generateRandom();

    for (let i=0; i<images.length; i++) {
        //cluster += `<img src="${images[randomnos[i]]}" id ="${images[randomnos[i]]}" alt=""></img>`;
        clusters += `<img src="waves.png" class ="${images[randomnos[i]]}" id = "${i}" alt=""></img>`;
    };
    gameArea.innerHTML = clusters;
    reset = clusters;
    preset = clusters;
};

generateimages();
const imgElements = clusters.match(/<img[^>]*>/g);

// Log each element
imgElements.forEach(img => {
});
  

function score_10() {
    scoree += 10;
    document.querySelector("#sscore").textContent = scoree;

  
}

function score_2() {
    scoree -= 2;
    document.querySelector("#sscore").textContent = scoree;

  
}


function handleOddClick(dets) {
    const target = dets.target;
    const targetid = parseInt(dets.target.id);
    targetClass = target.classList.value;

    let newcluster = '';
    //change

    resetElements = reset.match(/<img[^>]*>/g);

    // Log each element
    resetElements.forEach(img => {
    });

    presetElements = preset.match(/<img[^>]*>/g);

    // Log each element
    presetElements.forEach(img => {
    });
    //change over
    for (let j = 0; j < 36; j++) {
        if (targetid === j) {
            check_id =targetid;
            check_class = targetClass;
            countTap += 1;
            newcluster += `<img src="${images[randomnos[j]]}" class="${images[randomnos[j]]}" id="${j}" alt=""></img>`;
        } else {
            //change
            if (count !== 0) {
                newcluster += presetElements[j];
            } else {
                newcluster += imgElements[j];
            }
            //changeover
            
        }
    }
    gameArea.innerHTML = newcluster;
    reset = newcluster;
}

function handleEvenClick(dets) {
    const target = dets.target;
    const targetid = parseInt(dets.target.id);
    targetClass = target.classList.value;

    let newcluster = '';
    var resetElements = reset.match(/<img[^>]*>/g);

    // Log each element
    resetElements.forEach(img => {
    });

    presetElements = preset.match(/<img[^>]*>/g);

    // Log each element
    presetElements.forEach(img => {
    });

    for (let j = 0; j < 36; j++) {
        if (targetid === j) {
            countTap += 1;
            newcluster += `<img src="${images[randomnos[j]]}" class="${images[randomnos[j]]}" id="${j}" alt=""></img>`;
            if (targetClass === check_class) {
                count ++ ;//change
                score_10()
            } else {
                countTap = countTap - 2;
                score_2()
            }
        } else {
            if (targetClass === check_class) {
                newcluster += resetElements[j];
            } else {
                newcluster += presetElements[j];
            }
        }
    }
    gameArea.innerHTML = newcluster;
    if (targetClass === check_class) {
        preset = newcluster;
    }
}

function click() {
    gameArea.addEventListener('click', function (dets) {
        if (countTap % 2 !== 0) {
            handleOddClick(dets);
        } else {
            handleEvenClick(dets);
        }
    });
}

click();


let timerInterval; // Global variable to hold the timer interval ID

function Timer() {
    var time = 180;

    // If there's an existing interval, clear it
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Set a new interval
    timerInterval = setInterval(function() {
        if (time > 0) {
            time--;
            document.querySelector("#time").textContent = `${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;
        } else {
            clearInterval(timerInterval);
            document.querySelector("#gamearea").innerHTML = `<h1 id="over">game over</h1>`;
        }
    }, 1000);
}

function refresh() {
    // Clear the existing interval before starting a new game
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Reset game variables
    countTap = 1;
    check_id = -1;
    count = 0;
    scoree = 0;
    time = 180;

    // Update the score and time display
    document.querySelector("#sscore").textContent = scoree;
    document.querySelector("#time").textContent = `${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;

    // Generate a new set of images and reset the game area
    generateimages();

    // Re-attach the click event listener
    click();

    // Restart the game timer
    Timer();
}

// Ensure the Timer function is called only once when the game starts
Timer();

document.querySelector("#refresh").addEventListener('click', function() {
    console.log('refresh');
    refresh();
});