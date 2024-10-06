const images = ['imagem1.jpg', 'imagem2.jpg', 'imagem3.jpg', 'imagem4.jpg', 'imagem5.jpg'];
const puzzleContainer = document.getElementById('puzzle-container');

function createPuzzle(imageSrc) {
    const pieces = [];
    const size = 4; // 4x4 grid

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const piece = document.createElement('div');
            piece.className = 'piece';
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundPosition = `-${j * 100}px -${i * 100}px`;
            pieces.push(piece);
        }
    }

    // Embaralha as peças
    pieces.sort(() => Math.random() - 0.5);

    pieces.forEach(piece => puzzleContainer.appendChild(piece));
}

document.getElementById('reset').addEventListener('click', () => {
    puzzleContainer.innerHTML = '';
    createPuzzle(images[0]); // Altere para selecionar outra imagem
});

// Cria o quebra-cabeça inicial
createPuzzle(images[0]);
