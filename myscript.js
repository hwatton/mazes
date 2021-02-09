const ht = 600
const wd = 600

const svgC = d3.select(".container")
.append("svg")
.attr("height", ht)
.attr("width", wd)


// right. make a maze. like i did in vba

methodOne()

function methodOne() {

//takes out too much. Why?!


    const rows = 10
    const cols = 10




    //make an array of all maze positions

    let mazePositions = []
    let z = 0

    for (let i = 0; i < rows; i++) {
       for (let j = 0; j < cols; j++) {
           mazePositions.push({
               row: i,
               col: j,
               inMaze: false,
               mazeRef: null,
               id_no: z
           })
           
           z++
       }
        
    }


    //make an array of all maze internal walls

    let wallPositions = []

    //add horizontal walls first

    for (let i = 0; i < rows-1; i++) {
       for (let j = 0; j < cols; j++) {
           wallPositions.push({
               orientation: "horizontal",
               cellAbove: [i, j],
               cellBelow: [i+1, j],
               gone: false
           })
           
       } //j
        
    } // i

    //add vertical walls next

    for (let i = 0; i < cols-1; i++) {
        for (let j = 0; j < rows; j++) {
            wallPositions.push({
                orientation: "vertical",
                cellLeft: [i, j],
                cellRight: [i+1, j],
                gone: false
            })
            
        } //j
         
     } // i


let wP = shuffle(wallPositions)
let wLength = wP.length
let mazeRefNumber = 0
for (let i = 0; i < wLength; i++) { //BIG LOOP
    let obj = wP[i]
 
if (obj.orientation != "vertical") {
//horizontal wall

//console.log("horizontal")
let tempNo = obj.cellAbove[0]*cols + obj.cellAbove[1]
let tempNoTwo = obj.cellBelow[0]*cols + obj.cellBelow[1]

let cellOne = mazePositions[tempNo]
let cellTwo = mazePositions[tempNoTwo]

if (cellOne.inMaze) {
    //c1 in maze
if (cellTwo.inMaze) {
    //c2 also in maze
    //do nothing
}else{
    //c1 in maze, c2 not in maze
    mazePositions[tempNoTwo].inMaze = true
    mazePositions[tempNoTwo].mazeRef = mazePositions[tempNo].mazeRef
    wP[i].gone = true
}

}else{
    //c1 not in maze 
    if (cellTwo.inMaze) {
        //c1 not in maze,  c2 in maze
        mazePositions[tempNo].inMaze = true
        mazePositions[tempNo].mazeRef = mazePositions[tempNoTwo].mazeRef
        wP[i].gone = true

    }else{
        //neither in maze
        mazePositions[tempNo].inMaze = true
        mazePositions[tempNoTwo].inMaze = true

        mazePositions[tempNo].mazeRef = mazeRefNumber
        mazePositions[tempNoTwo].mazeRef = mazeRefNumber

        mazeRefNumber++


    }
}
    

}else{
//vertical wall
//console.log("vertical")

let tempNo = obj.cellLeft[0]*cols + obj.cellLeft[1]
let tempNoTwo = obj.cellRight[0]*cols + obj.cellRight[1]

let cellOne = mazePositions[tempNo]
let cellTwo = mazePositions[tempNoTwo]

if (cellOne.inMaze) {
    //c1 in maze
if (cellTwo.inMaze) {
    //c2 also in maze
    //do nothing
}else{
    //c1 in maze, c2 not in maze
    mazePositions[tempNoTwo].inMaze = true
    mazePositions[tempNoTwo].mazeRef = mazePositions[tempNo].mazeRef
    wP[i].gone = true
}

}else{
    //c1 not in maze 
    if (cellTwo.inMaze) {
        //c1 not in maze,  c2 in maze
        mazePositions[tempNo].inMaze = true
        mazePositions[tempNo].mazeRef = mazePositions[tempNoTwo].mazeRef
        wP[i].gone = true

    }else{
        //neither in maze
        mazePositions[tempNo].inMaze = true
        mazePositions[tempNoTwo].inMaze = true

        mazePositions[tempNo].mazeRef = mazeRefNumber
        mazePositions[tempNoTwo].mazeRef = mazeRefNumber

        mazeRefNumber++


    }
}

}


} // BIG LOOP

//the cells are now sorted.
//next, break up the distinct maze ref areas.

console.log(mazeRefNumber)
 /* loop through mazepositions
 if the mRf != prvious mRf{
     locate that wall in wP, mark as gone
     loop through all mazePositions and chnage anything with matching mRef to initial mRef
 }
 No.
 loop thru wP

 check the mazeRf of both cells (a +b ) on the wall. if no match, pick the lower(eg b).
 change wp.gone to true. 
 loop thru all mazePositions and change all matching higher (a)  to (b)
 */

 let check = wP.filter(d=>!d.gone)
console.log(check)

const mPL = mazePositions.length


for (let i = 0;i<wLength;i++) {

    if (wP[i].orientation != "vertical") {
        //horizontal wall
        
        let tempNo = wP[i].cellAbove[0]*cols + wP[i].cellAbove[1]
        let tempNoTwo = wP[i].cellBelow[0]*cols + wP[i].cellBelow[1]
        
        let mRef = mazePositions[tempNo].mazeRef
        let mRefTwo = mazePositions[tempNoTwo].mazeRef
        if (mRef != mRefTwo){
        wP[i].gone = true
        let minRef = d3.min([mRef, mRefTwo])
        let maxRef = d3.max([mRef, mRefTwo])

        console.log([minRef,maxRef])
for (let k = 0;k<mPL;k++)
if(mazePositions[k].mazeRef == maxRef) {
    mazePositions[k].mazeRef = minRef
}

        }




    }else{
        //vertical

let tempNo = wP[i].cellLeft[0]*cols + wP[i].cellLeft[1]
let tempNoTwo = wP[i].cellRight[0]*cols + wP[i].cellRight[1]

let mRef = mazePositions[tempNo].mazeRef
        let mRefTwo = mazePositions[tempNoTwo].mazeRef
        if (mRef != mRefTwo){
        wP[i].gone = true
        let minRef = d3.min([mRef, mRefTwo])
        let maxRef = d3.max([mRef, mRefTwo])
for (let k = 0;k<mPL;k++)
if(mazePositions[k].mazeRef == maxRef) {
    mazePositions[k].mazeRef = minRef
}

        }

    }


}



let checkTwo = wP.filter(d=>!d.gone)
console.log(checkTwo)

//shoukd be done. will need a way in and out.

const sF = 50 //(scale factor)
let lineArr = []

for (let i=0; i<wLength; i++) {
/* if vertical,

get cellLeft no
get cellRigth no

line start = cR[1],cR[0]   ,  [cR[1]+1, cR[0]+1]
*/
if (!wP[i].gone) {

    if (wP[i].orientation != "horizontal") {

        let cR = wP[i].cellRight
        lineArr.push([ [cR[1]*sF,cR[0]*sF]   , [ (cR[1]+1)*sF, (cR[0])*sF]])

    }else{

        let cR = wP[i].cellBelow
       // console.log(wP[i])
        lineArr.push([ [cR[1]*sF,cR[0]*sF]   , [ (cR[1])*sF, (cR[0]+1)*sF]])
   
    }
}
 
} // let i

const lineFunc = d3.line()
.x(d=>d[0])
.y(d=>d[1])

let walls = svgC.selectAll("path")
.data(lineArr)
.enter()

walls.append("path")
.attr("d", (d)=>{return lineFunc(d)})
.attr("fill", "none")
.style("stroke", "black")
.style("stroke-width", "2px")
     


}//methodOne

function shuffle(arrayIn) {

    let returnArray = []
    let k = arrayIn.length

    for (let i = 0; i < k; i++) {
       let index = Math.floor(Math.random()*arrayIn.length)
        let element = arrayIn.splice(index,1)
        returnArray.push(element[0])
    }

return returnArray
}

