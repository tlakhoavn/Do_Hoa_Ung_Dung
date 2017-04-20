document.addEventListener('DOMContentLoaded', function(){
    var originalVideo = document.getElementById('ID_ORIGINAL_VIDEO');
    var canvasResult = document.getElementById('ID_CAVAS_RESULT');
    var context = canvasResult.getContext('2d');

    var back = document.createElement('canvas');
    var backcontext = back.getContext('2d');

    var cw,ch;

    originalVideo.addEventListener('play', function(){
        cw = originalVideo.clientWidth;
        ch = originalVideo.clientHeight;
        canvasResult.width = cw;
        canvasResult.height = ch;
        back.width = cw;
        back.height = ch;
       //grayScaleDraw(originalVideo,context,backcontext,cw,ch);
       embossedDraw(originalVideo,context,backcontext,cw,ch);
    },false);

},false);


function grayScaleDraw(v,c,bc,w,h) {
    if(v.paused || v.ended) return false;
    // First, draw it into the backing canvas
    bc.drawImage(v,0,0,w,h);
    // Grab the pixel data from the backing canvas
    var idata = bc.getImageData(0,0,w,h);
    var data = idata.data;
    // Loop through the pixels, turning them grayscale
    for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var brightness = (3*r+4*g+b)>>>3;
        data[i] = brightness;
        data[i+1] = brightness;
        data[i+2] = brightness;
    }
    idata.data = data;
    // Draw the pixels onto the visible canvas
    c.putImageData(idata,0,0);
    // Start over!
    setTimeout(function(){ grayScaleDraw(v,c,bc,w,h); }, 0);
}


function embossedDraw(v,c,bc,cw,ch) {
    if(v.paused || v.ended) return false;
    // First, draw it into the backing canvas
    bc.drawImage(v,0,0,cw,ch);
    // Grab the pixel data from the backing canvas
    var idata = bc.getImageData(0,0,cw,ch);
    var data = idata.data;
    var w = idata.width;
    var limit = data.length
    // Loop through the subpixels, convoluting each using an edge-detection matrix.
    for(var i = 0; i < limit; i++) {
        if( i%4 == 3 ) continue;
        data[i] = 127 + 2*data[i] - data[i + 4] - data[i + w*4];
    }
    //idata.data = data;
    // Draw the pixels onto the visible canvas
    c.putImageData(idata,0,0);
    // Start over!
    setTimeout(embossedDraw,20,v,c,bc,cw,ch);
}