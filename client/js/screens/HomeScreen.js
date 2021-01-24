import axios from 'axios';
import { getUsers, deleteUser, createUser} from '../api'
import userTable from '../userTable.hbs'
import userForm from '../userForm.hbs'
import FilePond from '../fileUpload'


const HomeScreen = {
   after_render: () => {
        let pond = FilePond.create(document.querySelector(".filepond"));
        const addUserForm = document.getElementById("add-user-form");
        const nameInput = document.getElementById("name");
        const usernameInput = document.getElementById("username");
        const deleteButton = document.querySelectorAll(".delete-btn");
        const editButton = document.querySelectorAll(".edit-btn");

        addUserForm.addEventListener("submit", async (e) => {
			e.preventDefault();
			  let user = {};

			  var data = new FormData(addUserForm);

			  for (let [key, value] of data) {
			    user[key] = value;
			  }

			  let pondImages = pond.getFiles();

			  if (!user.name || !user.username || !user.profileImage) return;
			  console.log('user', user)

			  pond.removeFile();
			  nameInput.value = "";
			  usernameInput.value = "";
			  const response = await createUser(user)
              console.log(response)
	})

      for (let i = 0; i < deleteButton.length; i++) {
          deleteButton[i].addEventListener("click", async (e) => {
          console.log('deleteButton')
          e.preventDefault();
          await deleteUser(deleteButton[i].id)
  });

  }
},
  render: async () => {
    const users = await getUsers();
    console.log('users', users)
    // if (users.error) {
    //   return `<div class="error">${users.error}</div>`;
    // }

    return `
     <div class="row">
    	<div class="col col-lg my-4">
    		<div class="user-form-container">
    			${userForm()}
        	</div>
        </div>

        <div class="col col-lg my-4">
          <div class="table-container">
    			${userTable(users.data)}
          </div>
        </div>
    </div>
      `
  }
};

export default HomeScreen;