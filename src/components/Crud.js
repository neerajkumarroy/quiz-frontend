// import React, { useEffect, useState } from 'react';

// const Crud = () => {
//     const [name, setname] = useState("");
//     const [email, setEmail] = useState("");
//     const [age, setAge] = useState("");
//     const [gender, setGender] = useState("");
//     const [salary, setSalary] = useState("");
//     const [getlist,setgetList]= useState([]);

//     //This is the POST API
//     const handleSubmit = async () => {
//         console.log(name, email, age, gender, salary);
//         let result = await fetch("http://localhost:6500/create", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ name, email, age, gender, salary })
//         });

//         result = await result.json();
//         console.log(result);
//     }

//     //GET list API
//    const getListofproduct = async()=>{
//     let result = await fetch("http://localhost:6500");    
//     result = await result.json();
//     setgetList(result);
//    }
   
//    //DELETE APi
//    const handleDelete= async(id)=>{
//     let result = await fetch(`http://localhost:6500/delete/${id}`,{
//         method:"DELETE",        
//     });

//     result = await result.json();
//     if(result)
//     {
//         alert("Data Deleted SuccessFully....!");
//         getListofproduct();
//     }
//    };

//    //Update API

// //    let handleUpdate = async() =>{
// //       let result = await fetch(`http://localhost:6500/pudate/${_id}`,{
// //         method:"PUT"
// //       });
// //       result = await result.json();
// //       console.log(result);
// //    }

//    useEffect(()=>{
//     getListofproduct();
//    },[]);


//     return (
//         <div className='Input-fild'>
//             <h1>Add New Emploee</h1>
//             <input type='text' value={name} onChange={(e) => setname(e.target.value)} placeholder='name'></input>
//             <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email'></input>
//             <input type='text' value={age} onChange={(e) => setAge(e.target.value)} placeholder='age'></input>
//             <input type='text' value={gender} onChange={(e) => setGender(e.target.value)} placeholder='gender'></input>
//             <input type='text' value={salary} onChange={(e) => setSalary(e.target.value)} placeholder='salary'></input>
//             <button className="Add-button" type="button" onClick={handleSubmit}>Add</button>
//             <div className='perl-list'>
//                 <h1>Employee List</h1>
//                 <ul style={{margin:'0px'}}>
//                     <li>S.No</li>
//                     <li>name</li>
//                     <li>email</li>
//                     <li>age</li>
//                     <li>gender</li>
//                     <li>salray</li>
//                     <li>Operations</li>
//                 </ul>
//                {
//                 getlist.map((item,index)=>
//                 <ul style={{margin:'0px'}}>
//                     <li>{index+1}</li>
//                     <li>{item.name}</li>
//                     <li>{item.email}</li>
//                     <li>{item.age}</li>
//                     <li>{item.gender}</li>
//                     <li>{item.salary}</li>
//                     <li><button onClick={()=>handleDelete(item._id)}>Delete</button><button >UPDATE</button></li>

//                 </ul>
//                 )
//                }
//             </div>
//         </div>

//     )
// }
// export default Crud;
