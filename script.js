const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const button = document.querySelector('button');
const addTask = () => {
  if (inputBox.value === '') {
    alert('You must write something');
  } else {
    const li = document.createElement('li');
    const taskText = document.createElement('span')
    taskText.innerHTML = inputBox.value; 
    li.appendChild(taskText)
    listContainer.appendChild(li);
    
    const Task = document.createElement('div');
    const editButton = document.createElement('button');
    const span = document.createElement('span');
    const saveButton = document.createElement('button');

    editButton.innerHTML = 'Edit';
    editButton.addEventListener('click', () => edit(li, editButton, saveButton));
    Task.appendChild(editButton);

    saveButton.innerHTML = 'Save';
    saveButton.addEventListener('click', () => saveTask(li, editButton, saveButton));
    saveButton.id = 'save';
    saveButton.style.backgroundColor = 'green';
    saveButton.style.display = 'none'
    Task.appendChild(saveButton)

    span.innerHTML = '\u00d7';
    span.className = 'delete';
    span.addEventListener('click', () =>{
      li.remove();
      saveData();
    });
    Task.appendChild(span);
    
    li.appendChild(Task);
  }
  inputBox.value = '';
  saveData();
}
const edit = (li, editButton, saveButton) => {
  const originalText = li.firstChild.textContent;
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = originalText;
  editInput.style.display = 'inline';
  li.firstChild.replaceWith(editInput);

  editButton.style.display = 'none';
  saveButton.style.display = 'inline-block';
  // saveData()
};
const saveTask = (li, editButton, saveButton) => {
  const editInput = li.firstChild;
  const updatedText = document.createElement('span');
  updatedText.textContent = editInput.value;
  updatedText.className = 'updatedText'
  updatedText.style.display ='inline'
  
  li.firstChild.replaceWith(updatedText);
  editButton.style.display = 'inline-block';
  saveButton.style.display ='none';
  saveData()
}

const saveData = () => {
  localStorage.setItem('data', listContainer.innerHTML);
};

const showTask = () => {
  listContainer.innerHTML = localStorage.getItem('data');

  document.querySelectorAll('li').forEach((li) => {
    const editButton = li.querySelector('button:nth-of-type(1)');
    const saveButton = li.querySelector('button:nth-of-type(2)');
    const deleteButton = li.querySelector('span.delete');

    if (editButton) {
      editButton.addEventListener('click', () => edit(li, editButton, saveButton));
    }
    
    if (saveButton) {
      saveButton.addEventListener('click', () => saveTask(li, editButton, saveButton));
    }

    if (deleteButton) {
      deleteButton.addEventListener('click', () => {
        li.remove();
        saveData();
      });
    }
  });
};
showTask()

listContainer.addEventListener(
  'click',
  (e, li) => {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked');
      saveData()
    } 
    else if (e.target.className === 'delete') {
      e.target.parentElement.parentElement.remove();
      saveData()
    } 
    
  },
  false
); 

button.addEventListener('click', addTask);