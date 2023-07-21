$(function () {
  Init();
});

function Init() {



}
function PTGen() {
  if (isInputValid()) {
    $.post("https://api.iyuu.cn/index.php", {
      // 在这里添加你要发送的数据  
      "service": "App.Movie.Ptgen",
      "url": $('#Input').val()
    }, function (data, status) {
      var str = JSON.stringify(data);//转字符串
      var obj = JSON.parse(str);//转js对象
      var code = parseInt(obj["ret"]);//状态码
      var info = obj["data"]["format"];//信息
      switch (code) {
        case 200://成功
          ProcessData(info);
          $('#Notice').text("成功");
          $('#Notice').removeClass("fail").addClass("success");
          break;
        default:
          $('#Notice').text("错误:" + code);
          $('#Notice').removeClass("success").addClass("fail");
          break;
      }
      // console.log(code);
      // console.log(info);

    });
  } else {
    // alert("参数未识别，请填写IMDB编号或豆瓣编号");
    $('#Notice').text("参数未识别");
    $('#Notice').removeClass("success").addClass("fail");
  }
}
function ProcessData(str) {
  var pattern = /\[img\].*?\[\/img\]/;

  let image = pattern.exec(str);

  if (image !== null) {
    str = str.replace(pattern, '');
    var regex = /\[img\](.*?)\[\/img\]/i;
    var match = image[0].match(regex);
    // 如果匹配成功，则获取图片链接  
    if (match) {
      var imgUrl = match[1];
      $('#Poster').val(imgUrl);
    } else {
      console.log('未找到图片链接');
    }
    $('#Description').val(str);


  } else {
    $('#Description').val(str);
  }


}

function isInputValid() {
  var text = $('#Input').val();
  var pattern = /(tt)?[0-9]+/;
  if (pattern.exec(text) !== null) {
    return true;
  } else {
    return false;
  }
  // return false;

}
function Generate() {
  // 转种提示
  var note = $('#Note')
  var str1 = note.val();
  if (note.val().length > 0) {
    str1 = "[quote]" + str1 + "[/quote]";
  }
  console.log(str1);


  // 封面图
  var poster = $('#Poster');
  var str2 = poster.val();
  if (poster.val().length > 1) {
    str2 = "[img]" + str2 + "[/img]";
  } else {
    // alert("缺少封面！");
    $('#spanPost').addClass("warn");
  }


  // 简介
  var description = $('#Description');
  var str3 = description.val();
  if (description.val().length < 1) {
    // alert("缺少简介！");
    $('#spanIntro').addClass("warn");
  }


  // 媒体信息
  var mediaInfo = $('#MediaInfo');
  var str4 = mediaInfo.val();
  if (mediaInfo.val().length > 1) {
    str4 = "[quote]" + mediaInfo.val() + "[/quote]";
  } else {
    // alert("缺少Info！");
    $('#spanInfo').addClass("warn");
  }


  // 预览图
  var images = $('#Images');
  var str5="";
  if (images.val().length > 0) {
    var lines = images.val().split('\n');  // 使用split()方法将文本按行分割成一个数组  
    for (var i = 0; i < lines.length; i++) {  // 遍历数组中的每个元素，对每个元素进行修改，在开头添加[img]，结尾添加[/img]  
      lines[i] = '[img]' + lines[i] + ' [/img]';
    }
    str5 = lines.join("\n");  // 将修改后的数组重新组合成字符串  

  } else {
    // alert("缺少图片！");
    $('#spanPic').addClass("warn");
  }


  // 输出
  var output = $('#Output');
  var str6 = str1 + "\n" + str2 + "\n" + str3 + "\n" + str4 + "\n" + str5 + "\n";//拼接
  // console.log(str6);
  output.val(str6);//赋值


}
function Clear() {
  $('#Note').val("");
  $('#Poster').val("");
  $('#Description').val("");
  $('#MediaInfo').val("");
  $('#Images').val("");
  $('#Output').val("");
  $('#Preview').empty();
  $('#Notice').text("");
  $('#Notice').removeClass("success").removeClass("fail");
  $('#spanPost').removeClass("warn")
  $('#spanIntro').removeClass("warn")
  $('#spanInfo').removeClass("warn")
  $('#spanPic').removeClass("warn")


}
function Export() {
  var text = $('#Output').val();

  // 创建Blob对象  
  var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  // 创建URL  
  var url = URL.createObjectURL(blob);

  // // 创建下载链接  
  // $('#ExportBtn').attr('href', url);
  // $('#ExportBtn').attr('download', 'file.txt');
  // document.getElementById("ExportBtn").click();

  // 清除创建的元素和URL  
  // URL.revokeObjectURL(url);  

  // 创建下载链接  
  var a = document.createElement("a");
  a.href = url;
  a.download = "file.txt";
  document.body.appendChild(a);
  a.click();

  // 清除创建的元素和URL  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function bbcodeToHtml(bbcode) {
  // 定义 BBCode 标记和对应的 HTML 标签  
  var tags = {
    '\\\[b\\\]': '<strong>',
    '\\\[/b\\\]': '</strong>',
    '\\\[quote\\\]': '<fieldset><legend>引用</legend> ',
    '\\\[/quote\\\]': '</fieldset>',
    '\\\[img\\\]': '<img src=\"',
    '\\\[/img\\\]': '\">',
    '\\n': ' <br>',
  };

  // 遍历 BBCode 字符串并替换标记  
  for (var tag in tags) {
    bbcode = bbcode.replace(new RegExp(tag, 'g'), tags[tag]);
    // console.log(tag)
  }

  // 去除多余的标签  
  // bbcode = bbcode.replace(/<(\/*[a-zA-Z]+)[^>]*>/g, '');  

  return bbcode;
}
function Preview() {
  var preview = $('#Preview').empty();
  var text = $('#Output').val();
  text = bbcodeToHtml(text);
  $('#Preview').append(text);
}

function Copy() {
  var text = $('#Output').val();
  navigator.clipboard.writeText(text).then(function () {
    console.log('复制成功！');
  }, function (err) {
    console.error('复制失败：', err);
  });
}

