

function canvas() {
    gradient();
    shadow();
    stroke();
    twoStroke();
}

// 双重描边
function twoStroke() {
  const canvas = document.getElementById('canvas-twoStroke');
  const ctx = canvas.getContext('2d');
  canvas.width = 900;
  canvas.height = 100;
  ctx.font="50px STHeiTi";
  const gradient=ctx.createLinearGradient(0,0,canvas.width,0);
  gradient.addColorStop("0","orange");
  gradient.addColorStop("0.5","blue");
  gradient.addColorStop("1.0","red");
  // 第一次描边
  ctx.lineWidth = 20;
  ctx.strokeStyle = gradient;
  ctx.strokeWidth = 20;
  ctx.strokeText("canvas花字演示",10, 50);
  // 第二次描边
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'red';
  ctx.strokeWidth = 5;
  ctx.strokeText("canvas花字演示",10, 50);
  // 绘制文字
  ctx.fillStyle = 'green';
  ctx.fillText("canvas花字演示-双重描边",10,50);
}

// 描边
function stroke() {
  const canvas = document.getElementById('canvas-stroke');
  const ctx = canvas.getContext('2d');
  canvas.width = 900;
  canvas.height = 100;
  ctx.font="50px STHeiTi";
  const gradient=ctx.createLinearGradient(0,0,canvas.width,0);
  gradient.addColorStop("0","orange");
  gradient.addColorStop("0.5","blue");
  gradient.addColorStop("1.0","red");
  // 描边
  ctx.lineWidth = 20;
  ctx.strokeStyle = gradient;
  ctx.strokeWidth = 20;
  ctx.strokeText("canvas花字演示",10, 50);
  // 绘制文字
  ctx.fillStyle = 'red';
  ctx.fillText("canvas花字演示-描边",10,50);
} 

// 阴影
function shadow() {
  const canvas = document.getElementById('canvas-shadow');
  const ctx = canvas.getContext('2d');
  canvas.width = 900;
  canvas.height = 100;
  ctx.font="50px STHeiTi";
  // 阴影
  ctx.shadowOffsetX = '5';
  ctx.shadowOffsetY = '2';
  ctx.shadowBlur = '20';
  ctx.shadowColor = 'green';
  // 填充颜色
  ctx.fillStyle = 'red';
  // 绘制文字
  ctx.fillText("canvas花字演示-阴影",10,60);
}


// 渐变
function gradient() {
  const canvas = document.getElementById('canvas-gradient');
  const ctx = canvas.getContext('2d');
  canvas.width = 900;
  canvas.height = 100;
  ctx.font="50px STHeiTi";
  // 创建渐变
  const gradient=ctx.createLinearGradient(0,0,canvas.width,0);
  gradient.addColorStop("0","orange");
  gradient.addColorStop("0.5","blue");
  gradient.addColorStop("1.0","red");
  ctx.fillStyle = gradient;
  // 绘制文字
  ctx.fillText("canvas花字演示-渐变",10,50);
}




canvas();


