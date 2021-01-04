var nowPage = 1;
var pageSize = 10;
var allPage = 1;
var tableData = [];
function bindEvent() {
  $(".menu").on("click", "dd", function () {
    $(this).addClass("active").siblings().removeClass("active");
    var id = $(this).data("id");
    $("#" + id)
      .siblings()
      .fadeOut()
      .end()
      .fadeIn();
  });
  $("#tBody").on("click", ".edit", function () {
    var index = $(this).parents("tr").index();
    renderEditForm(tableData[index]);
    $(".modal").slideDown();
  });
  $("#edit-student-btn").click(function (e) {
    e.preventDefault();
    console.log($("#edit-student-form").serializeArray());
    var data = dealFormData($("#edit-student-form").serializeArray());
    api.updateStudent(data).then(function (response) {
        console.log(response);
      if (response.status === "success") {
        getTableData();
        $(".modal").slideUp();
      }
    });
  });
  $(".modal").click(function (e) {
    if (this === e.target) {
      $(this).slideUp();
    }
  });
  $("#tBody").on("click", ".remove", function () {
    var index = $(this).parents("tr").index();
    var student = tableData[index];
    var isDel = confirm("确定删除学号为" + student.sNo + "的学生吗？");
    if (isDel) {
      api.removeStudent(student.sNo).then(function (response) {
        if (response.status == "success") {
          getTableData();
        }
      });
    }
  });
}
bindEvent();
getTableData();
function getTableData() {
  api
    .getStudentData({
      page: nowPage,
      size: pageSize,
    })
    .then(function (response) {
      if (response.status === "success") {
        tableData = response.data.findByPage;
        var count = response.data.cont;
        allPage = Math.ceil(count / pageSize);
        renderTable(tableData);
      } else {
        alert(response.msg);
      }
    });
}

function renderTable(data) {
  var str = data.reduce(function (prev, item) {
    return (
      prev +
      `<tr>
        <td>${item.sNo}</td>
        <td>${item.name}</td>
        <td>${item.sex ? "女" : "男"}</td>
        <td>${item.email}</td>
        <td>${new Date().getFullYear() - item.birth}</td>
        <td>${item.phone}</td>
        <td>${item.address}</td>
        <td>
            <button class="edit btn">编辑</button>
            <button class="remove btn">删除</button>
        </td>
    </tr>`
    );
  }, "");
  $("#tBody").html(str);
  $('.turn-page').page({
      current: nowPage,
      total: allPage,
      size: pageSize,
      change: function (page) {
        nowPage = page;
        getTableData();
      }
  });
}

function renderEditForm(data) {
  var form = $("#edit-student-form")[0];
  for (var prop in data) {
    if (form[prop]) {
      form[prop].value = data[prop];
    }
  }
}

function dealFormData(arr) {
  var obj = {};
  arr.forEach(function (item) {
    obj[item.name] = item.value;
  });
  return obj;
}
