var SNAKE = SNAKE || {};

SNAKE.addEventListener = (function(){
	if (window.addEventListener) {
		return function(obj, event, funct, evtCapturing){
			obj.addEventListener(event, funct, evtCapturing);
		};
	} else if(window.attachEvent){
		return function(obj, event, funct){
			obj.attachEvent("on" + event, funct)
		}
	}
})();

SNAKE.removeEventListener = (function(){
	if(window.removeEventListener){
		return function(obj, event, funct, evtCapturing){
			obj.removeEventListener(event, funct, evtCapturing);
		};
	} else if(window.detachEvent){
		return function(obj, event, funct){
			obj.detachEvent("on" + event, funct)
		}
	}
})();

SNAKE.Snake = SNAKE.Snake || (function(){

	var instanceNumber = 0;
	var blockPool = [];

	var SnakeBlock = function(){
		this.elm = null;
		this.elmStyle = null;
		this.row = -1;
		this.col = -1;
		this.xPos = -1000;
		this.yPos = -1000;
		this.next = null;
		this.prev = null;
	};

function getNextHighestZIndex(myObj) {
	var highestIndex = 0,
		currentIndex = 0,
		ii,
	for(ii in myObj){
		if(myObj[ii].elm.cuurentStyle){
			currentIndex = parseFloat(myObj[ii].elm.style["z-ined"],10);
		}else if(window.getComputedStyle){
			currentIndex = parseFloat(document.defaultView.getComputedStyle(myObj[ii].elm,null).getPropertyValue("z-index"),10);
		}
		if(!isNaN(currentIndex) && currentIndex > highestIndex){
			highestIndex = currentIndex;
		}
	}
	return (highestIndex+1);
}

return function(config){
	if(!config||!config.playingBoard){
		return;
	}

	//private variables
	var me = this,
		playingBoard = config.playingBoard,
		myId = instanceNumber++,
		growthInc = 5,
		moveQueue = [], 
		currentDirection = 1,
		columnShift = [0,1,0,-1],
		rowShift = [-1,0,1,0],
		xPosShift = [],
		yPosShift = [],
		snakeSpeed = 75,
		isDead = false;
	//public variables
	me.snakeBody = {};
	me.snakeBody["b0"]	= new Snake();
	me.snakeBody["b0"].row = config.startRow || 1;
	me.snakeBody["b0"].col = config.startCol || 1;
	me.snakeBody["b0"].xPos = me.snakeBody["b0"].row * playingBoard.getBlockWidth();
	me.snakeBody["b0"].yPos = me.snakeBody["b0"].col * playingBoard.getBlockHeight();
	me.snakeBody["b0"].elm = createSnakeElement();
	me.snakeBody["b0"].elmStyle = me.snakeBody["b0"].elm.style;
	playingBoard.getBoardContainer().appendChild( me.snakeBody["b0"].elm);
	me.snakeBody["b0"].elm.style.left = me.snakeBody["b0"].xPos + "px";
	me.snakeBody["b0"].elm.style.top = me.snakeBody["b0"].yPos + "px";
	me.snakeBody["b0"].next = me.snakeBody["b0"];
	me.snakeBody["b0"].prev = me.snakeBody["b0"];

	me.snakeLength = 1;
	me.snakeHead = me.snakeBody["b0"];
	me.snakeTale = me.snakeBody["b0"];
	me.snakeHead.elm.className = me.snakeHead.elm.className.replace(/\bsnake-snakebody-dead\b/,'');
	me.snakeHead.elm.className += " snake-snakebody-alive";

	//private methods

	function createBlocks(num){
		var tempBlock;
		var tempNode = createSnakeElement();

		for(var ii = 1; ii < num; ii++){
			tempBlock = new SnakeBlock();
			tempBlock.elm = tempNode.cloneNode(true);
			tempBlock.elmStyle = tempBlock.elm.stlye;
			playingBoard.getBoardContainer().appendChild(tempBlock.elm); 
			blockPool[blockPool.length] = tempBlock;
		}

		tempBlock = new SnakeBlock();
		tempBlock.elm = tempNode;
		playingBoard.getBoardContainer().appendChild(tempBlock.elm);
		blockPool[blockPool.length] = tempBlock;
	}

//public methods	
}	
})
