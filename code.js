
let ship = document.querySelector('.ship'),
    space = document.querySelector('.space');

let spaceShip = {
    'ship': ship,
    
    position: {
        x: parseFloat(ship.style.left),
        y: parseFloat(ship.style.top)
    },
    sizes: {
        width: parseFloat(ship.style.width),
        height: parseFloat(ship.style.height)
    },
    speed: (800 / parseFloat(ship.style.width) > 1 ? 800 / parseFloat(ship.style.width) : 1) >= 8 ? (800 / (parseFloat(ship.style.width) >  1 ? 800 / parseFloat(ship.style.width) : 1)) : 8,
    move: function(forwardVect){
        if((this.position.x > ortogSystem.axis.fieldMarginWidth || ortogSystem.axis.x * forwardVect * this.speed > 0) && (this.position.x < window.innerWidth - ortogSystem.axis.fieldMarginWidth - this.sizes.width  || ortogSystem.axis.x * forwardVect * this.speed < 0)){
        this.position.x += ortogSystem.axis.x * forwardVect * this.speed;
        this.ship.style.left = this.position.x + 'px';
        }
        if((this.position.y > ortogSystem.axis.fieldMarginWidth || ortogSystem.axis.y * forwardVect * this.speed > 0) && (this.position.y < innerHeight - ortogSystem.axis.fieldMarginWidth - this.sizes.height || ortogSystem.axis.y * forwardVect * this.speed < 0)){
            this.position.y += ortogSystem.axis.y * forwardVect * this.speed;
            this.ship.style.top = this.position.y + 'px';
        }
        let pos = document.body.style.backgroundPosition.split(' ');
        let str = (parseFloat(pos[0]) - ortogSystem.axis.x * forwardVect * this.speed * 2 + 0.2) + 'px ' + (parseFloat(pos[1])- ortogSystem.axis.y * forwardVect * this.speed * 2 - 0.2) + 'px, ' + (parseFloat(pos[2]) - ortogSystem.axis.x * forwardVect / 5) + 'px ' + (parseFloat(pos[3])- ortogSystem.axis.y * forwardVect / 5)+ 'px';
        document.body.style.backgroundPosition = str;
    }  
};

let ortogSystem = {
    axis: 
        { 
            y: 0, 
            x: 1,
            engle: 0, 
            engleStep: (400 / spaceShip.sizes.width > 0.1 ? 400 / spaceShip.sizes.width : 0.1) <= 5 ? (400 / spaceShip.sizes.width > 0.1 ? 400 / spaceShip.sizes.width : 0.1) : 5,
            rightVect: 0, 
            forwardVect: 0,
            fieldMarginWidth: 50
        },
    rotate: function(eng){
    spaceShip.ship.style.transform = "rotate(" + (eng) + "deg)";
    eng *= Math.PI / 180.0;
    this.axis.y = Math.sin(eng);
    this.axis.x = Math.cos(eng);
    },
    setAxis: function(){
        if (buttonStack[0] == 0 && buttonStack[2] == 0) this.axis.rightVect = 0;
        if (buttonStack[1] == 0 && buttonStack[3] == 0) this.axis.forwardVect = 0;
        if(buttonStack[0] && this.axis.rightVect > -1){
            this.axis.rightVect--;
        }
        if(buttonStack[2] && this.axis.rightVect < 1){
            this.axis.rightVect++;
        }
        if(buttonStack[1] && this.axis.forwardVect < 1){
            this.axis.forwardVect++;
        }
        if(buttonStack[3] && this.axis.forwardVect > -1){
            this.axis.forwardVect--;
        }
        if(this.axis.rightVect){
            this.axis.engle = (this.axis.engle + this.axis.engleStep * this.axis.rightVect ) % 360; 
            this.rotate(this.axis.engle);
        }
        if(this.axis.forwardVect){
            spaceShip.move(this.axis.forwardVect);
        }
    },
};

let buttonStack = [0,0,0,0];

function rotate(eng){
    i = Math.sin(eng);
    j = Math.cos(eng);
}
window.onkeydown = (event) => {
    if(event.keyCode >= 37 && event.keyCode <= 40){
        buttonStack[event.keyCode - 37] = 1;
    }
};

window.onkeyup = (event) => {
    if(event.keyCode >= 37 && event.keyCode <= 40){
        buttonStack[event.keyCode - 37] = 0;
    }
};

let frameTime = 10;

function holder(){
    setInterval(() =>{
        let pos = document.body.style.backgroundPosition.split(' ');
        let str = (parseFloat(pos[0]) - 0.2) + 'px ' + (parseFloat(pos[1]) + 0.2) + 'px, ' + pos[2] + ' ' + pos[3];
        document.body.style.backgroundPosition = str;
        ortogSystem.setAxis();
    }, frameTime);
}

holder();

/*  38
  37  39
    40*/
