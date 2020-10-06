
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

document.getElementById("btn-create-class").addEventListener("click",(e)=>{
  window.location.href = "createClass.html"
})

let data

    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            firebase.firestore().doc("users/" + user.uid).get().then(async (doc)=>{
                data = await doc.data().classes;
                console.log(doc.data().classes)
                let class_data;
                let content = document.getElementById("class-container")
                for (let i = 0; i < data.length; i++ ){
                  firebase.firestore().doc("classes/" + data[i]).get().then(async (doc2)=>{
                    class_data = await doc2.data()
                    let subject_name = class_data.subject_name
                    let class_id = class_data.class_id
                    let class_name = class_data.class_name
                    let teacher_name = doc.data().teacher_name
                    let classHTML =`
                    <div class="class-info">
                      <div class="class-name">${class_name}</div>
                      <div class="teacher">Giáo viên phụ trách: ${teacher_name}</div>
                      <div>
                        <span class="subject">Môn: ${subject_name}</span>
                        <span class="number-of-students">Class's ID: ${class_id}</span>
                      </div>
                    </div>
                    `
                    content.insertAdjacentHTML("afterend", classHTML)
                  })
                }
            });
        }
    })
    


