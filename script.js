const images = ['images/imagem1.jpg', 'images/imagem2.jpg', 'images/imagem3.jpg', 'images/imagem4.jpg', 'images/imagem5.jpg'];
const puzzleContainer = document.getElementById('puzzle-container');

let selectedPieces = []; // Array para armazenar as peças selecionadas

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

            // Adiciona evento de clique
            piece.addEventListener('click', () => {
                if (selectedPieces.length < 2) {
                    piece.style.border = '2px solid red'; // Destaque a peça selecionada
                    selectedPieces.push(piece); // Adiciona a peça ao array

                    if (selectedPieces.length === 2) {
                        swapPieces(selectedPieces[0], selectedPieces[1]);
                        selectedPieces.forEach(p => p.style.border = ''); // Remove o destaque
                        selectedPieces = []; // Limpa a seleção
                    }
                }
            });

            pieces.push(piece);
        }
    }

    // Embaralha as peças
    pieces.sort(() => Math.random() - 0.5);

    pieces.forEach(piece => puzzleContainer.appendChild(piece));
}

// Função para trocar as peças
function swapPieces(piece1, piece2) {
    const tempBackground = piece1.style.backgroundImage;
    const tempPosition = piece1.style.backgroundPosition;

    piece1.style.backgroundImage = piece2.style.backgroundImage;
    piece1.style.backgroundPosition = piece2.style.backgroundPosition;

    piece2.style.backgroundImage = tempBackground;
    piece2.style.backgroundPosition = tempPosition;
}

// Event listener para o botão de reinício
document.getElementById('reset').addEventListener('click', () => {
    puzzleContainer.innerHTML = '';
    createPuzzle(images[0]); // Altere para selecionar outra imagem, se desejado
});

// Cria o quebra-cabeça inicial
createPuzzle(images[0]);
