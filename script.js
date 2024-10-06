const images = ['images/imagem1.jpg', 'images/imagem2.jpg', 'images/imagem3.jpg', 'images/imagem4.jpg', 'images/imagem5.jpg'];
const puzzleContainer = document.getElementById('puzzle-container');

let draggedPiece = null;

// Função para criar as peças do quebra-cabeça
function createPuzzle(imageSrc) {
    const pieces = [];
    const size = 4; // 4x4 grid

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const piece = document.createElement('div');
            piece.className = 'piece';
            piece.draggable = true; // Permite que a peça seja arrastável
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundPosition = `-${j * 100}px -${i * 100}px`;
            
            // Adiciona eventos de arrastar
            piece.addEventListener('dragstart', () => {
                draggedPiece = piece; // Armazena a peça que está sendo arrastada
            });

            piece.addEventListener('dragover', (e) => {
                e.preventDefault(); // Permite que a peça seja solta em outra
            });

            piece.addEventListener('drop', () => {
                if (draggedPiece) {
                    // Troca as peças
                    const tempBackground = piece.style.backgroundImage;
                    const tempPosition = piece.style.backgroundPosition;

                    piece.style.backgroundImage = draggedPiece.style.backgroundImage;
                    piece.style.backgroundPosition = draggedPiece.style.backgroundPosition;

                    draggedPiece.style.backgroundImage = tempBackground;
                    draggedPiece.style.backgroundPosition = tempPosition;

                    draggedPiece = null; // Limpa a peça arrastada
                }
            });

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
