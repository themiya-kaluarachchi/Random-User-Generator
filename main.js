const usersContainer = document.getElementById('usersContainer');
const searchInput = document.getElementById('searchInput');
const loadUsersButton = document.getElementById('loadUsers');

let allUsers = [];

loadUsersButton.addEventListener('click', () =>
{
  fetch('https://randomuser.me/api/?results=10').then(res => res.json()).then(data => 
  {
    allUsers = data.results;
    displayUsers(allUsers);
  }).catch(err => 
  {
    usersContainer.innerHTML = '<p>Error loading users.</p>';
    console.error(err);
  });
});

searchInput.addEventListener('input', () =>
{
  const searchTerm = searchInput.value.toLowerCase();
  const filteredUsers = allUsers.filter(user =>
    `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchTerm) || user.location.country.toLowerCase().includes(searchTerm)
  );
  displayUsers(filteredUsers);
});

function displayUsers(users)
{
  usersContainer.innerHTML = '';

  if(users.length === 0)
  {
    usersContainer.innerHTML = '<p>No users found.</p>';
    return;
  }

  users.forEach(user => 
  {
    const userCard = document.createElement('div');
    userCard.className = 'user-card';
    userCard.innerHTML = 
    `
      <img src="${user.picture.medium}" alt="User Image">
      <h3>${user.name.first} ${user.name.last}</h3>
      <p>${user.email}</p>
      <p>${user.location.country}</p>
    `;
    usersContainer.appendChild(userCard);
  });
}