const colors = [
    "#FF4D4D",
    "#4D79FF",
    "#FFD24D",
    "#4DFF88"
];

let tubes = [];
let selectedTube = null;

function initializeGame() {

    tubes = [
        ["#FF4D4D", "#4D79FF", "#FFD24D", "#FF4D4D"],
        ["#4D79FF", "#FFD24D", "#4DFF88", "#4D79FF"],
        ["#FFD24D", "#FF4D4D", "#4DFF88", "#FFD24D"],
        ["#4DFF88", "#4D79FF", "#FF4D4D", "#4DFF88"],
        [],
        []
    ];

    renderGame();
}

function renderGame() {

    const board = document.getElementById("game-board");
    board.innerHTML = "";

    tubes.forEach((tube, index) => {

        const tubeDiv = document.createElement("div");
        tubeDiv.classList.add("tube");

        if (selectedTube === index) {
            tubeDiv.classList.add("selected");
        }

        tube.forEach(color => {
            const layer = document.createElement("div");
            layer.classList.add("layer");
            layer.style.backgroundColor = color;
            tubeDiv.appendChild(layer);
        });

        tubeDiv.addEventListener("click", () => handleTubeClick(index));

        board.appendChild(tubeDiv);
    });
}

function handleTubeClick(index) {

    if (selectedTube === null) {
        selectedTube = index;
    } else {

        moveWater(selectedTube, index);

        selectedTube = null;
    }

    renderGame();
    checkWin();
}

function moveWater(from, to) {

    if (from === to) return;

    const source = tubes[from];
    const target = tubes[to];

    if (source.length === 0) return;

    if (target.length === 4) return;

    const color = source[source.length - 1];

    if (
        target.length === 0 ||
        target[target.length - 1] === color
    ) {
        source.pop();
        target.push(color);
    }
}

function checkWin() {

    let completed = true;

    for (let tube of tubes) {

        if (tube.length === 0) continue;

        if (tube.length !== 4) {
            completed = false;
            break;
        }

        const firstColor = tube[0];

        if (!tube.every(c => c === firstColor)) {
            completed = false;
            break;
        }
    }

    if (completed) {
        setTimeout(() => {
            alert("🎉 You Win!");
        }, 100);
    }
}

document
    .getElementById("restartBtn")
    .addEventListener("click", initializeGame);

initializeGame();