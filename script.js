createGrid(16, 16);
const color_picker = document.querySelector('.pen-color');
const bg_color_picker = document.querySelector('.bg-color');
const blocks = document.querySelectorAll('.grid-item');
const colorFill = document.querySelector('.color-fill');

color_fill.addEventListener('click', () => {
    blocks.forEach((block) => {
        color_fill()
    })
})

function createGrid(r, c) {
    const grid = document.querySelector('.grid');
    grid.style.display = 'flex';
    grid.style['flex-direction'] = 'column';
    
    for (let i = 0; i < r; i++){
        const row = document.createElement('div');
        row.className = 'row';
        row.style.display = 'flex';
        row.style.maxWidth = '600px';
        for (let j = 0; j < c; j++){
            // each grid-item is called a block, a clever way to get rid
            // of double stacked borders is to build the square with each blocks'
            // top and left borders, and then decipher the borders left for the rest
            // by adding the nescessary classes
            const block = document.createElement('div');
            block.setAttribute('class', 'grid-item');

            block.style.backgroundColor = 'white';
            block.style.padding = '1rem';
            block.classList.add('top-left');
            block.classList.add('block-shrink');

            if (j == r - 1) {
                block.classList.add('right');
            }
            if (i == c - 1) {
                block.classList.add('bottom');
            }

            block.addEventListener('mouseover', (event) => {
                sketch(event, color_picker.value);
            });

            row.appendChild(block);
        }
        grid.appendChild(row);
    }
}

function sketch(event, color) {
    // seperating out functions is helping me modularize and actually focus on the smallest steps
    // this one focuses on the core functionality of etching
    event.target.style.backgroundColor = color;
}

function colour_fill(color) {
    //this one is for filling up all the blocks with a certain color
    blocks.forEach((block) => {
        block.style.backgroundColor = color;
    })
}

const slider = document.querySelector('.size-slider');
const grid_size = document.querySelector('.grid-size');
grid_size.textContent = `${slider.value} x ${slider.value}`;

slider.addEventListener('input', (e) => {
    grid_size.textContent = `${e.target.value} x ${e.target.value}`;
    clearGrids();
    createGrid(e.target.value, e.target.value);
});

function clearGrids() {
    const blocks = document.querySelectorAll('.grid-item');
    blocks.forEach((block) => {
        block.remove();
    })
}


