import app from './fbaseconfigs'
import { getDatabase, ref, set, onValue, push, remove } from "firebase/database";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";


const database = getDatabase(app)

//form submit
let datasubmit = (alldata) =>{
    return new Promise((resolve, reject)=>{

        let reference = ref(database, `registrations/${alldata.type1.firstname}`)

        set(reference, alldata)
        .then(()=>{
            resolve(alldata)
        })
        .catch(()=>{
            reject('Error from database')
        })
    })
}

//loginadmin
const auth =getAuth(app)

let login = (email, password)=>{
    return new Promise((resolve, reject)=>{
 
     signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
             const user = userCredential.user
             const reference = ref(database, `admins/${user.uid}`)
 
             onValue(reference, (userdata)=>{
                 let userstatus = userdata.exists()
                 if(userstatus){
                     resolve(userdata.val())
                 }
                 else{
                     reject('User not found')
                 }
             })
         })
         .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;
             reject(error)
         })
 
 
     })
 }

// checkuser
let checkuser = () =>{
return new Promise((resolve,reject)=>{

    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          resolve(uid)
        } else {

            reject('No user is logged in')

        }
      });

})
}

let logout = () =>{
    return new Promise((resolve, reject)=>{
        signOut(auth)
        .then(() => {
resolve('logged out')
        }).catch((error) => {
reject('An error happened')
          });
    })
}

let getstudentsdata = () =>{
    const reference = ref(database, 'registrations');
    return new Promise((resolve, reject)=>{
onValue(reference, (data)=>{
    const studobj = data.val()
    resolve(studobj)
})
    })
}

let getquizes = () =>{
    const reference = ref(database, 'quizes');
    return new Promise((resolve, reject)=>{
onValue(reference, (data)=>{
    const studobj = data.val()
    resolve(studobj)
})
    })
}

let sendquizes = (obj) =>{
    return new Promise((resolve, reject)=>{
    const reference = ref(database, 'quizes');

    obj.id = push(reference).key

    let postref = ref(database, `quizes/${obj.id}`)
        set(postref, obj)
        .then((success)=>{
            resolve(success)
        })
        .catch((error)=>{
            reject(error)
        })    })
}



export { datasubmit , login, checkuser, logout, getstudentsdata, getquizes, sendquizes }