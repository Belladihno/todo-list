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
    editButton.onclick = () => edit(li, editButton, saveButton);
    Task.appendChild(editButton);

    saveButton.innerHTML = 'Save';
    saveButton.onclick = () => saveTask(li, editButton, saveButton);
    saveButton.id = 'save';
    saveButton.style.backgroundColor = 'green';
    saveButton.style.display = 'none'
    Task.appendChild(saveButton)

    span.innerHTML = '\u00d7';
    span.className = 'delete';
    span.onclick = () => li.remove();
    Task.appendChild(span);
    
    li.appendChild(Task);
  }
  inputBox.value = '';
  saveData()
};
const edit = (li, editButton, saveButton) => {
  const originalText = li.firstChild.textContent;
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = originalText;
  editInput.style.display = 'inline';

  li.firstChild.replaceWith(editInput);

  editButton.style.display = 'none';
  saveButton.style.display = 'inline-block';
  saveData()
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

listContainer.addEventListener(
  'click',
  (e, li) => {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked');
      saveData()
    } else if (e.target.tagName === 'SPAN') {
      e.target.parentElement.parentElement.remove();
      saveData()
    } 
    
  },
  false
);  

const saveData = () => {
  localStorage.setItem('data', listContainer.innerHTML);
};

const showTask = () => {
  listContainer.innerHTML = localStorage.getItem('data');
};
showTask()

button.addEventListener('click', addTask);
