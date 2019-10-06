function setup() {
  var GridCanvas = document.getElementById('Gridvisulator')
  var GraphicsCanvas = document.getElementById('Graphicsvisulator')
  GridCanvas.height = 2100;//2100
  GridCanvas.width = 2100;
  GridCanvas.style.width = "500px";
  GridCanvas.style.height = "500px";
  GridCanvas.style.imageRendering = "pixelated";
  GridCanvas.getContext('2d').imageSmoothingEnabled = false;
  GraphicsCanvas.height = 2100;
  GraphicsCanvas.width = 2100;
  GraphicsCanvas.style.width = "500px";
  GraphicsCanvas.style.height = "500px";
  GraphicsCanvas.style.imageRendering = "pixelated";
  GraphicsCanvas.getContext('2d').imageSmoothingEnabled = false;
  var imagesToLoad = ['image-files/1.12/top.png',]
  var div = document.createElement('div')
  div.id = 'imageHolder'
  div.style.display = 'none'
  document.body.appendChild(div)
  for (var i = 0; i < imagesToLoad.length; i++) {
    var img = new Image()
    img.src = imagesToLoad[i]
    document.getElementById('imageHolder').appendChild(img)
  }
  //img.parentNode.removeChild(img);
  var menu = document.getElementById('vers-select')
  menu.addEventListener("change", function() {
    var vers = document.getElementById('vers-select').value
    ChangeVersion(vers)
  })
  GridObject.Cells["c2x0x1"] = {block:"1"}
  GridObject.Cells["c2x0x2"] = {block:"1:1"}
  GridObject.Cells["c2x0x3"] = {block:"1:2"}

  GridObject.Cells["c1x1x1"] = {block:"2"}
  GridObject.Cells["c2x1x1"] = {block:"2"}
  GridObject.Cells["c4x1x4"] = {block:"3"}
  setTimeout(function () {
    document.getElementById('imageHolder').parentNode.removeChild(document.getElementById('imageHolder'))
  }, 10)
  var previewDraw = setInterval(function() {renderLayer(0);}, 1);
    var stopPreviewDraw = function() { clearInterval(previewDraw) }
    setTimeout(stopPreviewDraw, 500)
}
function add_Rdom() {
  var x_size = GridObject.x_size
  var z_size = GridObject.z_size
  var rdmX = Math.floor(Math.random() * x_size)
  var rdmZ = Math.floor(Math.random() * z_size)
  var list = []
  for (var i = 1; i < 7; i++) {
    list.push(i.toString())
  }
  for (var i = 11; i < 25; i++) {
    list.push(i.toString())
  }
  //var list = ['1','2','3','4','5','7','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25']
  var rdmB = Math.floor(Math.random() * list.length)
  var crd = cellCord(rdmX,0,rdmZ)
  if (GridObject.Cells.hasOwnProperty[crd] == undefined) {
    GridObject.Cells[crd] = {
      block:rdmB.toString()
  }
  renderCell(crd)
  }
}
function ChangeVersion(version) {
  switch (version) {
    case '1.12':
     //console.log('IT IS 1.12!!!');
      break;
    case '1.14':
     //console.log('IT IS 1.14!!!');
      break;
    default:
     //console.log('Version [' + version + '] caused an Error')
  }
}
function initCanvasVar() {
  window.canvas = document.getElementById('Gridvisulator')
  window.ctx = window.canvas.getContext('2d')
  window.canvasG = document.getElementById('Graphicsvisulator')
  window.ctxG = window.canvasG.getContext('2d')
}
function prepareSelect() {
  document.getElementById('brush_select').onchange = function() {toolObj.tool = this.value;}
}
function updateGlobalVar() {
  window.sw = canvas.width
  window.rw = parseInt(canvas.style.width.split("px")[0])
  window.size = GridObject.zoom * GridObject.defaultsize
  window.lw = GridObject.lineWidth
  window.clf = size - lw * 2
}
window.onload = function(){
  setup()
  initCanvasVar()
  initToolEvents()
  prepareSelect()
  updateGlobalVar()
}