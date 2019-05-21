
const moleObj = [
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
]

const moles = document.getElementsByClassName('mole-div');
let score = 0;
let seconds = undefined;
let countdown = undefined;
let quit = false;

function timer() {
    let time = Date.now() + 32000;
    return setInterval(function () {
        seconds = parseInt((time - Date.now()) / 1000)
        $('#timer').html(`${seconds}`);
    }, 1000)
}


function random(min, max) {
    let num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

// This function will set the mole back to its initial position behind the mound of dirt and set its 'active' state to 'false', making it unclickble for a point.

function lower(i) {
    moles[i].style.transform = "translateY(0%)";
    moles[i].style.height = "117%";
    moleObj[i].active = false;
    moles[i].style.visibility = 'hidden';
}

// This function will first raise the mole 'div' upwards, add styling, and set its 'active 'state to 'true'. If the raised mole is clicked while 'active', the mole's image will change and 1 point will be added to the score. The lower() function is then called if the mole is clicked, or after a set timeout has elapsed. 

function raise(i) {
    moles[i].style.visibility = 'visible';
    moles[i].style.transform = "translateY(-65%)";
    moles[i].style.height = "145%";
    moleObj[i].active = true;
    moles[i].addEventListener("click", function () {
        if (moleObj[i].active === true) {
            moles[i].querySelector("img").src = "assets/diglett-hit-nodirt.png"
            $('#plus-one').addClass("score-animation");
            score = score + 1;
            $('#score').html(score);
            lower(i);
        }
    })
    setTimeout(lower, random(1000, 1200), i);
}

// document ready
$(function () {

    // init() will first generate a random number between 0-5. The loop with the counter 'j' is resetting the images back to it's original state before the next mole is called. A setTimeout is used to 'pause' time between moles being raised. The function calls itself again with a new random number out of the array.
    function init() {
        let i = random(0,6);                
        for (j = 0; j < moles.length; j++) {
            moles[j].firstElementChild.src = "assets/diglett-no-dirt.png";
        }
        $('#plus-one').removeClass("score-animation");
        setTimeout(function () {            
            raise(i);                        
            if (quit === true) {
                alert("Game stopped! Press start to play again!");
                return
            } else if ( seconds <= 0) {
                alert(`Time up! Final score: ${score}`);
                clearInterval(countdown);
                $('.start-button').css('display', 'block');
                $('.quit-button').css('display', 'none');
                return
            } else {                              
                init()                      
            }
        }, random(1000, 1500))
    }
  
    // Start Button
    $('.start-button').on("click", function () {
        quit = false;
        score = 0;
        $('#score').html(0);
        countdown = timer();
        init();
        $('.start-button').css('display', 'none');
        $('.quit-button').css('display', 'block');
    })

    // Quit Button
    $('.quit-button').on("click", function () {
        quit = true;
        clearInterval(countdown);
        $('.start-button').css('display', 'block');
        $('.quit-button').css('display', 'none');
        return
    })

    // Title Overlay
    $('.container').mousedown(function() {
        $('.container').css('cursor', 'url(assets/mallet-icon-down.png),auto');
    }).mouseup(function() {
        $('.container').css('cursor', 'url(assets/mallet-icon.png),auto');
    }) 

    $('.modal-overlay').on('click', function() {
        $('.start-overlay').css('display', 'none');
        $('.start-overlay').css('display', 'none');
    })
});
    


                // REFERENCES
// reference used for the random function
    // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#Active_learning_a_reaction_game 

// reference used for setting a delay in a loop
    // https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop

// timer created with assistance from David Thavixay

// modal background created by https://www.heropatterns.com/
