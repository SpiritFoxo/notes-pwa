const input = document.getElementById('noteInput');
const addBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');
const offlineStatus = document.getElementById('offlineStatus');

function getNotes() {
  return JSON.parse(localStorage.getItem('notes') || '[]');
}

function saveNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
  const notes = getNotes();
  notesList.innerHTML = '';
  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.className = 'note-item';
    li.textContent = note;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Удалить';
    delBtn.onclick = () => {
      const newNotes = getNotes();
      newNotes.splice(index, 1);
      saveNotes(newNotes);
      renderNotes();
    };
    li.appendChild(delBtn);
    notesList.appendChild(li);
  });
}

addBtn.onclick = () => {
  const notes = getNotes();
  const text = input.value.trim();
  if (text) {
    notes.push(text);
    saveNotes(notes);
    input.value = '';
    renderNotes();
  }
};

window.addEventListener('online', () => offlineStatus.hidden = true);
window.addEventListener('offline', () => offlineStatus.hidden = false);
if (!navigator.onLine) offlineStatus.hidden = false;

renderNotes();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
