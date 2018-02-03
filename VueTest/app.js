window.addEventListener('DOMContentLoaded', () => {

    // Component定義
    Vue.component('task-card', {
        props: ['task'],
        template: `<div class="card">
        <div class="card-content">
          {{ task.name }}
        </div>
        <footer class="card-footer">
          <div class="card-footer-item">
            {{ task.assignee }}
          </div>
          <div class="card-footer-item">
            {{ task.mandays }} 人日
          </div>
        </footer>
        <footer class="card-footer">
          <a class="card-footer-item" v-on:click="decrementStatus(task)">◀︎</a>
          <a class="card-footer-item" v-on:click="incrementStatus(task)">▶︎</a>
        </footer>
        </div>`,
        methods: {
            // Component内で使用しているため、VueインスタンスではなくComponetに定義する
            incrementStatus: function(task) {
                if(1 <= task.status && task.status <= 2) {
                    task.status++;
                }
            },
            decrementStatus: function(task) {
                if(2 <= task.status && task.status <= 3) {
                    task.status--;
                }
            }
        }
    });

    // Vueインスタンス生成
    new Vue({
        el: '#board',
        data: {
          tasks: [
            { name: 'task 1', status: 1, assignee: '🐱', mandays: 3 },
            { name: 'task 2', status: 1, assignee: '🐶', mandays: 2 },
            { name: 'task 3', status: 2, assignee: '🐱', mandays: 1 },
            { name: 'task 4', status: 3, assignee: '🐹', mandays: 1 }
          ],
          newTaskName: '',
          newTaskAssignee: '',
          newTaskMandays: 0
        },
        computed: {
            // 未対応のtaskを定義する
            tasksOpen: function(tasks) {
                return this.tasks.filter(task => {
                    return task.status === 1;
                })
            },
            // 対応中のtaskを定義する
            tasksDoing: function(tasks) {
                return this.tasks.filter(task => {
                    return task.status === 2;
                })
            },
            // 完了のtaskを定義する
            tasksClosed: function(tasks) {
                return this.tasks.filter(task => {
                    return task.status === 3;
                })
            }
        },
        methods: {
            // taskを追加する
            addTask: function() {
                this.tasks.push({ 
                    name: this.newTaskName, 
                    status: 1, // 未対応
                    assignee: this.newTaskAssignee, 
                    mandays: this.newTaskMandays 
                });
            }
        }
    });

});
