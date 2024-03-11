const color_picker = document.querySelector('.pen-color');
const bg_color_picker = document.querySelector('.bg-color');
const colorFill = document.querySelector('.color-fill');
const clear = document.querySelector('.clear');
const rainbow = document.querySelector('.rainbow');
const eraser = document.querySelector('.eraser');
const slider = document.querySelector('.size-slider');
const grid_lines = document.querySelector('.grid-lines');

createGrid(16, 16);

grid_lines.addEventListener('click', () => {
    const blocks = document.querySelectorAll('.grid-item');
    if (grid_lines.value === 'OFF') {
        grid_lines.value = 'ON';
        blocks.forEach((block) => {
            block.id = 'borderless';
        })
        grid_lines.id = 'on-button';
    }
    else if (grid_lines.value === 'ON') {
        grid_lines.value = 'OFF';
        blocks.forEach((block) => {
            block.removeAttribute('id');
        })
        grid_lines.removeAttribute('id');
    }
})

eraser.addEventListener('click', () => {
    const blocks = document.querySelectorAll('.grid-item');
    if (eraser.value === 'OFF') {
        eraser.value = 'ON';
        console.log(eraser.value);
        blocks.forEach((block) => {
            block.addEventListener('mouseover', () => {
                block.style.backgroundColor = bg_color_picker.value;
            })
        })
        eraser.id = 'on-button';
    }
    else if (eraser.value === 'ON') {
        eraser.value = 'OFF';
        console.log(eraser.value);
        blocks.forEach((block) => {
            block.addEventListener('mouseover', () => {
                block.style.backgroundColor = color_picker.value;
            })
        })
        eraser.removeAttribute('id');
    }
})

rainbow.addEventListener('click', () => {
    const blocks = document.querySelectorAll('.grid-item');
    if (rainbow.value === "OFF") {
        rainbow.value = 'ON';
        blocks.forEach((block) => {
            block.addEventListener('mouseover', (e) => {
                let r = Math.floor((Math.random() * 255));
                let g = Math.floor((Math.random() * 255));
                let b = Math.floor((Math.random() * 255));
                e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
            })
        })
        rainbow.id = 'on-button';
    }
    else if (rainbow.value === 'ON') {
        console.log(rainbow.value);
        rainbow.value = 'OFF';
        blocks.forEach((block) => {
            block.addEventListener('mouseover', () => {
                block.style.backgroundColor = color_picker.value;
            });
        })
        rainbow.removeAttribute('id');
        
    }

})

clear.addEventListener('click', (e) => {
    //fills up the entire grid with the bg color - hence "clearing" the canvas
    colour_fill(bg_color_picker.value);
})

colorFill.addEventListener('click', () => {
    const blocks = document.querySelectorAll('.grid-item');
    const fillGrids = () => {
        colour_fill(color_picker.value);
        colorFill.removeAttribute('id');
    };

    if (colorFill.value === "OFF") {
        colorFill.value = "ON";
        colorFill.id = 'on-button';
        //a button associated with filling up the entire grid with the pen color
        blocks.forEach((block) => {
            block.addEventListener('click', fillGrids);
        });

    } else if (colorFill.value === "ON") {
        colorFill.value = "OFF";
        colorFill.removeAttribute('id');
        blocks.forEach((block) => {
            block.removeEventListener('click', fillGrids);
        });
    };
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
            block.classList.add('top-left');
            block_size = 600 / (slider.value);
            block.style.height = `${block_size}px`;
            block.style.width = block.style.height;
            // block.style.padding = '1rem';

            if (j == r - 1) {
                block.classList.add('right');
            }
            if (i == c - 1) {
                block.classList.add('bottom');
            }

            block.addEventListener('mouseover', () => {
                block.style.backgroundColor = color_picker.value;
            });

            row.appendChild(block);
        }
        grid.appendChild(row);
    }
}

function colour_fill(color) {
    const blocks = document.querySelectorAll('.grid-item');
    //this one is for filling up all the blocks with a certain color
    blocks.forEach((block) => {
        block.style.backgroundColor = color;
    })
}

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

