window.onload = function(){
  // variables
  var switchDoors = false;
  var runs = 10000;
  var doors = 3;
  var i = 0;
  var w = 0;
  var l = 0;

  var rand = function(input){
    var rNum = Math.floor(Math.random() * input);
    return rNum;
  }

  var switchEl = document.getElementById("switch");
  switchEl.innerHTML = switchDoors;
  var runEl = document.getElementById("run");
  runEl.innerHTML = runs;
  var winEl = document.getElementById("win");
  var lossEl = document.getElementById("loss");
  var doorEl = document.querySelectorAll("span");

  while (i < runs){
    // choose a door to be a winner
    var winningDoor = rand(doors);
    var winDoorEl = doorEl[winningDoor];
    winDoorEl.className = "selected";

    // now let Monty choose one
    var montyDoor = rand(doors);
    var montyDoorEl = doorEl[montyDoor];
    var doMontyDoor = function(){
      montyDoor = rand(doors);
      if (montyDoor == winningDoor) {
        doMontyDoor();
      } else {
        montyDoorEl.className = "removed";
      }
    };
    doMontyDoor();

    // now select a door to choose
    var selectDoor = rand(doors);
    var doSwitchDoor = function(){
      selectDoor = rand(doors);
      if (switchDoors === true) {
        if (selectDoor == montyDoor) {
          doSwitchDoor();
        }
      }
    };
    doSwitchDoor();

    // do we have a winner?
    if (selectDoor == winningDoor) {
      // ding ding ding ding! a new car!
      w++;
    } else {
      // ah, it's a goat - better luck next time
      l++;
    }

    // remove the classes 
    winDoorEl.className = null;
    montyDoorEl.className = null;
    // increment the count to go through it all again, like sisyphus on the wheel of fortune
    i++;
  }
  // write out the results
  winEl.innerHTML = w + " cars";
  lossEl.innerHTML = l + " goats";
}