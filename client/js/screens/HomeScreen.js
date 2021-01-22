import axios from 'axios';
import { getUsers } from '../api'
import userTable from '../userTable.hbs'
import userForm from '../userForm.hbs'

const HomeScreen = {
   after_render: () => {
let pond = FilePond.create(document.querySelector(".filepond"));
const addUserForm = document.getElementById("add-user-form");
      addUserForm.addEventListener("submit", async (e) => {
			e.preventDefault();
			console.log('add user form')

			  let user = {};

			  var data = new FormData(addUserForm);

			  for (let [key, value] of data) {
			    user[key] = value;
			  }

			  let pondImages = pond.getFiles();
			  console.log('user', user)

			  if (!user.name || !user.username || pondImages.length === 0) return;
			  console.log('user', user)

			  pond.removeFile();
			  nameInput.value = "";
			  usernameInput.value = "";
			  let response = await fetch("/", {
			    method: "POST",
			    headers: { "Content-Type": "application/x-www-form-urlencoded" },
			    body: urlencodeFormData(data),
			  });
	})
  
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

    // <ul class="products">
    //   products
    //     .map(
    //       (product) => `
    //   <li>
    //     <div class="product">
    //       <a href="/#/product/${product._id}">
    //         <img src="${product.image}" alt="${product.name}" />
    //       </a>
    //     <div class="product-name">
    //       <a href="/#/product/1">
    //         ${product.name}
    //       </a>
    //     </div>
    //     <div class="product-rating">
    //       ${Rating.render({
    //         value: product.rating,
    //         text: `${product.numReviews} reviews`,
    //       })}
    //     </div>
    //     <div class="product-brand">
    //       ${product.brand}
    //     </div>
    //     <div class="product-price">
    //       $${product.price}
    //     </div>
    //     </div>
    //   </li>
    //   `
    //     )
    //     .join('\n')}
    // `;
  },
};
export default HomeScreen;