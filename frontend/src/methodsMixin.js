export var methodsMixin = {
    methods:{
        toggleRegisterPage(){
            this.$store.state.registerPage = !this.$store.state.registerPage
        },
        focusEvent(i){
            document.querySelectorAll(".custom-input")[i].style.borderBottom = "2px solid #1da1f2"
            document.querySelectorAll(".custom-input div")[i].style.color = "#1da1f2"
        },
        focusOutEvent(i){
            document.querySelectorAll(".custom-input")[i].style.borderBottom = "2px solid #5b7083"
            document.querySelectorAll(".custom-input div")[i].style.color = ""
        },
        loginUser(){
            this.$store.state.userId = "sdfsadfas"
            this.$router.push({path:"/home"})
        },
        sampleAction(obj){
            console.log("a action from mixin")
            console.log(`parametr in mixin: ${obj}`)
        },
        toggleAddTweetPopup(){
            this.$store.state.addTweetPopup = !this.$store.state.addTweetPopup
        }
    }
}