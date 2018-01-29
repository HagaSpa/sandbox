window.addEventListener('DOMContentLoaded', () => {
    new Vue({
        el: '#board',
        data: {
          tasks: [
            { name: 'task 1', status: 1, assignee: '🐱', mandays: 3 },
            { name: 'task 2', status: 1, assignee: '🐶', mandays: 2 },
            { name: 'task 3', status: 2, assignee: '🐱', mandays: 1 },
            { name: 'task 4', status: 3, assignee: '🐹', mandays: 1 }
          ]
        }
    })
});
