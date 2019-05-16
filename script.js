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

const block = document.getElementsByClassName('myDiv');

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#Active_learning_a_reaction_game 
// #3
function random(min, max) {
    let num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

let score = 0;

function lower(i) {
    block[i].style.transform = "translateY(0px)";
    blockObj[i].active = false;
    block[i].style.backgroundColor = 'red';
    console.log(blockObj[i]);
}

function raise(i) {
    block[i].style.transform = "translateY(-150px)";
    blockObj[i].active = true;
    block[i].style.backgroundColor = 'green';
    // add event listener: if clicked and active === true, call lower(). else setTimeout and call lower()
    block[i].addEventListener("click", function () {
        if (blockObj[i].active === true) {
            score = score + 1;
            $('.scoreContainer h2').html(score);
            lower(i);
        }
    })
    console.log(blockObj[i]);
    setTimeout(lower, random(1000, 1200), i);
}

// https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop

// add randomizer for i
// const controlArray = [0, 1, 2, 3, 4, 5]
// const randomArray = [0, 1, 2, 3, 4, 5]

let i = 0;                              // initial value of i


$(function () {

    function init() {
        setTimeout(function () {             // set timeout to pause time between blocks being raised
            raise(i);
            i++;
            if (quit === true) {
                alert("Game stopped! Press start to play again!");
                return

            } else if (i < block.length) {   // loop through all blocks and call raise() on each one
                init();
            } else {                        // once the block array reaches the end, counter is reset to 0 and init() function is called again to 
                i = 0;                          // 'restart' the loop
                init();
            }
        }, random(1000, 1500))
    }

    //  dont need set interval here, but it seems to make the game faster and more random. else if i > ~30 setInterval(init, 2000);?
        // setInterval(init, 16000);
        // 16.2

    // make lower() and raise() a shorter interval
        // init();    
    $('.startButton').on("click", function () {
        quit = false;
        i = 0;
        $('.scoreContainer h2').html(0);
        init();
    })

    quit = false;
    $('.quitButton').on("click", function () {
        quit = true;
    })
});
    
