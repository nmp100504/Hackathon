
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
  firebase.initializeApp(firebaseConfig);

document.getElementById("btn-sign-out").addEventListener("click",(e)=>{
  firebase.auth().signOut().then(function() {
    alert("Sign-out succesful. ")
    window.location.href = "index.html"
  }).catch(function(error) {
  });
  
})

document.getElementById("btn-home").addEventListener("click",(e)=>{
    let user_id = localStorage.getItem("user_id")
    let user_data
    firebase.firestore().doc("users/"+user_id).get().then(async (doc)=>{
        user_data = doc.data()
        if (user_data.role =="teacher"){
            window.location.href = "./Teacher/Classes.html"
        } 
        if (user_data.role =="student"){
            window.location.href = "./Student/Classes.html"
        } 
    })
})


document.getElementById("btn-about-us").addEventListener("click",(e)=>{
  window.location.href = "../about_us.html"
})