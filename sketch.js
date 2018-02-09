//////gui parameters/////
var unit = 50; //size of letter
var colorPalette = 0; //indexes color palette in col array
var gui; //creates gui
var message = 'abcdefghijklmnopqrstuvwxyz'; //default message
var leading = 10; //spacing between lines
var bg = '#feffe4'; //default bg color
var tracking = 20; //space between letters
var Top = 100; 
var bottom = 100;
// when adjusting code, be careful with ranges of these in sliders if padding is too big it'll overlap and not draw
// make paddingLeft and right between 0 and some fraction of windowWidth (maybe Math.floor(windowwidth / 5))
var maxWidth = 1200; //max width of space that can be drawn on
var Left = 100;
var Right = 20;
var fontStyle = 0.5
var curCol;

/////letters variables/////
var col = [['#ef4131', '#ffe600', '#2e3196', '#ec008c'],
            ['#2e3ed5', '#c6f3f1', '#c620ff', '#ffe000'],
            ['#30d6ad', '#ff6eed', '#0d33d3', '#e6db14'],
            ['#10cc89', '#0f34b8', '#d033d5', '#ef4216'],
            ['#564eed', '#fbc773', '#f26950', '#0e2eaf'],
            ['#fbbb1a', '#ffcec4', '#a027af', '#1c27bc'],
            ['#5ebd74', '#e87543', '#40238a', '#ffcf4a'],
            ['#dbf035', '#FF3E78', '#0031CB', '#15EACF'],
            ['#ffe225', '#596fff', '#3625f5', '#fc83c0'],
            ['#28bf94', '#ffffff', '#1d49c5', '#fccaf0'],
            ['#f5662a', '#29328e', '#a2109b', '#f0322b']];
		   //color palette array
var fontA = {'a': a_a, 'b': a_b, 'c': a_c, 'd': a_d, 'e': a_e, 'f': a_f,
            'g': a_g, 'h': a_h, 'i': a_i, 'j': a_j, 'k': a_k, 'l': a_l, 
            'm': a_m, 'n': a_n, 'o': a_o, 'p': a_p, 'q': a_q, 'r': a_r,
            's': a_s, 't': a_t, 'u': a_u, 'v': a_v, 'w': a_w, 'x': a_x,
            'y': a_y, 'z': a_z
            }; //storing all functions of the haewan's font into an object
var fontB = {'a': b_a, 'b': b_b, 'c': b_c, 'd': b_d, 'e': b_e, 'f': b_f,
            'g': b_g, 'h': b_h, 'i': b_i, 'j': b_j, 'k': b_k, 'l': b_l, 
            'm': b_m, 'n': b_n, 'o': b_o, 'p': b_p, 'q': b_q, 'r': b_r,
            's': b_s, 't': b_t, 'u': b_u, 'v': b_v, 'w': b_w, 'x': b_x,
            'y': b_y, 'z': b_z
            }; //storing all functions of the bettina's font into an object


function background_color() {
    document.body.style.backgroundColor = bg;
}

function control_color() {
    document.querySelector(".qs_title_bar").style.backgroundColor = curCol[1];
    document.querySelector(".qs_main").style.backgroundColor = curCol[0];
    document.querySelector(".qs_range").style.backgroundColor = curCol[2];
    document.querySelector("input#leading.qs_range").style.backgroundColor = curCol[2];
    document.querySelector("input#tracking.qs_range").style.backgroundColor = curCol[2];
    document.querySelector("input#Top.qs_range").style.backgroundColor = curCol[2];
    document.querySelector("input#bottom.qs_range").style.backgroundColor = curCol[2];
    document.querySelector("input#Left.qs_range").style.backgroundColor = curCol[2];
    document.querySelector("input#Right.qs_range").style.backgroundColor = curCol[2];
    document.querySelector("input#colorPalette.qs_range").style.backgroundColor = curCol[2];
    document.querySelector("input#fontStyle.qs_range").style.backgroundColor = curCol[2];
    document.querySelector(".qs_range:focus").style.backgroundColor = curCol[3];
}

