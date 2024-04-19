quickdrawdataset=["pen","paper","ruler","kite","bottle","clock","dog","ice cream","siccors","phone","circle"]
timer_counter=0
timer_check=""
draw_sketch=""
answer_holder=""
score=0
random_number=Math.floor(Math.random()*quickdrawdataset.length)+1
sketchtobedraw=quickdrawdataset[random_number]
document.getElementById("Identify").innerHTML="sketch to be drawn: "+sketchtobedraw

function draw(){
    strokeWeight(13)
    stroke('black')
    check_sketch()
    if (mouseIsPressed) {
        line(pmouseX,pmouseY,mouseX,mouseY)
    }
    if (draw_sketch==sketchtobedraw) {
        answer_holder="set"
        score=score+1
        document.getElementById("score").innerHTML="Score:"+score
    }
}
function setup(){
    canvas=createCanvas(300,300)
    canvas.center()
    background("white")
    canvas.mouseReleased(classifyCanvas)
}
function updateCanvas(){
    background("white")
    random_number=Math.floor(Math.random()*quickdrawdataset.length)+1
    sketchtobedraw=quickdrawdataset[random_number]
    document.getElementById("Identify").innerHTML="sketch to be drawn: "+sketchtobedraw
}
function check_sketch(){
 timer_counter=timer_counter+1
 document.getElementById("timer").innerHTML="Timer:"+timer_counter
 console.log(timer_counter)
 if (timer_counter>400) {
    timer_counter=0
    timer_check="completed"
 }
 if (timer_check=="completed"||answer_holder=="set") {
    timer_check=""
    answer_holder=""
    updateCanvas()
 }
}
function preload(){
    classifier=ml5.imageClassifier('DoodleNet')
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult)
}
function gotResult(error,results){
    if (error) {
        console.log("error")
    }
    console.log(results)
    document.getElementById('label').innerHTML='Label:'+results[0].label
    document.getElementById('confidence').innerHTML='Convidence: '+Math.round(results[0].confidence*100)+'%'
}