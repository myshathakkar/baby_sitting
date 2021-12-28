
status = ""
objects = []

function preload() {
   alarm = loadSound("old_telephone.mp3")
}

function setup() {
   canvas = createCanvas(380, 380)
   canvas.center()
   video = createCapture(VIDEO)
   video.size(380, 380)
   video.hide()
   objectDetector = ml5.objectDetector("cocossd", model_loaded)
}
function draw() {
   image(video, 0, 0, 380, 380)

   if (status != "") {
      r = random(255)
      g = random(255)
      b = random(255)
      objectDetector.detect(video, got_results)
      for (i = 0; i < objects.length; i++) {
         document.getElementById("status").innerHTML = "Status: object detected "
         document.getElementById("number_objects").innerHTML = "number of objects detected = " + objects.lengths
         fill(r, g, b)
         percent = floor(objects[i].confidence * 100)
         text(objects[i].label + " " + percent + "%", objects[i].x + 20, objects[i].y + 25)
         noFill()
         stroke(r, g, b)
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

         if (objects[i].label == "person") {
            document.getElementById("number_objects").innerHTML = "baby found"
            alarm.stop()
         }
         else {
            alarm.play()
            document.getElementById("number_objects").innerHTML = "baby missing"
         }
         if (objects.length == 0) {
            alarm.play()
            document.getElementById("number_objects").innerHTML = "baby missing"
         }
      }

   }
}
   function model_loaded() {
      console.log('model loaded')
      status = true

   }
   function got_results(error, results) {
      if (error) {
         console.error(error);
      }
      else {
         console.log(results)
         objects = results
      }

   }