
var api = {
  getStudentData: function (data) {
    return $.ajax({
      type: 'get',
      url: 'http://open.duyiedu.com/api/student/findByPage',
      dataType: 'json',
      data: $.extend(data, {
        appkey: 'DuYimeiqi_1564986205860'
      })
    });
  },
  updateStudent: function (data) {
    var df = $.Deferred();
    setTimeout(function () {
      df.resolve({
        status: "success",
        msg: "成功",
        data: {},
      });
    }, 30);
    return df;
  },
  removeStudent: function (sNo) {
    return $.ajax({
      type: 'get',
      url: 'http://open.duyiedu.com/api/student/delBySno',
      dataType: 'json',
      data: {
        sNo: sNo,
        appkey: 'DuYimeiqi_1564986205860'
      }
    });
  },
};
