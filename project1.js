// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite( bgImg, fgImg, fgOpac, fgPos )
{   
    const bgWidth = bgImg.width;
    const bgHeight = bgImg.height;
    const fgWidth = fgImg.width;
    const fgHeight = fgImg.height;

    //bg and fg pixels data
    const bgData = bgImg.data; // Background RGBA array
    const fgData = fgImg.data; // Foreground RGBA array

    for (let fy = 0; fy < fgHeight; fy++) {
        for (let fx = 0; fx < fgWidth; fx++) {
            // Calculate the position of the foreground pixel on the background
            const bx = fx + fgPos.x;
            const by = fy + fgPos.y;

            if(bx >=0 &&bx<bgWidth && by>=0 && by<bgHeight){
                const fgIndex = (fy * fgWidth + fx) * 4; // RGBA foreground
                const bgIndex = (by * bgWidth + bx) * 4; // RGBA background
                const alpha = (fgData[fgIndex + 3] / 255) * fgOpac;

                for(let channel=0; channel <3; channel++){
                    for (let channel = 0; channel < 3; channel++) {
                        
                        bgData[bgIndex + channel] =Math.round(alpha * fgData[fgIndex + channel] +(1 - alpha) * bgData[bgIndex + channel]);
                        
                        
                    }
                }
                bgData[bgIndex + 3] = Math.round(alpha * fgData[fgIndex + 3] +(1 - alpha) * bgData[bgIndex + 3]);
            }
        }
    }

}