function setup() {
	
	//Create the GUI
    gui = createGui('Customize!', windowWidth - 250, 40);
    sliderRange(30, 100, 5);
    gui.addGlobals('unit');
    sliderRange(10, 150, 2);
    gui.addGlobals('leading');
    gui.addGlobals('tracking');
    gui.addGlobals('Top','bottom');
    gui.addGlobals('Left','Right');
    sliderRange(0, 10, 1);
    gui.addGlobals('colorPalette','bg','message'); 
    sliderRange(0, 1, 0.1);
    gui.addGlobals('fontStyle');
    noLoop(); //only redraws when gui is changed

}

function draw() {
    var numLetters = message.length;
    //determines height needed for canvas
    var canvasSpace = maxWidth - Left - Right + tracking; //the space letters can be drawn
    var numLettersInRow = Math.floor(canvasSpace / (unit + tracking));
    var maxVertical = Math.floor(numLetters / numLettersInRow); //number of rows or max vertical height
    var maxEndY = maxVertical * (unit + leading) + Top;
    //adds on enough vertical space for another row of letters
    if(numLetters !== 0) { 
        maxEndY += unit;
    }
    var maxHeight = maxEndY + bottom;
    createCanvas(maxWidth, maxHeight);
    background(bg);
    noStroke();
    //goes through each letter in typed message and calls respective letter function
    for (i = 0; i < numLetters; i++) { 
        var cur = message[i]; //stores current letter string
        typeLetter(cur,i); 
    }
    background_color();
    control_color();
}

function typeLetter(ltr,i) {
    //determines startX and startY
    var startX = i * (unit + tracking) + Left;
    var canvasSpace = maxWidth - Left - Right + tracking; //the space letters can be drawn
    var numLettersInRow = Math.floor(canvasSpace / (unit + tracking));
    startX = i % numLettersInRow * (unit + tracking) + Left; //makes sure startX stays within canvas
    var vertical = Math.floor(i / numLettersInRow);
    var startY = vertical * (unit + leading) + Top; //moves startY down when text goes to next line
    curCol = col[colorPalette];
    var fontCounter = random(1);
    if (ltr != " ") {
	   if (fontCounter <= fontStyle) {
            fontB[ltr](startX, startY, curCol); //calls letter function stored in object
        }
        else {
            fontA[ltr](startX, startY, curCol);
        }
    }
}

//////////////////////////
/////BETTINAS TYPEFACES///
//////////////////////////

/////SHAPES TO DRAW TYPEFACES WITH/////

function triangleB(x,y,w,h,orientation) {
    if (orientation === 0) { // triangle base on bottom
        beginShape();
        vertex(x,y);
        vertex(x + (w / 2), y + h);
        vertex(x - (w / 2), y + h);
        endShape();
    }
    else if (orientation == 1) { //triangle base on right
        beginShape();
        vertex(x,y);
        vertex(x + h, y + (w / 2));
        vertex(x + h, y - (w / 2));
        endShape();
    }
    else if (orientation == 2) { //triangle base on top left
        beginShape();
        vertex(x, y);
        vertex(x, y - h);
        vertex(x - w, y);
        endShape();
    }
    else if (orientation == 3) { //triangle base on bottom right
        beginShape();
        vertex(x, y);
        vertex(x + w, y);
        vertex(x, y + h);
        endShape();
    }
    else if (orientation == 4) { //triangle base on top right
        beginShape();
        vertex(x, y);
        vertex(x, y - h);
        vertex(x + w, y);
        endShape();
    }
    else if (orientation == 5) { //triangle base on top
        beginShape();
        vertex(x, y);
        vertex(x - w / 2, y - h);
        vertex(x + w / 2, y - h);
        endShape();
    }
    else if (orientation == 6) { //triangle base on left
        beginShape();
        vertex(x, y);
        vertex(x - h, y - w / 2);
        vertex(x - h, y + w / 2);
        endShape();
    }
}

/////TYPEFACE FUNCTIONS/////

