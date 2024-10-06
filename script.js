const images = ['images/imagem1.jpg', 'images/imagem2.jpg', 'images/imagem3.jpg', 'images/imagem4.jpg', 'images/imagem5.jpg'];
const puzzleContainer = document.getElementById('puzzle-container');

// Função para criar as peças do quebra-cabeça
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

// Event listener para o botão de reinício
document.getElementById('reset').addEventListener('click', () => {
    puzzleContainer.innerHTML = '';
    createPuzzle(images[0]); // Altere para selecionar outra imagem, se desejado
});

// Cria o quebra-cabeça inicial
createPuzzle(images[0]);
