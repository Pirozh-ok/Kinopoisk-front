Vue.component('input-email', {
    data: function () {
        return {
            input: null,
        }
    },
    props:
        ['maxLen', 'minLen'],
    methods: {
        validate(){
            if(this.maxLen < this.input.length){

            }
            if(this.minLen > this.input.length){

            }
        }
    },
    template: ''
})