function b_a(x, y, col) {
    var tipX = x + (unit / 2);
    fill(col[0]);
    triangleB(tipX,y, unit * 0.86, unit * 0.86, 0);
    fill(col[1]);
    triangleB(tipX, y + (unit * 0.36), unit * 0.65, unit * 0.65, 0); //second triangle is slightly lower
}

function b_b(x, y, col) {
    fill(col[2]); 
    var cornerX = x + (unit * 0.14);
    var cornerY = y + (unit * 0.07);
    rect(cornerX, cornerY, unit * 0.6, unit * 0.86); //rect slightly smaller than unit
    fill(col[1]); 
    var tipX = x + (unit / 2);
    var tipY = y + (unit * 0.52);
    triangleB(tipX, tipY, unit * 0.4, unit * 0.4, 1); //give tip, width, height, and which orientation its facing
}

function b_c(x, y, col) {
    fill(col[3]);
    ellipse(x + (unit / 2), y + (unit / 2), unit * 0.8, unit * 0.8);
    var tipX = x + (unit * 0.52);
    var tipY = y + (unit / 2);
    fill(col[1]); 
    triangleB(tipX, tipY, unit * 0.4, unit * 0.4, 1);
}

function b_d(x, y, col) {
    fill(col[3]) 
    ellipse(x + (unit / 2), y + (unit / 2), unit * 0.8, unit * 0.8);
    fill(col[1]); 
    rect(x + (unit * 0.09), y + (unit * 0.07), unit * 0.3, unit * 0.85);
}

function b_e(x, y, col) {
    fill(col[2]); 
    rect(x + (unit * 0.15), y + (unit * 0.07), unit * 0.59, unit * 0.86);
    fill(col[1]); 
    rect(x + (unit * 0.44), y + (unit * 0.26), unit * 0.4, unit * 0.16);
    rect(x + (unit * 0.44), y + (unit * 0.58), unit * 0.4, unit * 0.16);
}

function b_f(x, y, col) {
    fill(col[2]); 
    rect(x + (unit * 0.15), y + (unit * 0.07), unit * 0.59, unit * 0.86);
    fill(col[1]); 
    rect(x + (unit * 0.44), y + (unit * 0.26), unit * 0.4, unit * 0.16);
    rect(x + (unit * 0.44), y + (unit * 0.58), unit * 0.4, unit * 0.45);
}

function b_g(x, y, col) {
    fill(col[3]);
    ellipse(x + (unit * 0.44), y + (unit / 2), unit * 0.8, unit * 0.8);
    fill(col[0]);
    rect(x + (unit * 0.56), y + (unit * 0.4), unit * 0.4, unit * 0.2);
}

function b_h(x, y, col) {
    fill(col[2]);
    rect(x + unit * 0.15, y + unit * 0.15, unit * 0.7, unit * 0.7);
    fill(col[1]);
    rect(x + unit * 0.42, y + unit * 0.01, unit * 0.16, unit * 0.37);
    rect(x + unit * 0.42, y + unit * 0.61, unit * 0.16, unit * 0.37);
}

function b_i(x, y, col) {
    fill(col[0]);
    rect(x + unit * 0.36, y + unit * 0.07, unit * 0.27, unit * 0.86);
}

function b_j(x, y, col) {
    fill(col[0]);
    rect(x + unit * 0.47, y + unit * 0.07, unit * 0.27, unit * 0.86);
    fill(col[2]);
    var tipX = x + unit * 0.74;
    var tipY = y + unit * 0.93;
    triangleB(tipX, tipY, unit * 0.53, unit * 0.61, 2);
}

function b_k(x, y, col) {
    fill(col[0]);
    triangleB(x + unit / 4, y + unit * 0.07, unit * 0.53, unit * 0.61, 3);
    fill(col[2]);
    triangleB(x + unit / 4, y + unit * 0.93, unit * 0.53, unit * 0.61, 4);
}

