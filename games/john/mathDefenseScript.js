const canvas = document.getElementById("gamecanvas");
const c = canvas.getContext("2d");

// Hard Code dimensions
canvas.width = 400;
canvas.height = 400;
let tilesize = 20;
let currency = 100;
let distOffset = 50;
let currentWave = 0;
let currentSpeed = 0.9

//Fill out with black
c.fillRect(0,0,canvas.width,canvas.height);


// Placement tiles (for defense structures)
const placementTilesData2D = []

for (let i = 0; i < placementTilesData.length; i+=tilesize) {
    placementTilesData2D.push(placementTilesData.slice(i, i + tilesize))
}

const placementTiles = []

placementTilesData2D.forEach((row, y_index) => {
    row.forEach((symbol, x_index) => {
        // hard coded symbol of 5 in placementTilesData.js
        if (symbol === 5) {
            //add building placement tile here
            placementTiles.push(new PlacementTile({
                position: {
                    x: x_index * tilesize,
                    y: y_index * tilesize
                }
            }))
        }
    })
})


//Load background
const image = new Image();
image.onload = () => {
    animate();
}
image.src = 'image/towerDefense.png'


//Create enemies
const enemies = [];

function spawnEnemies(spawnCount) {
    currentWave += 1;
    currentSpeed += 0.1;
    document.querySelector('#WaveNum').innerHTML = "Wave:" + currentWave;
    for (let i = 1; i < spawnCount + 1; i++) {
        const xOffset = i*distOffset;
        enemies.push(
            new Enemy({
            position: {x: waypoints[0].x - xOffset, y: waypoints[0].y}
            },
            speed = currentSpeed
        ));
    }
}

// monitor for constructed buildings
const buildings = [];
let activeTile = undefined;
let enemyCount = 3;
let hearts = 10;
spawnEnemies(enemyCount);


//Animation 
function animate() {
    //recursively call animate()
    const animationID = requestAnimationFrame(animate);

    //draw background
    c.drawImage(image,0,0);

    //draw enemies

    for (let enemy_i = enemies.length - 1; enemy_i >= 0; enemy_i--) {
        const enemy = enemies[enemy_i]
        enemy.update()

        if (enemy.position.y + enemy.height + 1 >= canvas.height) {
            hearts -= 1;
            enemies.splice(enemy_i, 1);
            document.querySelector('#hearts').innerHTML = hearts;

            if (hearts === 0) {
                console.log('Game Over!');
                cancelAnimationFrame(animationID);
                // show game over by grabbing HTML id
                document.querySelector('#gameOver').style.display = 'flex'
            }
        }
    }

    // tracking total amount of enemies
    if (enemies.length === 0) {
        enemyCount += 1;
        spawnEnemies(enemyCount);

        // decreases the distance enemies are appart
        if (distOffset > 20) {
            distOffset -= 5;
            // console.log(distOffset)
        }
    }

    //draw placement tiles
    placementTiles.forEach(tile => {
        tile.update(mouse)
    })

    //buildings
    buildings.forEach(building => {
        building.update()
        building.target = null
        const validEnemies = enemies.filter((enemy) => {
            const xDifference = enemy.center.x - building.center.x;
            const yDifference = enemy.center.y - building.center.y;
            const target_distance = Math.hypot(xDifference, yDifference);
            return target_distance < enemy.radius + building.range;
        })
        building.target = validEnemies[0];
        
        for (let i = building.projectiles.length - 1; i >=0; i--) {
            const projectile = building.projectiles[i];

            projectile.update();
            
            const xDifference = projectile.enemy.center.x - projectile.position.x;
            const yDifference = projectile.enemy.center.y - projectile.position.y;
            const distance = Math.hypot(xDifference, yDifference);

            // when projectile hits enemy
            if (distance < projectile.enemy.radius + projectile.radius) {
                // Monitors enemies health and removes when zero
                projectile.enemy.health -= 20;
                if (projectile.enemy.health <= 0) {
                    const enemyIndex = enemies.findIndex((enemy) => {
                        return projectile.enemy === enemy;
                    })
                    
                    if (enemyIndex > -1) {
                        enemies.splice(enemyIndex, 1);
                        currency += 2;
                        document.querySelector('#currency').innerHTML = currency;
                    }
                }
                building.projectiles.splice(i, 1);
            }
        }
    })
}

// Mouse movement
const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', (event) => {
    // // Determines if a building exists on the tile
    // if (activeTile.isOccupied) {
    //     console.log('Building here!');
    // }

    // If no building, and is enough currency
    if (activeTile && !activeTile.isOccupied && currency - 50 >= 0) {
        currency -= 50;
        document.querySelector('#currency').innerHTML = currency;
        buildings.push(new Building({
            position: {
                x: activeTile.position.x,
                y: activeTile.position.y
            }
        })
        )
        activeTile.isOccupied = true
    }
})

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    // console.log(event)

    activeTile = null
    for (let i = 0; i < placementTiles.length; i++) {
        const tile = placementTiles[i];
        if (mouse.x > (tile.position.x + 8) && mouse.x < (tile.position.x + tile.size + 8) && 
            mouse.y > (tile.position.y + 8) && mouse.y < (tile.position.y + tile.size + 8)
            ) 
            {
                activeTile = tile;
                break;
            }
    }
})
