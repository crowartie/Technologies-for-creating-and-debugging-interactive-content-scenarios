Vue.createApp({
    data() {
        return {
            valueInput: '',
            arrNoCompleteTasks: [],
            arrCompleteTasks: []
        };
    },
    methods: {
        handlerInput(e) {
            this.valueInput = e.target.value;
        },
        addTask() {
            if (this.valueInput === '') {
                return
            };
            this.arrNoCompleteTasks.push({
                title: this.valueInput,
                id: Math.random()
            });
            this.valueInput = ''
        },
        doCheck(index, type) {
            if (type === 'need') {
                const completeMask = this.arrNoCompleteTasks.splice(index, 1);
                this.arrCompleteTasks.push(...completeMask)

            } else {
                const noCompleteMask = this.arrCompleteTasks.splice(index, 1);
                this.arrNoCompleteTasks.push(...noCompleteMask)

            }
        },
        removeMask(index, type) {
            const toDoList = type === 'need' ? this.arrNoCompleteTasks : this.arrCompleteTasks;
            toDoList.splice(index, 1)

        },

    },

}).mount('#app');
