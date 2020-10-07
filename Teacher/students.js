
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



let data

    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            firebase.firestore().doc("users/" + user.uid).get().then(async (doc)=>{
                data = await doc.data().classes;
                let lastSix = localStorage.getItem("chosen_class_id")
                for (let y=0; y< doc.data().classes.length; y++){
                  if (doc.data().classes[y] == lastSix){
                    let student_data;
                    let content = document.getElementById("student-page-main")
                    firebase.firestore().doc("classes/"+lastSix).get().then(async (doc)=>{
                      student_data = await doc.data()
                      let student_id = student_data.student_id
                      let student_users_data
                      firebase.firestore().doc("users/"+ student_id).get().then(async (doc2)=>{
                        student_users_data = await doc2.data()
                        if(student_users_data!= undefined){
                          let student_name = student_users_data.teacher_name
                          let studentHTML =`
                          <div class="student-info">
                            <div class="student-name">${student_name}</div>
                            <div class="hw-status">Tình trạng bài tập về nhà <button type="submit" id="btn-assignment-status" class="fas fa-eye"></button></div>
                          
                          </div>
                          `
                          content.insertAdjacentHTML("beforeend", studentHTML)
                          document.getElementById("btn-assignment-status").addEventListener("click", (e)=>{
                            // let a = e.target.parentNode.children.class_id.innerHTML
                            // let lastSix = a.substr(a.length - 6); // => "Tabs1"
                            // localStorage.setItem("chosen_class_id", lastSix)
                            // window.location.href = "students.html"
                            let b = e.target.parentNode.parentNode.children[0].innerHTML ;
                            localStorage.setItem("chosen_student_id", b)
                            window.location.href ="studentAssignments.html"
                          })
                        }
                      })
                    })
                  }
                }
            });
        }
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