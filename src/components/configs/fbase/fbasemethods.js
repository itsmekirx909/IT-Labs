import app from './fbaseconfigs'
import { getDatabase, ref, set, onValue, push, remove } from "firebase/database";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";


const database = getDatabase(app)

const auth =getAuth(app)


//form submit
let datasubmit = (alldata) =>{
    return new Promise((resolve, reject)=>{

        alldata.id = push(ref(database, `registrations/${alldata.id}`)).key
        alldata.approved = false
        
        let reference = ref(database, `registrations/${alldata.id}`)

        alldata.rollno = alldata.id.slice(-4)

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
          resolve(user)
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
        }) 
       })
}

let getresults = (type) =>{
    const reference = ref(database, `results/${type}`);
    return new Promise((resolve, reject)=>{
onValue(reference, (data)=>{
    const result = data.val()
    resolve(result)
})
    })
}

let getrollresults = () =>{
    const reference = ref(database, `results/`);
    return new Promise((resolve, reject)=>{
onValue(reference, (data)=>{
    const result = data.val()
    resolve(result)
})
    })
}

let checkrespage = () =>{
    const reference = ref(database, `showresult/check`);
    return new Promise((resolve, reject)=>{
onValue(reference, (data)=>{
    const result = data.val()
    resolve(result)
})
    })
}

let conrespage = (cond) =>{
    const reference = ref(database, `showresult/check`);
    return new Promise((resolve, reject)=>{
set(reference, cond)
    })
}

let setrespage = (bool) =>{
    const reference = ref(database, `showresult/check`);
    return new Promise((resolve, reject)=>{
set(reference, bool)
.then((success)=>{
    resolve(success)
})
.catch((error)=>{
    reject(error)
})
    })
}

let getrolldata = () =>{
    const reference = ref(database, 'registrations');
    return new Promise((resolve, reject)=>{
onValue(reference, (data)=>{
    const studobj = data.val()
    resolve(studobj)
})
    })
}

let signupstud = (email, password, myref) =>{
    
    return new Promise((resolve, reject)=>{
        
        createUserWithEmailAndPassword(auth, email, password)
        .then(()=>{
            
            const reference = ref(database, `registrations/${myref}/credentials`)

            let obj = {
                email: email,
                password: password
                }

            set(reference, obj)
            .then((userdata)=>{
                resolve(userdata)
            })
            .catch(()=>{
                reject('Error from database')
            })
        
        })
        
        .catch(()=>{
            reject('Invalid Email')
        })

    })
}

let checkuseroradmin = () =>{
    const reference = ref(database, '/');
    return new Promise((resolve, reject)=>{
onValue(reference, (data)=>{
    const studobj = data.val()
    resolve(Object.values(studobj))
})
    })
}

export { datasubmit , login, checkuser, logout, getstudentsdata, getquizes, sendquizes, getresults, getrollresults, checkrespage, setrespage, conrespage, getrolldata, signupstud, checkuseroradmin }