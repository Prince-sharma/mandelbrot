let maxIter = 100;
let devBound = 2;

function setup() {
  createCanvas(800, 400);
  pixelDensity(1); // Set pixel density to 1 for consistent behavior across devices
}

function draw() {
  loadPixels(); // Load the pixel data for the canvas
  setPixelsMB();
  setPixelsJS();// Call a function to set all pixels to red
  updatePixels(); // Update the canvas with the modified pixel data
}

function setPixelsMB() {
  // let constA = -0.8; //map(mouseX, 0, width, -1, 1);
  // let constB = 0.156; //map(mouseY, 0, height, -1, 1);
  for (let x = 0; x < width/2; x++) {
    for (let y = 0; y < height; y++) {
      let aInit = map(x, 0, width/2, -1.5, 1.5);
      let bInit = map(y, 0, height, -2, 2);
      let ac = aInit;
      let bc = bInit;

      let n = 0;

      while (n < maxIter) {
        let aNew = aInit * aInit - bInit * bInit;
        let bNew = 2 * aInit * bInit;

        aInit = aNew + ac ;
        bInit = bNew + bc ;

        if (aNew * aNew + bNew * bNew > devBound * devBound) {
          break;
        }
        n++;
      }

      let bright = map(n, 0, maxIter, 0, 255);

      // Calculate the pixel index based on the current x and y coordinates
      let index = (x + y * width) * 4; // Each pixel has 4 values (RGBA)

      // Set the color of the pixel to red (full red, no green or blue)
      pixels[index] = bright; // Red (R)
      pixels[index + 1] = bright; // Green (G)
      pixels[index + 2] = bright; // Blue (B)
      pixels[index + 3] = 255; // Alpha (A) - 255 means fully opaque
    }
  }
}

function setPixelsJS() {
  let constA = map(mouseX, 0, width/2, -1, 1);
  let constB = map(mouseY, 0, height, -1, 1);
  for (let x = width/2; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let aInit = map(x, width/2, width, -1.5, 1.5);
      let bInit = map(y, 0, height, -2, 2);
      // let ac = aInit;
      // let bc = bInit;

      let n = 0;

      while (n < maxIter) {
        let aNew = aInit * aInit - bInit * bInit;
        let bNew = 2 * aInit * bInit;

        aInit = aNew + constA;
        bInit = bNew + constB;

        if (aNew * aNew + bNew * bNew > devBound * devBound) {
          break;
        }
        n++;
      }

      let bright = map(n, 0, maxIter, 0, 255);

      // Calculate the pixel index based on the current x and y coordinates
      let index = (x + y * width) * 4; // Each pixel has 4 values (RGBA)

      // Set the color of the pixel to red (full red, no green or blue)
      pixels[index] = bright; // Red (R)
      pixels[index + 1] = bright; // Green (G)
      pixels[index + 2] = bright; // Blue (B)
      pixels[index + 3] = 255; // Alpha (A) - 255 means fully opaque
    }
  }
}
