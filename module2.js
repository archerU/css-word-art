const json = {
  "moduleId": 10000,
  "name": "effectText",
  "canvas": {
    "width": 700,
    "height": 1000
  },
  "position": {
    // "left": "0",
    // "top": "50"
  },
  "config": {
    "font": {
      "fontStyle": "normal",
      "fontWeight": 900,
      "fontSize": "60px",
      "fontFamily": "SimSun, Songti SC",
    },
    "contents": [
      {
        "text": "通勤风长袖条纹",
        "fillStyle": '#BEFE1F',
        "textAlign": 'center',
        "shadowOffsetX": 3,
        "shadowOffsetY": 2,
        "shadowColor": '#000000',
        "position": {
          "top": "50",
          "right": "0",
          "left": "0"
        },
        "effects": [
          {
            "strokeStyle": '#000000',
            "lineWidth": 4
          }
        ]
      },
      {
        "text": "水洗超高腰",
        "fillStyle": '#FCE370',
        "textAlign": 'left',
        "position": {
          "top": "50",
          "right": "0",
          "left": "0"
        },
        "effects": [
          {
            "strokeStyle": '#000000',
            "lineWidth": 4
          }
        ]
      },
      {
        "text": "直筒长裤",
        "fillStyle": '#FCE370',
        "effects": [
          {
            "strokeStyle": '#000000',
            "lineWidth": 4
          }
        ]
      },
      {
        "text": "迷你自动白色",
        "fillStyle": '#FFFFFF',
        "textAlign": 'left',
        "lineHeight": 10,
        "position": {
          "left": "60"
        },
        "effects": [
          {
            "strokeStyle": '#000000',
            "lineWidth": 6
          }
        ]
      },
      {
        "text": "生活电器",
        "fillStyle": '#000000',
        "textAlign": 'left',
        "position": {
          "left": "60",
        },
        "effects": [
          {
            "strokeStyle": '#ffffff',
            "lineWidth": 6
          }
        ]
      },
      {
        "text": "OL风两件套",
        "fillStyle": '#FFFFFF',
        "textAlign": 'right',
        "lineHeight": 10,
        "shadowOffsetX": 5,
        "shadowOffsetY": 4,
        "shadowColor": '#6D92FF',
        "shadowBlur":0,
        "position": {
          "right": "10"
        },
        "effects": [
          {
            "strokeStyle": '#0546FF',
            "lineWidth": 4
          }
        ]
      },
      {
        "text": "职业装",
        "fillStyle": '#FFFFFF',
        "textAlign": 'right',
        "effects": [
          {
            "strokeStyle": '#0546FF',
            "lineWidth": 4
          }
        ]
      },
    ],
  }
}

function parseJsonToCanvas(json) {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = json.canvas.width;
  canvas.height = json.canvas.height;

  ctx.x = json.position.left || canvas.width/2;
  ctx.y = json.position.top || canvas.height/2;

  // 渲染默认字体大小
  ctx.font = json.config.font && Object.values(json.config.font).join(" ");
  ctx.fontSize = json.config.font && json.config.font.fontSize && parseInt(json.config.font.fontSize, 10);

  json.config.contents.forEach((item, index) => {
    Object.keys(item).forEach(key => {
      item[key] ? ctx[key] = item[key] : '';
    });
    const text = item.text;
    const _textZh = ctx.measureText(item.text);
    ctx.textBaseline = item.textBaseline || 'top'; 
    ctx.lineHeight = item.lineHeight ? parseInt(item.lineHeight, 10) : 10;
    if(item.textAlign) {
      ctx.textAlign = item.textAlign
    }

    //x 轴设置,  left,right 同时存在为居中，不设置position: left/right 则默认居中。优先级：right > left > center
    if(item.position && item.position.left && item.position.right) {
      if (item.textAlign === 'left') {
        ctx.x = canvas.width/2 - _textZh.width/2;
      }
      if (item.textAlign === 'right') {
        ctx.x = canvas.width/2 + _textZh.width/2;
      }
      if (item.textAlign === 'center') {
        ctx.x = canvas.width/2
      }
    } else if (item.position && item.position.right) {
      ctx.x = canvas.width - parseInt(item.position.right, 10)
    } else if(item.position && item.position.left) {
      ctx.x = parseInt(item.position.left, 10);
    }

    // y 轴设置
    if(item.position && item.position.top) {
      ctx.y = item.position.top
    }

    // 渲染描边
    item.effects && item.effects.forEach((effect) => {
      if (effect.strokeStyle) {
        ctx.strokeStyle = effect.strokeStyle;
      }
      if (effect.gradient && effect.gradient.length > 0) {
        const _strokeStyle = renderLinearGradient(text, effect.gradient, ctx);
        ctx.strokeStyle = _strokeStyle;
      }
      
      ctx.lineWidth = effect.lineWidth;
      ctx.strokeText(text, ctx.x, Number(ctx.y)+ index*(ctx.fontSize + ctx.lineHeight));
    });
   
    // 渲染文字
    ctx.fillText(item.text, ctx.x, Number(ctx.y)+ index*(ctx.fontSize + ctx.lineHeight));
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

