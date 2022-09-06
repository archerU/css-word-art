

  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 900;
  canvas.height = 900;

  // 文本
  ctx.font="50px STHeiTi";
  ctx.lineWidth = 2;

  ctx.strokeStyle = 'green';
  ctx.strokeText('Stroke', 60, 100);

  ctx.fillStyle = 'red';
  ctx.fillText('Fill', 360, 100);

  ctx.fillText('Stroke & Fill', 580, 100);
  ctx.strokeText('Stroke & Fill', 580, 100);


  // 矩形
  ctx.beginPath();
  ctx.rect(60, 150, 150, 100);
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(310, 150, 150, 100);
  ctx.fill();

  ctx.beginPath();
  ctx.rect(630, 150, 150, 100);
  ctx.stroke();
  ctx.fill();

  // 画弧线
  ctx.beginPath();
  ctx.arc(130, 370, 60, 0, Math.PI*3/2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(375, 370, 60, 0, Math.PI*3/2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(700, 370, 60, 0, Math.PI*3/2);
  ctx.stroke();
  ctx.fill();