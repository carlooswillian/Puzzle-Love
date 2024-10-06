let currentImageIndex = 0;
const images = ['imagem1.jpg', 'imagem2.jpg', 'imagem3.jpg', 'imagem4.jpg', 'imagem5.jpg'];
const totalImages = images.length;

const puzzle = document.getElementById('puzzle');
const piecesContainer = document.getElementById('pieces');
const finalScreen = document.getElementById('final-screen');
const restartBtn = document.getElementById('restart-btn');

function loadPuzzle() {
    // Limpa o puzzle e peças anteriores
    puzzle.innerHTML = '';
    piecesContainer.innerHTML = '';

    // Carrega a imagem atual
    const image = images[currentImageIndex];

    // Cria as peças e embaralha
    const pieces = [];
    for (let i = 0; i < 20; i++) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        pieces.push(piece);
        piecesContainer.appendChild(piece);
    }

    // Adiciona a lógica de arrastar e soltar aqui

    if (currentImageIndex >= totalImages) {
        finalScreen.classList.remove('hidden');
    }
}

restartBtn.addEventListener('click', () => {
    currentImageIndex = 0;
    finalScreen.classList.add('hidden');
    loadPuzzle();
});

loadPuzzle();
