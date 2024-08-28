document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskDescription = document.getElementById('taskDescription');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    function createTaskElement(taskText, descriptionText, isPinned) {
        const li = document.createElement('li');
        if (isPinned) li.classList.add('pinned');

        const taskContent = document.createElement('div');
        taskContent.classList.add('task-content');

        const taskTitle = document.createElement('span');
        taskTitle.textContent = taskText;

        const desc = document.createElement('div');
        desc.classList.add('description');
        desc.textContent = descriptionText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Sil';
        removeBtn.classList.add('remove');
        removeBtn.onclick = () => li.remove();

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Düzenle';
        editBtn.classList.add('edit');
        editBtn.onclick = () => {
            taskInput.value = taskText;
            taskDescription.value = descriptionText;
            li.remove();
        };

        const pinIcon = document.createElement('div');
        pinIcon.textContent = '📌';
        pinIcon.classList.add('pin-icon');
        pinIcon.onclick = (e) => {
            e.stopPropagation(); // Tıklamayı tamamlanma kontrolünden ayırmak için
            if (li.classList.contains('pinned')) {
                li.classList.remove('pinned');
            } else {
                li.classList.add('pinned');
            }
            sortTasks();
        };

        taskContent.appendChild(taskTitle);
        if (descriptionText) taskContent.appendChild(desc);
        li.appendChild(taskContent);
        li.appendChild(removeBtn);
        li.appendChild(editBtn);
        li.appendChild(pinIcon);

        li.onclick = () => {
            if (!li.classList.contains('pinned')) {
                li.classList.toggle('completed');
            }
        };

        return li;
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        const descriptionText = taskDescription.value.trim();
        if (taskText === '') return;

        const isPinned = false; // Yeni eklenen görevler varsayılan olarak önemli değil
        const taskElement = createTaskElement(taskText, descriptionText, isPinned);
        taskList.insertBefore(taskElement, taskList.firstChild);
        taskInput.value = '';
        taskDescription.value = '';
    }

    function sortTasks() {
        const tasks = Array.from(taskList.children);
        const pinnedTasks = tasks.filter(task => task.classList.contains('pinned'));
        const nonPinnedTasks = tasks.filter(task => !task.classList.contains('pinned'));

        taskList.innerHTML = '';
        pinnedTasks.forEach(task => taskList.appendChild(task));
        nonPinnedTasks.forEach(task => taskList.appendChild(task));
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
});
