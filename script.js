function createGrid(r, c) {
    const grid = document.querySelector('.grid');
    grid.style.display = 'flex';
    grid.style['flex-direction'] = 'column';
    
    for (let i = 0; i < r; i++){
        const row = document.createElement('div');
        row.style.display = 'flex';
        for (let j = 0; j < c; j++){
            const block = document.createElement('div');
            block.setAttribute('class', 'grid-item');

            block.style.backgroundColor = 'white';
            block.style.padding = '1rem';
            block.classList.add('top-left');

            if (j == r - 1) {
                block.classList.add('right');
            }
            if (i == c - 1) {
                block.classList.add('bottom');
            }

            block.addEventListener('mouseover', sketch);

            row.appendChild(block);
        }
        grid.appendChild(row);
    }
}

function sketch() {
    this.style.backgroundColor = 'black';
}

createGrid(16, 16);


