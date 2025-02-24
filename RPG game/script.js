let xp=0, health=100, gold=50;
let currentWeapon = 0;
let fighting, monsterHealth;
let inventory= ["stick"]; 
const button1 = document.querySelector("#button1"); 
 const button2 = document.querySelector("#button2");
 const button3 = document.querySelector("#button3");
 const text = document.querySelector("#text");
 const xpstat = document.querySelector("#xpstat");
 const healthText = document.querySelector("#healthText");
 const goldText = document.querySelector("#goldText");
 const monsterStats = document.querySelector("#monsterStats");
 const monsterHealthText  = document.querySelector("#monsterHealth");
 const monsterNameTExt = document.querySelector("#monsterName");
 const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "hammer",
    power: 30
  },
  {
    name: "sword",
    power: 50
  },
  {
    name:"dick",
    power: 100
  }
 ];
 const monsters= [
  {
    name: "Slime",
    level: 2,
    health: 15
  },
  {
    name:"faggot",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health:300
  }
 ];
const locations = [
    {
        name: "Town Square",
        "button text": ["Go to store", " Go to cave", "fight Dragon"],
        "button function": [goStore, goCave, fightDragon],
        text: "You are in Town Square and you see the sign \"store\""
 }, 
 {
    name: "store",
    "button text": ["Buy 10 Health for 10 gold", "buy a weapon for 10 gold ", "Go Town"],
    "button function":[buyHealth, buyWeapon, goTown],
  text: "You entered the store"
  },
  {
    name: "cave",
    "button text": ["fight lime", "fight fake beast", "go town"],
    "button function":[fightSlime, fightBeast, goTown],
    text: "you enter the cave in your adventure and see some monster chose who to fight"
  },
  {
    name: "fight",
    "button text":["Attack", "Dodge", "Run"],
    "button function": [attack, dodge, goTown],
    text:"you are fighting a monster."
  },
  {
    name: "kill monster",
    "button text":["go to town square", "go to town square", "go to town square"],
    "button function":[goTown, goTown, easteregg],
    text: "The monster is defeated, you found gold and gained experience."
  },
  {
    name: "lose",
    "button text":["REPLAY ?", "REPLAY ?", "REPLAY ?"],
    "button function":[restart, restart, restart],
    text: "you die. 💀 "
  },
  {
    name: "Win",
    "button text":["REPLAY ?", "REPLAY ?", "REPLAY ?"],
    "button function":[restart, restart, restart],
    text: "You won!! "
  },
  {
    name: "Easter Egg",
    "button text":["2", "8", "Go to town square"],
    text: " You found a secret game, pick a number above. ten numbers will be randomly chosen. If one of your numbers matches you win!!"
  }
];

 button1.onclick = goStore;
 button2.onclick = goCave;
 button3.onclick = fightDragon;

 function update(location) {
  monsterStats.style.display = "none";
  button1.innerText= location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button function"][0];
  button2.onclick = location["button function"][1];
  button3.onclick = location["button function"][2];
  text.innerText = location.text;

 }

 function goTown(){
   update(locations[0]);
 }


  function goStore() {
    update(locations[1]);
    
  }
  function goCave() {
update(locations[2])
  }
  function fightDragon() {
    fighting = 2;
    goFight();
  }
  function fightSlime(){
    fighting = 0;
    goFight();
  }
  function fightBeast(){
    fighting = 1;
    goFight();
  }
  function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterHealthText.innerText = monsterHealth;
    monsterNameTExt.innerText = monsters[fighting].name;
  }

  function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You are attacking with " + weapons[currentWeapon].name + ".";
    if(isMonsterHit()){
      health -=getMonsterAttackValue(monsters[fighting].level);
    }else{
      text.innerText= "You missed!!";
    }
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText= monsterHealth; 
    if (health <= 0) {
      lose();
    }else if (monsterHealth <= 0){
      if(fighting ===2){
        winGame();
      }else{
        defeatMonster();
      }
    } 
    if (Math.random()<= .1 && inventory.length !==1) {
      text.innerText += "Your " + inventory.pop() + " braks.";
      currentWeapon--;
      
    }
  }
  function getMonsterAttackValue(level){
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
  }
  function isMonsterHit(){
    return Math.random() > .2 || health < 20;

  }
  function dodge() {
text.innerText = " You dodge the attack from the " + monsters[fighting].name + ".";
  }
  function lose() {
    update(locations[5])
  }
  function winGame() {
    update(locations[6]);
  }
  function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
  }
  function buyHealth(){
    if(gold >= 10){
      gold = gold - 10;
      health = health + 10;
      goldText.innerText=gold;
      healthText.innerText= health;
    }else{
      text.innerText ="Not enough gold";
    }


  }
  function buyWeapon(){
    if(currentWeapon<weapons.length -1){
    if(gold >= 30){
      gold = gold - 30;
      currentWeapon+= 1;
      goldText.innerText = gold;
      let newWeapon= weapons[currentWeapon].name;
      text.innerText = "You are attacking with a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText+= " In your inventory you have: "+ inventory;
    }else{
      text.innerText= "you do not have enough gold to buy this weapon."
    }
  }else{
    text.innerText = "you already have the most powerful weapon!";
    button2.innerText= "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;

    }
    
  }
    function sellWeapon(){
       if(inventory.length >1){
        gold+= 15;
        goldText.innerText= gold;
        let currentWeapon = inventory.shift();
        text.innerText = "you sold a " + currentWeapon + ".";
        text.innerText+= " You still have: " + inventory;
       }else{
        text.innerText = "don't sell your only Weapon!!";
       }
    }
    function restart(){
     xp=0;
     health=100;
     gold=50;
    currentWeapon = 0;
    inventory= ["stick"]; 
    healthText.innerText = health;
    goldText.innerText= gold;
    xpText.innerText = xp;
    goTown();
    }

    function easteregg() {
      update(locations[7]);
    }

    function picktwo(){
      pick(2);
    }
    function pickeight(){
      pick(8)
    }
    function pick(guess){
      let numbers = [];
      while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random()* 11))
      }
      text.innerText= "You picked: " + guess + "Here are the random numbers: \n";

      for(let i = 0; i<10; i++) {
        text.innerText += numbers[i]+ "\n";
      }
    }

      if (numbers.indexOf(guess) !== -1) {
        innerText = "Right!! You won 20 gold";
        gold = gold + 20;
        goldText.innerText = gold;
      }else{
        text.innertext= "Wrong!! you lost 70 health."
        health -= 70;
        healthText.innerText = health;
        if (health <= 0) {
          lose();

      }
    }
  




