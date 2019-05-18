// create function that will iterate through an array (block) that will hold a list of divs that represent the moles
// iterate through the array
// for each div, call the raise() function on it
// raise() will translateY this div upwards by 200px
// update active property to 'true'
// when the user clicks on a div with an active property of 'true', add 1 to the score
// call lower() after a random setTimeout   
// lower() will translateY this div back to its original position
// update active property to false
// reset counter and loop through the initial function again
// setInterval for the initial function

// const topDiv = document.getElementsByClassName('scoreContainer')[0];

const blockObj = [
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
]

const mole = document.getElementsByClassName('moleDiv');
// const items = document.getElementsByClassName('itemSet');


// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#Active_learning_a_reaction_game 
// #3
function random(min, max) {
    let num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

let score = 0;

function lower(i) {
    mole[i].style.transform = "translateY(0px)";
    mole[i].style.height = "117%";
    blockObj[i].active = false;
    mole[i].style.visibility = 'hidden';
    console.log(blockObj[i]);
}

// let element = document.getElementsByClassName('score-animation'); 

// add event listener: if clicked and active === true, call lower(). else setTimeout and call lower()

function raise(i) {
    mole[i].style.visibility = 'visible';
    mole[i].style.transform = "translateY(-80px)";
    mole[i].style.height = "145%";
    blockObj[i].active = true;
    mole[i].addEventListener("click", function () {
        if (blockObj[i].active === true) {
            // element[i].classList.remove("score-animation");
            // void element.offsetWidth;
            // element[i].classList.add("score-animation");
            score = score + 1;
            $('#score').html(score);
            lower(i);
        }
    })
    console.log(blockObj[i]);
    setTimeout(lower, random(1000, 1200), i);
}

let seconds = undefined;

function timer() {
    let time = new Date;
    return setInterval(function() {
        seconds = parseInt((new Date - time) / 1000)
        $('#timer').html(`${seconds}s`);
    }, 1000)
}



let countdown = undefined;
// timer provided by David Thavixay

// https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop



$(function () {
    function init() {
        let i = random(0,6);                 // i is set to a random value between 0 and 6
        setTimeout(function () {             // set timeout to pause time between blocks being raised
            raise(i);                        // call raise() on i which is a random value between 0 and 6
            if (quit === true) {
                alert("Game stopped! Press start to play again!");
                return
                
            } else if ( seconds >= 20) {
                alert("Time up!");
                clearInterval(countdown);
                return
            } else {                              
                init()                      // function calls itself again with a new random number out of the array
            }
        }, random(1000, 1500))
    }
  
    $('.startButton').on("click", function () {
        quit = false;
        $('#score').html(0);
        init();
        countdown = timer();
        $('.startButton').css('display', 'none');
        $('.quitButton').css('display', 'block');
    })



    quit = false;
    $('.quitButton').on("click", function () {
        quit = true;
        clearInterval(countdown);
        $('.startButton').css('display', 'block');
        $('.quitButton').css('display', 'none');
        return

    })


    $('.container').mousedown(function() {
        $('.container').css('cursor', 'url(assets/mallet-icon-down.png),auto');
    }).mouseup(function() {
        $('.container').css('cursor', 'url(assets/mallet-icon.png),auto');
    }) 
});
    
