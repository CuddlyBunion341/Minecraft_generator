function renderCell(cell_index) {
  //declare all Variables
  var x = cell_index.split('x')[0].split('c')[1]
  var y = cell_index.split('x')[1]
  var z = cell_index.split('x')[2]
  var size = GridObject.zoom * GridObject.defaultsize;
  if (GridObject.spacefactor == -1) {
    var clf = size
  }
  else {
    var clf = size + size / GridObject.spacefactor;
  }
  var canvas = document.getElementById('Gridvisulator');
  var ctx = canvas.getContext('2d');
  var lw = GridObject.lineWidth;
  lw = size / (100 / lw)      //lw = size / (100 / lw)
  ctx.lineWidth = lw
  var clf = size - lw * 2
  var combinedRender = false
  if (!combinedRender) {
    ctx.clearRect(x * clf + lw,z * clf + lw,clf - lw,clf - lw)
  }
  if (GridObject.Cells.hasOwnProperty(cell_index)) {
    var block = GridObject.Cells[cell_index].block
   //console.log('Block:');
   //console.log(block);
    if (GridObject.version == '1.12') {
      if (block.includes(':')) {
        var id = block.split(':')[0]
        var idm = block.split(':')[1]
      }
      else {
        var id = block
        var idm = 0
      }
      var texture = new Image()
      texture.src = 'image-files/1.12/top.png'
      texture.style.imageRendering = 'pixelated'
     //console.log(texture);
      //ctx.drawImage(texture,16 * idm,16 *  id,16,16,)
      //ctx.drawImage(texture,16 * idm, 16 * id,16,16,0,0,size,size)
      //ctx.fillStyle = 'red'                                          //debug (sets fillcolor to red to be used below\/)
      //ctx.fillRect(x * clf + lw,z * clf + lw,clf - lw,clf - lw)      //debug (fills square with red color /\)
      //ctx.drawImage(texture,16 * idm, 16 * id,16,16,)
      ctx.fillStyle = "#FFFFFF"
      //ctx.fillRect(x * clf + lw,z * clf + lw,clf - 2 * lw,clf - 2 * lw)
      ctx.drawImage(texture,16 * idm,16 * id,16,16,x * clf + lw,z * clf + lw,clf - lw,clf - lw)
      //ctx.drawImage(texture,16 * idm,16 * id,16,16,x * clf,z * clf,clf,clf)
      //ctx.drawImage(texture,16 * idm, 16 * id,16,16,clf * x + GridObject.translate_x + size / (100 / lw),clf * z + GridObject.translate_z + size / (100 / lw),size - (size / (100 / lw)) * 2,size - (size / (100 / lw)) * 2)
      // works but not aligning with renderGrid's 'Grid'
    }
    else if (GridObject.version == '1.14') {

    }
  }
  /*if (GridObject.selected.includes(cell_index)) {
    ctx.fillStyle = "rgba(0,0,255,0.1)"
    ctx.fillRect(x * clf + lw,z * clf + lw,clf - lw,clf - lw)
  }*/
}
function renderCells(cell_arr) {
  for (var item in cell_arr) {
    renderCell(item)
  }
}
function renderCellLayer(layer) {
  width = GridObject.x_size;
  height = GridObject.z_size;
  for (var x = 0; x < width; x++) {
    for (var z = 0; z < height; z++) {
      var cell_index = cellCord(x,layer,z)
      renderCell(cell_index)
    }
  }
}
function renderLayer(layer,dl) {
  width = GridObject.x_size;
  height = GridObject.z_size;
  renderGrid(width,height,dl)
  renderCellLayer(layer)
}
function renderGrid(width,height,dl) {
  var c = document.getElementById('Gridvisulator')
  var ctx = c.getContext('2d')
  if (dl) {
    ctx.clearRect(0,0,c.width,c.height) //debug
  }
  var size = GridObject.zoom * GridObject.defaultsize
  var lw = GridObject.lineWidth
  lw = size / (100 / lw)      //lw = size / (100 / lw)
  ctx.lineWidth = lw
  var clf = size - lw * 2
  for (var w = 0; w < width; w++) {
    for (var h = 0; h < height; h++) {
      ctx.strokeRect(w * clf + lw * 0.5,h * clf + lw * 0.5,clf,clf)
    }
  }
}
function AutoZoom() {
  var c = document.getElementById('Gridvisulator')
  GridObject.zoom = c.width / GridObject.x_size / GridObject.defaultSize
  console.log(GridObject.zoom)
}