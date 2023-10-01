let maxIter = 100;
let devBound = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // Set pixel density to 1 for consistent behavior across devices
  loadPixels(); // Load the pixel data for the canvas
  setPixels(); // Call a function to set all pixels to red
  updatePixels(); // Update the canvas with the modified pixel data
}

function setPixels() {
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let aInit = map(x, 0, width, -2.5,1.5);
      let bInit = map(y, 0, height, -2, 2);
      let ac = aInit;
      let bc = bInit;
      
      let n = 0;
      
      while(n < maxIter){
        let aNew = aInit*aInit - bInit*bInit;
        let bNew = 2 * aInit * bInit;
        
        aInit = aNew + ac ;
        bInit = bNew + bc;
        
        if(aNew*aNew + bNew*bNew > devBound*devBound){
          break;
        }
        n++;
      }
      
      let bright = map(n, 0, maxIter, 0, 255)%255;
      
      // Calculate the pixel index based on the current x and y coordinates
      let index = (x + y * width) * 4; // Each pixel has 4 values (RGBA)

      // Set the color of the pixel to red (full red, no green or blue)
      pixels[index] = bright*random(1);     // Red (R)
      pixels[index + 1] = bright*random(1);   // Green (G)
      pixels[index + 2] = bright*random(2);   // Blue (B)
      pixels[index + 3] = 255; // Alpha (A) - 255 means fully opaque
    }
  }
}
