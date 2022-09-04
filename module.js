const json = {
  "moduleId": 10000,
  "name": "effectText",
  "canvas": {
    "width": 700,
    "height": 600
  },
  "position": {
    "left": "",
    "top": "50"
  },
  "config": {
    "textAlign": "right",
    "textBaseline": "top",
    "lineHeight": 30,
    "font": {
      "fontStyle": "normal",
      "fontWeight": 900,
      "fontSize": "60px",
      "fontFamily": "SimSun, Songti SC",
    },
    "contents": [
      {
        "text": "canvas生成花字",
        "fillStyle": 'green',
        // "shadowOffsetX": 5,
        // "shadowOffsetY": 2,
        // "shadowColor": 'blue',
        // "shadowBlur":3
      },
      {
        "text": "这里是分行",
        "fillStyle": 'green'
      },
    ],
    "effects": [
      {
        "gradient": [
          {"0": "red"},
          {"0.5": "blue"},
          {"1.0": "orange"}
        ],
        "strokeStyle": 'green',
        "lineWidth": 20
      },
      {
        "strokeStyle": '#000',
        "lineWidth": 5
      }
    ]
  }
}

function parseJsonToCanvas(json) {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = json.canvas.width;
  canvas.height = json.canvas.height;

  const x = json.position.left || canvas.width/2;
  const y = json.position.top || canvas.height/2;
  
  // 渲染默认字体位置，大小
  ctx.textAlign = json.config.textAlign || 'center';
  ctx.textBaseline = json.config.textBaseline || 'top'; 
  ctx.font = json.config.font && Object.values(json.config.font).join(" ");
  ctx.lineHeight = json.config.lineHeight && parseInt(json.config.lineHeight, 10);
  ctx.fontSize = json.config.font && json.config.font.fontSize && parseInt(json.config.font.fontSize, 10);

  json.config.contents.forEach((item, index) => {
    Object.keys(item).forEach(key => {
      item[key] ? ctx[key] = item[key] : '';
    });
    const text = item.text;

    // 渲染描边
    json.config.effects.forEach((effect) => {
      ctx.strokeStyle = effect.strokeStyle || '';
      if (effect.gradient && effect.gradient.length > 0) {
        const _strokeStyle = renderLinearGradient(text, effect.gradient, ctx);
        ctx.strokeStyle = _strokeStyle;
      }
      
      ctx.lineWidth = effect.lineWidth;
      ctx.strokeText(text, Number(x), Number(y)+ index*(ctx.fontSize + ctx.lineHeight));
    });
    
    // 渲染文字
    ctx.fillText(item.text, x, Number(y)+ index*(ctx.fontSize + ctx.lineHeight));
  });
}

function renderLinearGradient(text, gradient, ctx) {
  const text_width = ctx.measureText(text);
  const _gradient = ctx.createLinearGradient(0,0,text_width.width,0);
  gradient.forEach(y => {
    Object.entries(y).forEach(u => {
      _gradient.addColorStop(u[0],u[1]);
    });
  });
  return _gradient;
}
parseJsonToCanvas(json);

