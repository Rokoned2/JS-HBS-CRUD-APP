import userTable from './userTable.hbs'
import userForm from './userForm.hbs'
import fileUpload from './fileUpload'
import * as FilePond from 'filepond';
import 'filepond/dist/filepond.min.css';
let pond = FilePond.create(document.querySelector(".filepond"));


    const getUsers = async function() {
      let data = await fetch("http://localhost:5000/api/users")
     let response = await data.json()

      generateAllUsersHTML(response)
      generateUserForm()
      console.log('se ejecuta')
    }
    getUsers()


  window.addEventListener('hashchange', function() {
	render(decodeURI(window.location.hash));
  })

	function render(url) {
console.log('llega a render')

        // Get the keyword from the url.
        var temp = url.split('/')[0];

        // Hide whatever page is currently shown.
        document.querySelector('.container .page').classList.remove('visible');

        var map = {

            // The Homepage.
            '': function() {

                // Show all the products
                renderUsersPage(users);
            }

            // Single Products page.
            // '#product': function() {

            //     // Get the index of which product we want to show and call the appropriate function.
            //     var index = url.split('#product/')[1].trim();

            //     renderSingleProductPage(index, products);
            // }
        };

        // Execute the needed function depending on the url keyword (stored in temp).
        if(map[temp]){
            map[temp]();
        }
        // If the keyword isn't listed in the above - render the error page.
        else {
            renderErrorPage();
        }

    }

    function renderUsersPage(data){
      console.log('llega a renderUsersPage')
      var page = document.querySelector('.row'),
      allUsers = document.querySelector('.row .table-container > td');

      // Hide all the products in the products list.
      allUsers.classList.add('hidden');

      // Iterate over all of the products.
      // If their ID is somewhere in the data object remove the hidden class to reveal them.

      for (let i = 0; i < allUsers.length; i++) {
        allUsers[i].forEach(function () {
          data.forEach(function (item) {
            if(data[i] == item.id){
              allUsers[i].removeClass('hidden');
            }
          });
        })
      };

      // Show the page itself.
      // (the render function hides all pages so we need to show the one we want).
      page.addClass('visible');
  }

    function generateAllUsersHTML(data){
    const tableContainer = document.querySelector('.table-container')

    //Compile the template​
    tableContainer.innerHTML = userTable(data) 
}

	function generateUserForm(data){
		const userFormContainer = document.querySelector('.user-form-container')
    	userFormContainer.innerHTML = userForm(data) 
	}




    // Each products has a data-index attribute.
    // On click change the url hash to open up a preview for this product only.
    // Remember: every hashchange triggers the render function.
    // list.find('li').on('click', function (e) {
    //   e.preventDefault();

    //   var productIndex = $(this).data('index');

    //   window.location.hash = 'product/' + userIndex;
    // })
  // }


  // function renderPage(data){

  //   var page = document.querySelector('.all-products'),
  //     allProducts = document.querySelector('.all-products .products-list > li');

  //   // Hide all the products in the products list.
  //   allProducts.addClass('hidden');

  //   // Iterate over all of the products.
  //   // If their ID is somewhere in the data object remove the hidden class to reveal them.
  //   allProducts.each(function () {

  //     var that = $(this);

  //     data.forEach(function (item) {
  //       if(that.data('index') == item.id){
  //         that.removeClass('hidden');
  //       }
  //     });
  //   });

  //   // Show the page itself.
  //   // (the render function hides all pages so we need to show the one we want).
  //   page.addClass('visible');

  // }
