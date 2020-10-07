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
  
document.getElementById("sign-up-form").addEventListener("submit", async (e)=>{
    e.preventDefault()
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let confirmPassword = document.getElementById("confirmPassword").value
    let role = document.getElementById("role").value
    let teacher_name = document.getElementById("teacher-name").value
    if (password == confirmPassword){
        try{
            await firebase.auth().createUserWithEmailAndPassword(email,password)
            console.log("Sign up successful")
        }
        catch(error){console.log(error.message)}

        const userId = await firebase.auth().currentUser.uid;

        await firebase.firestore().doc("users/" + userId).set({
            email: email,
            password: password,
            role: role,
            teacher_name: teacher_name,
        })
        if (role == "teacher"){
            alert("Sign-up succesful. ")
            window.location.href = "./Teacher/Classes.html"
        }
        if (role == "student"){
            alert("Sign-up succesful. ")
            window.location.href = "./Student/Classes.html"
        }
    } 
})


