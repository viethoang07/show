var quill = new Quill("#editor-container", {
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      ["link", "image", "video", "formula"],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
    ],
  },
  placeholder: "viết bài đăng",
  theme: "snow",
});
var coursesApi = "http://localhost:3000/listPost";
function start() {
  getCourses(renderCourses);
  handleCreateForm();
}
start();

function getCourses(callback) {
  fetch(coursesApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function createCourse(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(coursesApi, options)
    .then(function (response) {
      response.json();
    })
    .then(callback);
}

function renderCourses(listPost) {
  var listAcount = document.getElementById("list-acount");
  var htmls = listPost.map(function (listPost) {
    return `<div>
          ${listPost.name}
             </div>
         `;
  });
  listAcount.innerHTML = htmls.join("");
}
function handleCreateForm() {
  var create = document.getElementById("create");
  create.onclick = function () {
    var name = quill.getContents();
    var formData = {
      name: name,
    };

    createCourse(formData, function () {
      getCourses(renderCourses);
    });
  };
}
