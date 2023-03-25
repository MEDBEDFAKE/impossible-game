let isPlaying = true;
let time = 0;

let start = 10;
let end = 310;

let gameWon = false;

let player, enemies, goal;

function setup() {
	new Canvas(400, 400, 'pixelated');

	player = new Sprite(160, 50, 16, 16);

	goal = new Sprite(10, 380, 16, 16);
	goal.color = '#fff';

	player.overlaps(goal, () => {
		gameWon = true;
	});

	enemies = new Group();
	enemies.overlaps(enemies);
	goal.overlaps(enemies);

	for (let i = 0; i < 20; i++) {
		if (i % 2 == 0) {
			new enemies.Sprite(start, 80 + i * 30, 10);
		} else {
			new enemies.Sprite(end, 80 + i * 30, 10);
		}
	}

	player.overlaps(enemies, gameOver);

	moveEnemies();
	timer();
}

async function moveEnemies() {
	for (let i = 0; i < 20; i++) {
		let en = enemies[i];
		if (en.x == start) {
			en.moveTo(end, en.y, 5);
		}
		if (en.x == end) {
			en.moveTo(start, en.y, 5);
		}
	}
	await delay(1000);
	moveEnemies();
}

async function timer() {
	await delay(10);
	time += 0.01;
	timer();
}

function draw() {
	background(0);
	if (gameWon) {
		fill('white');
		text('You win!', 100, 22);
	}
	if (isPlaying) {
		fill('white');
		text(time.toFixed(2), 0, 22);

		player.moveTowards(mouse);

		//if (player.x < mouseX + 0.2 && player.x > mouseX - 0.2 && player.y < mouseY + 0.2 && player.y > mouseY - 0.2) {
		//	gameOver();
		//}
	}
}

async function gameOver() {
	isPlaying = false;
	player.x = 160;
	player.y = 50;
	player.vel.x = 0;
	player.vel.y = 0;
	await delay(3000);
	isPlaying = true;
}
