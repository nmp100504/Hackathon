
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



function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
//  console.log(makeid(6));

 document.getElementById("create-class-form").addEventListener("submit", async (e)=>{
    e.preventDefault()
    let class_name = document.getElementById("class-name").value
    let subject_name = document.getElementById("subject-name").value
    let exits = true
    // let class_id = makeid(6)
    let class_id;
    while (exits){
        class_id = makeid(6)
        await firebase.firestore().collection("classes").doc(class_id).get().then(async (doc)=>{
            exits = doc.exits
        })
    }
    await firebase.firestore().doc("classes/" + class_id).set({
        class_name: class_name,
        subject_name: subject_name,
        class_id: class_id,
        teacher_id: firebase.auth().currentUser.uid
    })
    await firebase.firestore().doc("users/" +  firebase.auth().currentUser.uid ).update({
        classes: firebase.firestore.FieldValue.arrayUnion(class_id)
    });

    document.getElementById("class-password").innerHTML = class_id
})



document.getElementById("home").addEventListener("click" , (e)=>{
    window.location.href = "classes.html"
})