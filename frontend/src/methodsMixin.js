export var methodsMixin = {
    methods:{
        toggleRegisterPage(){
            this.$store.state.registerPage = !this.$store.state.registerPage
        }
    }
}