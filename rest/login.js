var coursesApi = "http://localhost:3000/courses";
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

function renderCourses(courses) {
  var listAcount = document.getElementById("list-acount");
  var htmls = courses.map(function (course) {
    return `
      <li>
          <h4>${course.name}</h4>
          <p>${course.password}</p>
          </li>
          `;
  });
  listAcount.innerHTML = htmls.join("");
}
function handleCreateForm() {
  var create = document.getElementById("create");
  create.onclick = function () {
    var name = document.querySelector('input[name="name"]').value;
    var password = document.querySelector('input[name="password"]').value;
    var formData = {
      name: name,
      password: password,
    };

    createCourse(formData, function () {
      getCourses(renderCourses);
    });
  };
}
