
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCZCatQDXAdHCU3dlz3RKGDITpgSR3DJ34",
    authDomain: "e-assignment-7be46.firebaseapp.com",
    databaseURL: "https://e-assignment-7be46.firebaseio.com",
    projectId: "e-assignment-7be46",
    storageBucket: "e-assignment-7be46.appspot.com",
    messagingSenderId: "801562777807",
    appId: "1:801562777807:web:6aad891c7036789bcebfba",
    measurementId: "G-1DR884VXVW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

document.addEventListener("click",(e)=>{
    if (e.target.className == "btn-add-question, fas fa-plus"){
        let container =  e.target.parentNode;
        const answer_box = `
        <div class="answer-choice">
            <input type="checkbox">
            <input class="answer-input" type="text" placeholder="Answer: ">
            <button class="btn-remove-answer, fas fa-trash-alt"></button>
        </div>
        `
        container.innerHTML += answer_box
    }
})

document.addEventListener("click", (e)=>{
    if (e.target.className =="btn-remove-answer, fas fa-trash-alt"){
        e.target.parentNode.parentNode.remove();
        e.target.parentNode.remove();
    }
})

document.getElementById("btn-add-question").addEventListener("click", (e)=>{
    e.preventDefault()
    let content = document.getElementById("answer-root")
    examBoxHTML=`  
    <div class ="answer-container">
        <button id="add-answer" class="btn-add-question, fas fa-plus"> Add answer</button>
        
        <div>
            <input class ="question-input" type="text" name="question" placeholder="Question:">
            <button class="btn-remove-answer, fas fa-trash-alt"></button>
        </div>    
        <div class="answer-box">
            <div class="answer-choice">
                <input type="checkbox">
                <input class="answer-input" type="text" placeholder="Answer: ">
                <button class="btn-remove-answer, fas fa-trash-alt"></button>
            </div>
        </div>
    </div>`
    content.insertAdjacentHTML("beforeend", examBoxHTML)
})

document.getElementById("btn-submit-exam").addEventListener("click", (e)=>{
    let exam_data = document.getElementsByClassName("answer-container")
    console.log(exam_data)

})

document.getElementById("btn-sign-out").addEventListener("click",(e)=>{
  firebase.auth().signOut().then(function() {
    alert("Sign-out succesful. ")
    window.location.href = "../index.html"
  }).catch(function(error) {
  });
  
})

document.getElementById("btn-home").addEventListener("click",(e)=>{
  window.location.href = "classes.html"
})


document.getElementById("btn-about-us").addEventListener("click",(e)=>{
    localStorage.setItem("user_id", firebase.auth().currentUser.uid)
    window.location.href = "../about_us.html"
})