let currentImageIndex = 0;
const images = ['imagem1.jpg', 'imagem2.jpg', 'imagem3.jpg', 'imagem4.jpg', 'imagem5.jpg'];
const totalImages = images.length;

const puzzle = document.getElementById('puzzle');
const piecesContainer = document.getElementById('pieces');
const finalScreen = document.getElementById('final-screen');
const restartBtn = document.getElementById('restart-btn');

// Função para criar o quebra-cabeça a partir da imagem
function loadPuzzle() {
    puzzle.innerHTML = '';
    piecesContainer.innerHTML = '';

    const imgSrc = images[currentImageIndex];

    // Criar peças do quebra-cabeça
    let pieceIndex = 0;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 5; col++) {
            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.style.backgroundImage = `url(${imgSrc})`;
            piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;

            piece.setAttribute('draggable', true);
            piece.addEventListener('dragstart', dragStart);

            piecesContainer.appendChild(piece);
            pieceIndex++;
        }
    }

    // Embaralha as peças
    shufflePieces();
}

function shufflePieces() {
    const piecesArray = Array.from(piecesContainer.children);
    piecesArray.forEach(piece => {
        piecesContainer.appendChild(piece);
    });
}

// Função de arrastar e soltar (drag and drop)
let draggedPiece = null;

function dragStart(e) {
    draggedPiece = e.target;
    setTimeout(() => e.target.classList.add('hidden'), 0);
}

piecesContainer.addEventListener('dragover', e => {
    e.preventDefault();
});

piecesContainer.addEventListener('drop', e => {
    e.preventDefault();
    if (draggedPiece) {
        draggedPiece.classList.remove('hidden');
        piecesContainer.appendChild(draggedPiece);
        draggedPiece = null;
    }
});

// Finaliza o jogo quando todas as imagens forem completadas
function checkCompletion() {
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