function b_l(x, y, col) {
    fill(col[2]);
    rect(x + unit * 0.15, y + unit * 0.13, unit * 0.58, unit * 0.86);
    fill(col[1]);
    rect(x + unit * 0.42, y, unit * 0.43, unit * 0.76);	
}

function b_m(x, y, col) {
    fill(col[0]);	
    rect(x + unit * 0.15, y + unit * 0.2, unit * 0.7, unit * 0.7);
    fill(col[1]);
    triangleB(x + unit / 2, y + unit * 0.63, unit * 0.48, unit * 0.53, 5);
}

function b_n(x, y, col) {
    fill(col[2]);
    rect(x + unit * 0.15, y + unit * 0.2, unit * 0.7, unit * 0.7);
    fill(col[1]);
    triangleB(x + unit * 0.58, y + unit * 0.53, unit * 0.32, unit * 0.43, 5);
    triangleB(x + unit *  0.42, y + unit * 0.54, unit * 0.32, unit * 0.43, 0);
}

function b_o(x, y, col) {
    fill(col[3]);
    ellipse(x + unit * 0.51, y + unit * 0.51, unit * 0.8, unit * 0.8);
}

function b_p(x, y, col) {
    fill(col[3]);
    ellipse(x + unit * 0.55, y + unit * 0.32, unit * 0.59, unit * 0.59);
    fill(col[0]);
    rect(x + unit * 0.26, y + unit * 0.32, unit * 0.24, unit * 0.67);
}

function b_q(x, y, col) {
    fill(col[3]);
    ellipse(x + unit * 0.46, y + unit * 0.47, unit * 0.8, unit * 0.8);
    fill(col[0]);
    beginShape();
    vertex(x + unit * 0.66, y + unit * 0.43);
    vertex(x + unit * 0.49, y + unit * 0.6);
    vertex(x + unit * 0.79, y + unit * 0.9);
    vertex(x + unit * 0.96, y + unit * 0.73);
    endShape();
}

function b_r(x, y, col) {
    fill(col[0]);
    triangleB(x + unit * 0.205, y + unit * 0.95, unit * 0.53, unit * 0.61, 4);
    fill(col[3]);
    ellipse(x + unit / 2, y + unit * 0.37, unit * 0.59, unit * 0.59);
}

function b_s(x, y, col) {
    fill(col[3]);
    ellipse(x + unit * 0.47, y + unit / 2, unit * 0.75, unit * 0.75);
    fill(col[1]);
    triangleB(x + unit * 0.47, y + unit * 0.38, unit * 0.32, unit * 0.43, 1);
    triangleB(x + unit * 0.47, y + unit * 0.64, unit * 0.32, unit * 0.43, 6);
}

function b_t(x, y, col) {
    fill(col[3]);
    rect(x + unit * 0.2, y + unit * 0.05, unit * 0.59, unit * 0.86);
    fill(col[1]);
    rect(x + unit * 0.12, y + unit * 0.3, unit * 0.27, unit * 0.64);
    rect(x + unit * 0.61, y + unit * 0.3, unit * 0.27, unit * 0.64);
}

function b_u(x, y, col) {
    fill(col[2]);
    rect(x + unit * 0.16, y + unit * 0.2, unit * 0.7, unit * 0.7);
    fill(col[1]);
    rect(x + unit * 0.39, y + unit * 0.06, unit * 0.24, unit * 0.59);
}

function b_v(x, y, col) {
    fill(col[3]);
    triangleB(x + unit / 2, y + unit, unit * 0.86, unit * 0.86, 5);
    fill(col[1]);
    triangleB(x + unit / 2, y + unit * 0.64, unit * 0.64, unit * 0.64, 5);
}

function b_w(x, y, col) {
    fill(col[3]);
    rect(x + unit * 0.15, y + unit * 0.1, unit * 0.7, unit * 0.7);
    fill(col[1]);
    triangleB(x + unit / 2, y + unit * 0.37, unit * 0.48, unit * 0.53, 0);
}

