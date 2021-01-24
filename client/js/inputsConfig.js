const addUserForm = document.getElementById("add-user-form");
const editUserForm = document.getElementById("edit-user-form");
const nameInput = document.getElementById("name");
const usernameInput = document.getElementById("username");
const deleteButton = document.querySelectorAll(".delete-btn");
const editButton = document.querySelectorAll(".edit-btn");
// let pond = FilePond.create(document.querySelector(".filepond"));
import pond from '../fileUpload'


addUserForm.addEventListener("submit", async (e) => {
e.preventDefault();
  let user = {};

  var data = new FormData(addUserForm);

  for (let [key, value] of data) {
    user[key] = value;
  }

  let pondImages = pond.getFile();

  if (!user.name || !user.username || pondImages.length === 0) return;


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

