const output = document.getElementById("output");
function writeDisplay(input) {
  let text = "";
  for (let i=0; i<display_size; i++) {
    let row = "";
    for (let t=0; t<display_size; t++) {
      const val = display[i][t];
      switch (Math.round(val)) {
        case 0:
          row = row + " ";
          break;
        case 1:
          row = row + "*";
          display[i][t] *= 0.8;
          break;
        case 2:
          row = row + "$";
          display[i][t] *= 0.7;
          break;
        case 3:
          row = row + "@";
          display[i][t] *= 0.5;
          break;
        default:
          row = row + "#";
          display[i][t] = 0;
          break;
      }
    };
    text = text + row + "\n";
  }
  output.textContent = text;
}

const display_size = 100;
let display = new Array(display_size);
for (let i=0; i<display_size; i++) {
  let row = new Array(display_size);
  for (let t=0; t < display_size; t++) {
    row[t] = Math.random() * 0.5;
  }
  display[i] = row;
}
let displayCash = new Array(display_size).fill(Array(display_size));

function update_display() {
  for (let i=0; i<display_size; i++){
    for (let t=0; t<display_size; t++) {
      let val = 0;
      if (display[i-1] != undefined) {
        val += display[i-1][t];
      }
      if (display[i+1] != undefined) {
        val += display[i+1][t];
      }
      if(display[i][t-1] != undefined) {
        val += display[i][t-1]
      }
      if(display[i][t+1] != undefined) {
        val += display[i][t+1];
      }
      displayCash[i][t] = val;
    }
  };
  for (let i=0; i<display_size; i++) {
    for (let t=0; t<display_size; t++) {
      display[i][t] += displayCash[i][t];
    }
  }
}

function update() {
  update_display();
  writeDisplay(display);
}

setInterval(update,200);
