document.querySelector('#add-button').addEventListener('click', addblog);
// document.querySelector('.deletebutton').addEventListener('click', delButtonHandler);
const deleteButtons = document.querySelectorAll('.deletebutton');
deleteButtons.forEach(deleteButton => {
  deleteButton.addEventListener('click', delButtonHandler);
});

// const userid = document.querySelector('#password').value.trim();;


async function addblog(event) {
  event.preventDefault();
  const blogcontent= document.querySelector("#blogcontent").value.trim();
  const response = await fetch(`/api/userblog`, {
    method: 'POST',
    body: JSON.stringify({
      blogcontent
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // console.log(response)
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed');
  }
}

async function delButtonHandler(event){
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(id);
    console.log("test");
    const response = await fetch(`/api/userblog/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }
};