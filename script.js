const theTimer = document.querySelector(".timer");
const resetButton = document.querySelector("#reset");
const originText = document.querySelector("#origin-text p").innerHTML;
const testArea = document.querySelector("#test-area");
const testWrapper = document.querySelector(".test-wrapper");
const error = document.querySelector(".error");

var timer = [0, 0, 0, 0];
var interval;
var timeRunning = false;
var errorDetect = 0;

function start()
{
    let textEnteredLenght = testArea.value.length;
    console.log(textEnteredLenght);
    if(textEnteredLenght === 0 && !timeRunning)
    {
        timeRunning = true;
        interval = setInterval(runTimer, 10);
    }
}
function spellCheck()
{
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if(textEntered == originText)
    {
        clearInterval(interval);
        testWrapper.style.borderColor = "green";
    }
    else
    {
        if(textEntered == originTextMatch)
        {
            testWrapper.style.borderColor = "#65CCf3";
        }
        else
        {
            errorDetect++;
            error.style.color = "white";
            error.style.background = "red";
            error.innerHTML = "Detected errors: " + errorDetect;
            testWrapper.style.borderColor  = "red";
        }
    }
}
function reset()
{
    clearInterval(interval);
    interval = null;
    timer = [0, 0 ,0, 0];
    timeRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    errorDetect = 0;
    error.style.color = "red";
    error.style.background = "white";
    error.innerHTML = "Detected errors: 0";
}
function leadingZero(time)
{
    if(time <= 9)
    {
        time = "0" + time;
    }
    return time;
}
function runTimer()
{
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) -(timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);