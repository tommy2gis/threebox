


export const dataFormat = (data) => {};

export const axiosTiming = (instance, callback) => {
  instance.interceptors.request.use((request) => {
    request.ts = performance.now();
    return request;
  });

  instance.interceptors.response.use((response) => {
    callback(Number(performance.now() - response.config.ts));
    return response;
  });
};

/**
 * 图表图片导出
 * @param chart chart 实例
 * @param name 图片名称，可选，默认名为 'G2Chart'
 */
export const downloadImage = ({chart, name,subtitle,width,height}) => {
  const link = document.createElement("a");
  const filename = `${name}.png`;

  setTimeout(() => {
    const canvas = document.createElement('canvas');
    canvas.height = height||400;
    canvas.width = width||600;
    let ctx=canvas.getContext("2d");

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.fillStyle = '#000';
    ctx.font="20px 'Microsoft YaHei'";
    ctx.fillText(name,canvas.width/2,20);

    ctx.fillStyle = '#808080';
    ctx.font="16px 'Microsoft YaHei'";
    ctx.fillText(subtitle,canvas.width/2,60);

    ctx.drawImage(chart.get('canvas')._cfg.el, 0, 70);

    const dataURL = canvas.toDataURL();

    //const dataURL = chart.toDataURL("image/jpeg");
    if (window.Blob && window.URL ) {
      const arr = dataURL.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blobObj = new Blob([u8arr], { type: mime });
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blobObj, filename);
      } else {
        link.addEventListener("click", () => {
          link.download = filename;
          link.href = window.URL.createObjectURL(blobObj);
        });
      }
    } else {
      link.addEventListener("click", () => {
        link.download = filename;
        link.href = dataURL;
      });
    }
    const e = document.createEvent("MouseEvents");
    e.initEvent("click", false, false);
    link.dispatchEvent(e);
  }, 16);
};

export const getTime = (Time, format) => {
  if (!Time) {
    Time = new Date();
  } else {
    //将输入的Time转成date
  }
  var year_2 = date.getYear(); //获取当前年份(2位)

  var year = date.getFullYear(); //获取完整的年份(4位)

  var month = date.getMonth(); //获取当前月份(0-11,0代表1月)

  var date = date.getDate(); //获取当前日(1-31)

  var day = date.getDay(); //获取当前星期X(0-6,0代表星期天)

  var time = date.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)

  var hours = date.getHours(); //获取当前小时数(0-23)

  var minutes = date.getMinutes(); //获取当前分钟数(0-59)

  var seconds = date.getSeconds(); //获取当前秒数(0-59)

  var milliseconds = date.getMilliseconds(); //获取当前毫秒数(0-999)

  var LocaleDateString = date.toLocaleDateString(); //获取当前日期

  var mytime = date.toLocaleTimeString(); //获取当前时间

  var LocaleString = date.toLocaleString(); //获取日期与时间

  var returnVlaue = "";
  switch (format) {
    case "yyyy":
      returnVlaue = year;
      break;
    case "yy":
      returnVlaue = year2;
      break;
    default:
      break;
  }
  return returnVlaue;
};