function b_x(x, y, col) {
    fill(col[2]);
    triangleB(x + unit / 2, y + unit * 0.75, unit * 0.8, unit * 0.64, 5);
    fill(col[0]);
    triangleB(x + unit / 2, y + unit / 4, unit * 0.8, unit * 0.64, 0);
    
}

function b_y(x, y, col) {
    fill(col[2]);
    triangleB(x + unit / 2, y + unit * 0.71, unit * 0.8, unit * 0.64, 5);
    fill(col[0]);
    rect(x + unit * 0.38, y + unit * 0.07, unit * 0.24, unit * 0.86);
}

function b_z(x, y, col) {
    fill(col[2]);
    rect(x + unit * 0.16, y + unit * 0.15, unit * 0.7, unit * 0.7);
    fill(col[1]);
    triangleB(x + unit / 2, y + unit * 0.4, unit * 0.32, unit * 0.43, 6);
    triangleB(x + unit * 0.53, y + unit * 0.62, unit * 0.32, unit * 0.43, 1);
}

//////////////////////////
/////HAEWANS TYPEFACES////
//////////////////////////

/////TYPEFACE FUNCTIONS/////

function a_a(x, y, col) {
    trngl(x + unit / 2, y, unit, 3, col)
    trngl(x + unit / 2, y, unit, 4, col);
    crcl(x + unit / 2, y + 2 * unit / 3, unit / 3, col);
}

function a_b(x, y, col) {
    hlf_crcl(x, y + 3 * unit / 10, 3 * unit / 5, - HALF_PI, col);
    hlf_crcl(x, y + 7 * unit / 10, 3 * unit / 5, - HALF_PI, col);
    rctngl(x + unit/6, y, unit, 'v', col);
}

function a_c(x, y, col) {
    hlf_crcl(x, y + unit / 2, unit, HALF_PI, col);
    crcl(x + unit / 2, y + unit / 2, unit / 3, col);
}

function a_d(x, y, col) {
    rctngl(x, y, unit, 'v', col);
    hlf_crcl(x - unit / 6, y + unit / 2, unit, - HALF_PI, col);
}

function a_e(x, y, col) {
    rctngl(x + unit * 0.2, y, unit, 'v', col);
    crcl(x + unit * 0.75, y + unit * 0.15, unit * 0.3, col);
    crcl(x + unit * 0.75, y + unit * 0.5, unit * 0.3, col);
    crcl(x + unit * 0.75, y + unit * 0.85, unit * 0.3, col);
}

function a_f(x, y, col) {
    rctngl(x + unit * 0.2, y, unit, 'v', col);
    crcl(x + unit * 0.75, y + unit * 0.15, unit * 0.3, col);
    crcl(x + unit * 0.75, y + unit * 0.5, unit * 0.3, col);
}

function a_g(x, y, col) {
    hlf_crcl(x, y + unit / 2, unit, 0, col);
    hlf_crcl(x, y + unit / 2, unit, HALF_PI + QUARTER_PI, col);
}

function a_h(x, y, col) {
    rctngl(x, y, unit, 'v', col);
    crcl(x + unit * 0.5, y + unit * 0.5, unit * 0.3, col);
    rctngl(x + 2 * unit / 3, y, unit, 'v', col);
}

function a_i(x, y, col) {
    rctngl(x + unit / 3, y, unit, 'v', col);
}

function a_j(x, y, col) {
    rctngl(x + unit / 2, y, 2 * unit / 3, 'v', col);
    hlf_crcl(x, y + 2 * unit / 3, 2 * unit / 3, 0, col);
}

function a_k(x, y, col) {
    rctngl(x + unit * 0.1, y, unit, 'v', col);
    trngl(x + unit * 0.43, y, unit, 2, col);
    trngl(x + unit * 0.43, y, unit, 4, col);
}

function a_l(x, y, col) {
    rctngl(x + unit * 0.2, y, unit, 'v', col);
    crcl(x + unit * 0.75, y + unit * 0.85, unit * 0.3, col);
}

function a_m(x, y, col) {
    trngl(x, y, unit, 4, col);
    trngl(x + unit / 2, y, unit, 4, col);
}

