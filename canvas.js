

function canvas() {
    gradient();
    shadow();
    stroke();
    twoStroke();
}

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
  ctx.strokeText("大地色哑光修饰眼影",10, 50);
  // 第二次描边
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'red';
  ctx.strokeWidth = 5;
  ctx.strokeText("大地色哑光修饰眼影",10, 50);
  // 绘制文字
  ctx.fillStyle = 'green';
  ctx.fillText("大地色哑光修饰眼影-双重描边",10,50);
}

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
  ctx.strokeText("大地色哑光修饰眼影",10, 50);
  // 绘制文字
  ctx.fillStyle = 'red';
  ctx.fillText("大地色哑光修饰眼影-描边",10,50);
} 

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
  ctx.fillText("大地色哑光修饰眼影-阴影",10,60);
}


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
  ctx.fillText("大地色哑光修饰眼影-渐变",10,50);
}




canvas();


