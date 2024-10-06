const images = ['images/imagem1.jpg', 'images/imagem2.jpg', 'images/imagem3.jpg', 'images/imagem4.jpg', 'images/imagem5.jpg'];
const puzzleContainer = document.getElementById('puzzle-container');
const correctCountElement = document.getElementById('correct-count'); // Seleciona o elemento do contador

let selectedPiece = null; // A peça atualmente selecionada
let piecesOrder = []; // Armazena a ordem correta das peças

// Função para criar as peças do quebra-cabeça
function createPuzzle(imageSrc) {
    const pieces = [];
    const size = 4; // 4x4 grid
    puzzleContainer.innerHTML = ''; // Limpa o contêiner

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const piece = document.createElement('div');
            piece.className = 'piece';
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundPosition = `-${j * 75}px -${i * 100}px`;
            piece.dataset.correctIndex = pieces.length; // Índice correto da peça
            piece.dataset.currentIndex = pieces.length; // Índice atual da peça

            // Adiciona evento de clique
            piece.addEventListener('click', () => {
                if (!selectedPiece) {
                    selectedPiece = piece; // Seleciona a peça
                    piece.style.border = '2px solid red'; // Destaque a peça selecionada
                } else {
                    // Troca as peças
                    swapPieces(selectedPiece, piece);
                    selectedPiece.style.border = ''; // Remove o destaque
                    selectedPiece = null; // Reseta a seleção
                    updateCorrectCount(); // Atualiza o contador após cada troca
                }
            });

            pieces.push(piece);
        }
    }

    // Embaralha as peças
    pieces.sort(() => Math.random() - 0.5);
    pieces.forEach((piece, index) => {
        piece.dataset.currentIndex = index; // Atualiza o índice atual após embaralhar
        puzzleContainer.appendChild(piece);
    });

    updateCorrectCount(); // Conta peças corretas ao iniciar
}

// Função para trocar as peças
function swapPieces(piece1, piece2) {
    const tempBackground = piece1.style.backgroundImage;
    const tempPosition = piece1.style.backgroundPosition;
    const tempIndex = piece1.dataset.currentIndex;

    piece1.style.backgroundImage = piece2.style.backgroundImage;
    piece1.style.backgroundPosition = piece2.style.backgroundPosition;
    piece1.dataset.currentIndex = piece2.dataset.currentIndex;

    piece2.style.backgroundImage = tempBackground;
    piece2.style.backgroundPosition = tempPosition;
    piece2.dataset.currentIndex = tempIndex;
}

// Função para contar quantas peças estão no lugar correto
function updateCorrectCount() {
    let correctCount = 0;

    document.querySelectorAll('.piece').forEach(piece => {
        if (piece.dataset.correctIndex === piece.dataset.currentIndex) {
            correctCount++; // Incrementa se a peça estiver no lugar correto
        }
    });

    correctCountElement.textContent = `Peças corretas: ${correctCount}`; // Atualiza o texto
}

// Event listener para o botão de reinício
document.getElementById('reset').addEventListener('click', () => {
    createPuzzle(images[0]); // Altere para selecionar outra imagem, se desejado
});

// Cria o quebra-cabeça inicial
createPuzzle(images[0]);
