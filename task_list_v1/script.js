(function() {
    // ---------- МОДЕЛЬ ДАННЫХ ----------
    let tasks = [];            // массив объектов { id, text, completed }
    let currentFilter = 'all';   // 'all', 'active', 'completed'
    let currentSort = 'default';  // 'default', 'alpha-asc', 'alpha-desc', 'status'

    // DOM элементы
    const todoListEl = document.getElementById('todoList');
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const clearAllBtn = document.getElementById('clearAllBtn');

    // Вспомогательные функции для LocalStorage
    function saveToLocalStorage() {
        localStorage.setItem('todoAppTasks', JSON.stringify(tasks));
    }

    function loadFromLocalStorage() {
        const stored = localStorage.getItem('todoAppTasks');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    tasks = parsed;
                    return true;
                }
            } catch(e) { console.warn(e); }
        }
        return false;
    }

    // Инициализация демо-задач (при отсутствии данных)
    function initDefaultTasks() {
        tasks = [
            { id: Date.now() + 101, text: "Почесать кошку", completed: false },
            { id: Date.now() + 102, text: "Полить картошку", completed: false },
            { id: Date.now() + 103, text: "Сложить в лукошко", completed: false }
        ];
        saveToLocalStorage();
    }

    // ---------- ФИЛЬТРАЦИЯ + СОРТИРОВКА ----------
    function getFilteredAndSortedTasks() {
        let filtered = [...tasks];
        if (currentFilter === 'active') {
            filtered = filtered.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filtered = filtered.filter(task => task.completed);
        }
        if (currentSort === 'alpha-asc') {
            filtered.sort((a, b) => a.text.localeCompare(b.text, 'ru', { sensitivity: 'base' }));
        } else if (currentSort === 'alpha-desc') {
            filtered.sort((a, b) => b.text.localeCompare(a.text, 'ru', { sensitivity: 'base' }));
        } else if (currentSort === 'status') {
            filtered.sort((a, b) => {
                if (a.completed === b.completed) return 0;
                return a.completed ? 1 : -1;
            });
        } else {
            filtered.sort((a, b) => a.id - b.id);
        }
        return filtered;
    }

    // ---------- ОТРИСОВКА СПИСКА ----------
    function renderTodoList() {
        const itemsToRender = getFilteredAndSortedTasks();
        todoListEl.innerHTML = '';

        if (itemsToRender.length === 0) return;

        itemsToRender.forEach(task => {
            const li = document.createElement('li');
            if (task.completed) li.classList.add('completed');
            li.setAttribute('data-id', task.id);

            const itemDiv = document.createElement('div');
            itemDiv.className = 'item-content';

            const label = document.createElement('label');
            label.style.width = '90%';
            label.style.display = 'flex';
            label.style.alignItems = 'center';
            label.style.gap = '12px';
            label.style.cursor = 'pointer';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.classList.add('task-checkbox');

            const span = document.createElement('span');
            span.textContent = task.text;
            span.style.flex = '1';

            label.appendChild(checkbox);
            label.appendChild(span);

            const delBtn = document.createElement('button');
            delBtn.textContent = '✘';
            delBtn.classList.add('delete-btn');

            itemDiv.appendChild(label);
            itemDiv.appendChild(delBtn);
            li.appendChild(itemDiv);
            todoListEl.appendChild(li);
        });
    }

    function refreshApp() {
        saveToLocalStorage();
        renderTodoList();
        updateButtonsActiveState();
    }

    function updateButtonsActiveState() {
        document.querySelectorAll('.filter-group button').forEach(btn => {
            const filterVal = btn.getAttribute('data-filter');
            if (filterVal === currentFilter) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        document.querySelectorAll('.sort-group button').forEach(btn => {
            const sortVal = btn.getAttribute('data-sort');
            if (sortVal === currentSort) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }

    // ---------- ОПЕРАЦИИ С ЗАДАЧАМИ ----------
    function addTask(text) {
        const trimmedText = text.trim();
        if (trimmedText === "") {
            taskInput.placeholder = "Введите текст задачи!";
            taskInput.style.border = "2px solid #ff8866";
            setTimeout(() => {
                taskInput.style.border = "";
                taskInput.placeholder = "Новый элемент списка";
            }, 1200);
            return false;
        }
        const newTask = {
            id: Date.now(),
            text: trimmedText,
            completed: false
        };
        tasks.push(newTask);
        refreshApp();
        taskInput.value = "";
        taskInput.focus();
        return true;
    }

    function deleteTaskById(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        refreshApp();
    }

    function toggleComplete(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            refreshApp();
        }
    }

    function clearAllTasks() {
        if (tasks.length === 0) return;
        if (confirm("❗ Удалить все дела без возможности восстановления?")) {
            tasks = [];
            refreshApp();
        }
    }

    // ---------- ОБРАБОТЧИКИ СОБЫТИЙ (делегирование) ----------
    todoListEl.addEventListener('click', (e) => {
        const deleteButton = e.target.closest('.delete-btn');
        if (deleteButton) {
            const liElement = deleteButton.closest('li');
            if (liElement && liElement.dataset.id) {
                deleteTaskById(parseInt(liElement.dataset.id));
            }
            e.preventDefault();
            return;
        }
        const checkbox = e.target.closest('.task-checkbox');
        if (checkbox) {
            const li = checkbox.closest('li');
            if (li && li.dataset.id) {
                toggleComplete(parseInt(li.dataset.id));
            }
            e.preventDefault();
        }
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
    });

    clearAllBtn.addEventListener('click', () => {
        clearAllTasks();
    });

    document.querySelectorAll('.filter-group button').forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');
            if (filterValue === 'all') currentFilter = 'all';
            else if (filterValue === 'active') currentFilter = 'active';
            else if (filterValue === 'completed') currentFilter = 'completed';
            renderTodoList();
            updateButtonsActiveState();
        });
    });

    document.querySelectorAll('.sort-group button').forEach(btn => {
        btn.addEventListener('click', () => {
            const sortValue = btn.getAttribute('data-sort');
            if (sortValue === 'default') currentSort = 'default';
            else if (sortValue === 'alpha-asc') currentSort = 'alpha-asc';
            else if (sortValue === 'alpha-desc') currentSort = 'alpha-desc';
            else if (sortValue === 'status') currentSort = 'status';
            renderTodoList();
            updateButtonsActiveState();
        });
    });

    // ---------- ИНИЦИАЛИЗАЦИЯ ----------
    function init() {
        const hasData = loadFromLocalStorage();
        if (!hasData || tasks.length === 0) {
            initDefaultTasks();
        }
        tasks = tasks.filter(t => t && typeof t.id === 'number' && typeof t.text === 'string');
        currentFilter = 'all';
        currentSort = 'default';
        saveToLocalStorage();
        renderTodoList();
        updateButtonsActiveState();

        taskInput.addEventListener('focus', () => {
            taskInput.style.border = "";
            taskInput.placeholder = "Новый элемент списка";
        });
    }

    init();
})();