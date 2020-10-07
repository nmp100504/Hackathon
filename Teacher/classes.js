
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
                let class_data;
                let content = document.getElementById("class-container")
                if (data != undefined){
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
                          <span id="class_id" class="number-of-students">Class's ID: ${class_id}</span>
                          <button type="submit" id="enter-class" class="fas fa-door-open"  ></button>
                          </div>
                      
                      </div>
                      `
                      content.insertAdjacentHTML("afterend", classHTML)
                      document.getElementById("enter-class").addEventListener("click", (e)=>{
                        let a = e.target.parentNode.children.class_id.innerHTML
                        let lastSix = a.substr(a.length - 6); // => "Tabs1"
                        localStorage.setItem("chosen_class_id", lastSix)
                        window.location.href = "students.html"
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