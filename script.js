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

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#Active_learning_a_reaction_game 
// #3
function random(min, max) {
    let num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

let score = 0;

function lower(i) {
    mole[i].style.transform = "translateY(0px)";
    blockObj[i].active = false;
    // block[i].style.backgroundColor = 'red';
    console.log(blockObj[i]);
}

function raise(i) {
    mole[i].style.transform = "translateY(-80px)";
    blockObj[i].active = true;
    // block[i].style.backgroundColor = 'green';
    // add event listener: if clicked and active === true, call lower(). else setTimeout and call lower()
    mole[i].addEventListener("click", function () {
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

// const randomArray = [0, 1, 2, 3, 4, 5]


const controlArray = [0, 1, 2, 3, 4, 5]
// let j = random(0,6);
// console.log(j);
// let i = 0;                              // initial value of i

// because 'i' is getting a random value each time, i cannot do i++ to get to the end of the array
    // so i have an array 'j' that is running 'parallel' to the 'i' array and 'j' will increase by 1 each time the loop is run. it will keep intended position of 'i' in it's array

$(function () {
    function init() {
        let i = random(0,6);                 // i is set to a random value between 0 and 6
        setTimeout(function () {             // set timeout to pause time between blocks being raised
            raise(i);                        // call raise() on i which is a random value between 0 and 6
            j++;                             // increase j counter by one. Control array length matches the div array length
            if (quit === true) {
                alert("Game stopped! Press start to play again!");
                return

            } else if (j < controlArray.length) {   // loop through div array. increase j by one until it reaches the end of the div array length
                init();
            } else {                        // once the block array reaches the end, j counter is reset to 0 and init() function is called again to 
                j = 0;                          // 'restart' the loop
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
        j = 0;
        $('.scoreContainer h2').html(0);
        init();
    })

    quit = false;
    $('.quitButton').on("click", function () {
        quit = true;
    })
});
    
