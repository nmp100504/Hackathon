
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
            let class_data;
            let content = document.getElementById("btn-join-class")
            if (typeof(data) == "string"){
              // for (let i = 0; i < data.length; i++ ){
                firebase.firestore().doc("classes/" + data).get().then(async (doc2)=>{
                  class_data = await doc2.data()
                  console.log(class_data)
                  let subject_name = class_data.subject_name
                  let class_id = class_data.class_id
                  let class_name = class_data.class_name
                  let teacher_name = doc.data().teacher_name
                  let classHTML =`
                  <div class="class-info">
                    <div class="class-name">${class_name}</div>
                    <div class="teacher">Teacher: ${teacher_name}</div>
                    <div>
                      <span class="subject">Subject: ${subject_name}</span>
                      <span class="number-of-students">Class's ID: ${class_id}</span>
                      <button type="submit" id="enter-class" class="fas fa-door-open"  ></button>
                    </div>
                  </div>
                  `
                  content.insertAdjacentHTML("afterend", classHTML)
                })
          }
          else {
            for (let i = 0 ; i < data.length; i++){
              firebase.firestore().doc("classes/"+data[i]).get().then(async (doc3)=>{
                class_data = await doc3.data()
                let subject_name = class_data.subject_name
                let class_id = class_data.class_id
                let class_name = class_data.class_name
                let teacher_name = doc.data().teacher_name
                let classHTML =`
                <div class="class-info">
                  <div class="class-name">${class_name}</div>
                  <div class="teacher">Teacher: ${teacher_name}</div>
                  <div>
                    <span class="subject">Subject: ${subject_name}</span>
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
                  window.location.href = "studentAssignments.html"
                })
              })
            }
          }
        }


          
    );
    }
    
})



  
document.getElementById("btn-join-class").addEventListener("click", (e)=>{
  let class_id_join = document.getElementById("class-id").value;
  let content = document.getElementById("btn-join-class")
  firebase.firestore().doc("classes/"+class_id_join).get().then(async (doc)=>{
    data = await doc.data()
    console.log(data)
    let teacher_id = data.teacher_id
    await firebase.firestore().doc("classes/" + class_id_join).update({
      student_id: firebase.auth().currentUser.uid
    })
    await firebase.firestore().doc("users/" + firebase.auth().currentUser.uid).update({
      classes: firebase.firestore.FieldValue.arrayUnion(class_id_join)
    })
    // console.log(class_id_join)
    await firebase.firestore().doc("users/"+ teacher_id).get().then(async (doc2)=>{
      data2 = await doc2.data().teacher_name
    })
    let subject_name = data.subject_name
    let class_name = data.class_name
    let teacher_name = data2
    let classHTML =`
                    <div id="class-info" class="class-info">
                      <div class="class-name">${class_name}</div>
                      <div class="teacher">Teacher: ${teacher_name}</div>
                      <div>
                        <span class="subject">Subject: ${subject_name}</span>
                        <span id="class_id" class="number-of-students">Class's ID: ${class_id_join}</span>
                      </div>
                    </div>
                    `
                    content.insertAdjacentHTML("afterend", classHTML)
                    document.getElementById("enter-class").addEventListener("click", (e)=>{
                      let a = e.target.parentNode.children.class_id.innerHTML
                      let lastSix = a.substr(a.length - 6); // => "Tabs1"
                      localStorage.setItem("chosen_class_id", lastSix)
                      window.location.href = "studentAssignments.html"
                    })
  })
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

