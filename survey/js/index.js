function Survey(json) {
  this.current = 0;
  this.data = json;
  this.answer = [];
  this.cache = [];
  this.currentType = 0;
  this.render();
  this.listenSubmit();
}
Survey.prototype = {
  isLast: function() {
    return this.current === this.data.length;
  },
  timeStart: function() {
    var _this = this;
    var ele = document.querySelector(".progress-bar");
    var progress = 0;
    var colors = ["progress-bar-success", "progress-bar-info", "progress-bar-warning", "progress-bar-danger"];
    var time = _this.data[_this.current].time || 16;
    var every_step = +(1.8 / time).toPrecision(2);
    function step() {
      progress += every_step;
      ele.style.width = progress + "%";
      var restTime = Math.ceil(time - time * progress / 100);
      $('.progress-bar').addClass(colors[parseInt(progress / 25)]);
      if (progress < 100) {
        _this.myAni = setTimeout(step, 18);
        ele.innerHTML = restTime + "秒";
      } else {
        clearTimeout(_this.myAni);
        ele.innerHTML = "时间到!";
        setTimeout(function(){
          _this.timeReset();
          if (_this.currentType) {
            $("#form2").find(".submit").trigger("click");
          } else {
            $("#form1").find(".submit").trigger("click");
          }
        },600);
      }
    }
    step();
  },
  timeReset: function() {
    clearTimeout(this.myAni);
    $('.progress-bar').css('width', 0).attr("class", "progress-bar");
  },
  render: function() {
    var currentData = this.data[this.current];
    if (!currentData) return;
    if (currentData.type) {
      um.set("checkboxForm", currentData);
      $("#form1,#form2").hide();
      $("#form2").slideDown(500);
      var cache = $("#duoxuan").clone();
      cache.removeAttr("id");
      this.cache[this.current] = cache[0].outerHTML;
      this.currentType = 1;
    } else {
      um.set("radioForm", currentData);
      $("#form1,#form2").hide();
      $("#form1").slideDown(500);
      var cache = $("#danxuan").clone();
      cache.removeAttr("id");
      this.cache[this.current] = cache[0].outerHTML;
      this.currentType = 0;
    }
    this.timeStart();
    this.current++;
    this.storage();
  },
  storage: function() {
    if (this.isLast()) {
      $(".submit").html("上传答案");
      var htmlCache = JSON.stringify(this.cache);
      localStorage.htmlCache = htmlCache;
    }
  },
  listenSubmit: function() {
    var danxuan = $("#form1");
    var duoxuan = $("#form2");
    var _this = this;
    $(".submit").eq(0).on("click", function(e) {
      _this.timeReset();
      if (_this.isLast()) {
        $(this).addClass("active").html("正在上传答案...");
        setTimeout(function() {
          location.href = "checkanswer.html";
        }, 2000);
        return;
      }
      var hasChecked = danxuan.find("input:radio:checked");
      var v = hasChecked.next("span").html();
      var qid = $(".qid").eq(0).html();
      var o = {};
      o.qid = qid;
      o.chose = v || "";
      _this.answer.push(o);
      _this.render();
    })
    $(".submit").eq(1).on("click", function(e) {
      _this.timeReset();
      if (_this.isLast()) {
        $(this).addClass("active").html("正在上传答案...");
        setTimeout(function() {
          location.href = "checkanswer.html";
        }, 2000);
        return;
      }
      var checkbox = duoxuan.find("input:checkbox");
      var o = {};
      var qid = $(".qid").eq(1).html();
      o.qid = qid;
      o.chose = "";
      $.each(checkbox, function() {
        if ($(this).is(":checked")) {
          var v = $(this).next("span").html();
          o.chose += v;
        }
      })
      _this.answer.push(o);
      _this.render();
    })
  }
}
$(function() {
  $.get("subject.json", function(response) {
    new Survey(response.data);
  })
  document.body.addEventListener('touchstart', function() {});
})