function a_n(x, y, col) {
    trngl(x + unit * 0.1, y, unit, 4, col);
    rctngl(x + unit * 0.6, y, unit, 'v', col);
}

function a_o(x, y, col) {
    crcl(x + unit / 2, y + unit / 2, unit, col);
}

function a_p(x, y, col) {
    hlf_crcl(x, y + 3 * unit / 10, 3 * unit / 5, -HALF_PI, col);
    rctngl(x + unit / 6, y, unit, 'v', col);
}

function a_q(x, y, col) {
    crcl(x + unit / 2, y + unit / 2, unit, col);
    trngl(x + unit / 2, y + unit / 2, unit / 2, 4, col);
}

function a_r(x, y, col) {
    trngl(x + unit / 2, y + unit / 2, unit / 2, 4, col);
    hlf_crcl(x, y + 3 * unit / 10, 3 * unit / 5, -HALF_PI, col);
    rctngl(x + unit / 6, y, unit, 'v', col);
}

function a_s(x, y, col) {
    hlf_crcl(x + unit * 0.11, y + unit * 0.4, 3 * unit / 4, HALF_PI + QUARTER_PI, col);
    hlf_crcl(x - unit * 0.11, y + unit * 0.6, 3 * unit / 4, TWO_PI - QUARTER_PI, col);
}

function a_t(x, y, col) {
    rctngl(x + unit / 3, y, unit, 'v', col);
    crcl(x + unit * 0.15, y + unit * 0.15, unit * 0.3, col);
    crcl(x + unit * 0.85, y + unit * 0.15, unit * 0.3, col);
}

function a_u(x, y, col) {
    rctngl(x, y, unit / 2, 'v', col);
    rctngl(x + 2*unit / 3, y, unit / 2, 'v', col);
    hlf_crcl(x, y + unit / 2, unit, 0, col);
}

function a_v(x, y, col) {
    trngl(x + unit / 2, y, unit, 1, col)
    trngl(x + unit / 2, y, unit, 2, col);
    crcl(x + unit / 2, y + unit / 3, unit / 3, col);
}

function a_w(x, y, col) {
    trngl(x, y, unit, 2, col);
    trngl(x + unit / 2, y, unit, 2, col);
}

function a_x(x, y, col) {
    trngl(x + unit / 2, y, unit, 1, col);
    trngl(x + unit / 2, y, unit, 2, col);
    trngl(x + unit / 2, y, unit, 3, col);
    trngl(x + unit / 2, y, unit, 4, col);
}

function a_y(x, y, col) {
    rctngl(x + unit / 3, y + unit / 3, 2 * unit / 3, 'v', col);
    hlf_crcl(x, y, unit, 0, col);
}

function a_z(x, y, col) {
    push();
    translate(x + unit / 2, y + unit / 2, col);
    rotate(HALF_PI);
    trngl(unit / 6, -unit / 2, unit, 1, col);
    pop();
    rctngl(x, y, unit, 'h', col);
    rctngl(x, y + 2 * unit / 3, unit, 'h', col);
}

/////SHAPES TO DRAW TYPEFACES WITH/////

//shape 0
function trngl(x, y, h, d, col) {
    fill(col[0]); 
    beginShape();
    vertex(x, y);
    vertex(x, y + h);
    if (d % 2 === 0) {
        vertex(x + h / 2, y + h * (2 % d) / 2);   
    } else {
        vertex(x - h / 2, y + h * (2 % d) / 2);
    }
    endShape();    
}

//shape 1
function crcl(x, y, r, col) {
    fill(col[1]); 
    ellipse(x, y, r, r);
}

//shape 2
function rctngl(x, y, h, d, col) {
    fill(col[2]); 
    if (d == 'v') {
        rect(x, y, unit / 3, h);
    } else {
        rect(x, y, h, unit / 3);
    }
}

//shape 3
function hlf_crcl(x, y, r, d, col) {
    fill(col[3]);
    arc(x + unit / 2, y, r, r, d, d + PI);
}

