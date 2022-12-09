
// /* Driver program to test above function */

// var l1 = new Point(), r1 = new Point(),
//     l2 = new Point(), r2 = new Point();
// l1.x = 3;
// l1.y = 3;
// r1.x = 4;
// r1.y = 2;
// l2.x = 3.5;
// l2.y = 3.5;
// r2.x = 8.5;
// r2.y = 2.5;

// if (doOverlap(l1, r1, l2, r2)) {
//     console.log("Rectangles Overlap");
// } else {
//     console.log("Rectangles Don't Overlap");
// }


// // Returns true if two rectangles
// // (l1, r1) and (l2, r2) overlap
// function doOverlap(l1, r1, l2, r2) {

//     // if rectangle has area 0, no overlap
//     if (l1.x == r1.x || l1.y == r1.y || r2.x == l2.x || l2.y == r2.y)
//         return false;

//     // If one rectangle is on left side of other
//     if (l1.x > r2.x || l2.x > r1.x) {
//         return false;
//     }

//     // If one rectangle is above other
//     if (r1.y > l2.y || r2.y > l1.y) {
//         return false;
//     }

//     return true;
// }



// Circle collision Test
// let n = 25;
// let w = 1;
// let h = 1;
// let x = 0;
// let y = 0;
// Canvas.context.fillRect(x - (w/2), y - (h/2), w, h);
// // collider 1
// Canvas.context.beginPath();
// Canvas.context.strokeStyle = 'green';
// Canvas.context.moveTo((2 - .5) * n, (0 - .5) * n);
// Canvas.context.lineTo((2 - .5) * n, (1 - .5)* n);
// Canvas.context.lineTo((3 - .5) * n, (1 - .5)* n);
// Canvas.context.lineTo((3 - .5) * n, (0 - .5)* n);
// Canvas.context.lineTo((2 - .5)  * n,( 0 -.5)* n);
// Canvas.context.stroke();

// Canvas.context.beginPath();
// Canvas.context.strokeStyle = 'green';
// Canvas.context.moveTo((0 - .5) * n, (0 - .5) * n);
// Canvas.context.lineTo((0 - .5) * n, (1 - .5)* n);
// Canvas.context.lineTo((1 - .5) * n, (1 - .5)* n);
// Canvas.context.lineTo((1 - .5) * n, (0 - .5)* n);
// Canvas.context.lineTo((0 - .5)  * n,( 0 -.5)* n);
// Canvas.context.stroke();


// let n = 25;
// let w = 1;
// let h = 1;
// let x = 0;
// let y = 0;
// Canvas.context.fillRect(x - (w/2), y - (h/2), w, h);
// // collider 1
// Canvas.context.beginPath();
// Canvas.context.strokeStyle = 'green';
// Canvas.context.moveTo((1.914 - .5) * n, (1.2065- .5) * n);
// Canvas.context.lineTo((1.207 - .5) * n, (1.913 - .5)* n);
// Canvas.context.lineTo((1.915 - .5) * n, (2.620 - .5)* n);
// Canvas.context.lineTo((2.621 - .5) * n, (1.913 - .5)* n);
// Canvas.context.lineTo((1.914 - .5)  * n,( 1.2065 -.5)* n);
// Canvas.context.stroke();