
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



  
document.getElementById("sign-in-form").addEventListener("submit", async(e) => {
    e.preventDefault()
    let email = document.getElementById("email").value ;
    let password =document.getElementById("password").value;
    let user_data;
    try{
        await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log("Sign in successful")
    }
    catch(error){console.log(error.message)}
    
    const userId = await firebase.auth().currentUser.uid;
    await firebase.firestore().collection("users").doc(userId).get().then(async (doc)=>{
        user_data = await doc.data()
        if (user_data.role =="teacher"){
            window.location.href = "./Teacher/Classes.html"
        } 
        if (user_data.role =="student"){
            window.location.href = "./Student/Classes.html"
        } 
    })
})