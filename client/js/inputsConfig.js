const addUserForm = document.getElementById("add-user-form");
const editUserForm = document.getElementById("edit-user-form");
const nameInput = document.getElementById("name");
const usernameInput = document.getElementById("username");
const deleteButton = document.querySelectorAll(".delete-btn");
const editButton = document.querySelectorAll(".edit-btn");
let pond = FilePond.create(document.querySelector(".filepond"));

addUserForm.addEventListener("submit", async (e) => {
e.preventDefault();
  let user = {};

  var data = new FormData(addUserForm);

  for (let [key, value] of data) {
    user[key] = value;
  }

  let pondImages = pond.getFiles();

  if (!user.name || !user.username || pondImages.length === 0) return;
  console.log('user', user)


  function urlencodeFormData(fd) {
    var s = "";
    function encode(s) {
      return encodeURIComponent(s).replace(/%20/g, "+");
    }
    for (var pair of fd.entries()) {
      if (typeof pair[1] == "string") {
        s += (s ? "&" : "") + encode(pair[0]) + "=" + encode(pair[1]);
      }
    }
    return s;
  }

  pond.removeFile();
  nameInput.value = "";
  usernameInput.value = "";
  let response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: urlencodeFormData(data),
  });
});


for (let i = 0; i < deleteButton.length; i++) {
  deleteButton[i].addEventListener("click", async (e) => {
    console.log('deleteButton')
    e.preventDefault();

    let response = await fetch(`/${deleteButton[i].id}`, {
      method: "DELETE",
    });
   console.log('response', response) 
  });
}

