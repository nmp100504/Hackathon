
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

  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        firebase.firestore().doc("users/" + user.uid).get().then(async (doc)=>{
            data = await doc.data().classes;
            console.log(data.length)
            let class_data;
            let content = document.getElementById("btn-join-class")
            for (let i = 0; i < data.length; i++ ){
              firebase.firestore().doc("classes/" + data[i]).get().then(async (doc2)=>{
                class_data = await doc2.data()
                console.log(class_data)
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



  


document.getElementById("btn-join-class").addEventListener("click", (e)=>{
  let class_id = document.getElementById("class-id").value;
  let content = document.getElementById("btn-join-class")
  firebase.firestore().doc("classes/"+class_id).get().then(async (doc)=>{
    data = await doc.data()
    console.log(data)
    let teacher_id = data.teacher_id
    await firebase.firestore().doc("classes/" + class_id).update({
      student_id: firebase.auth().currentUser.uid
    })
    await firebase.firestore().doc("users/" + firebase.auth().currentUser.uid).update({
      classes: class_id
    })
    await firebase.firestore().doc("users/"+ teacher_id).get().then(async (doc2)=>{
      data2 = await doc2.data().teacher_name
    })
    let subject_name = data.subject_name
    let class_name = data.class_name
    let teacher_name = data2
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
})

