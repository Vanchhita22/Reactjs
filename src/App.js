
import { useState, useEffect} from 'react';
import './App.css';


function App() {
 const initialValues ={username:"" ,email:"",password:""};
 const [formValues,setFormValues] = useState(initialValues);
 const [formErrors,setFormErrors] = useState({});
 const [isSubmit,setIsSubmit] = useState(false);

 const handleChange = (e) =>{
  // console.log(e.target);
  const {name,value} = e.target;
  setFormValues({...formValues,[name]:value});
  // console.log(formValues);
 };

 const handleSubmit = (e) =>{
  e.preventDefault();
 setFormErrors(validate(formValues));
 setIsSubmit(true);
 };

 useEffect(() => {
  console.log(formErrors);
  if(Object.keys(formErrors).length === 0 && isSubmit){
    console.log(formValues);
  }
 },[formErrors]);

 const validate = (values) =>{
  const errors = {};
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!values.username){
    errors.username ="Username is required";
  }
  if(!values.email){
    errors.email ="Email is required";
  } else if(!regex.test(values.email)){
    errors.email ="Enter vaild email format";
  }

  if(!values.password){
    errors.password ="Password is required";
  } else if(values.password.length<4){
    errors.password ="Password must be greater than 4 charactor";
  } else if(values.password.length>10){
    errors.password ="Password must be exceed more than 4 charactor";
  }
  return errors;

 };


  return (
    <div className='contanier'>
    {Object.keys(formErrors).length === 0 && isSubmit ? (
      <div className='Sign'>Signed in sucessfully</div>) :(
    <pre>{JSON.stringify(formValues,undefined,2)}</pre>
    )}
    
      <form onSubmit={handleSubmit}>
        <h1>Login From</h1>

        <div className='Ui-Form'>
        <label>Username :</label>
        <input type='text' placeholder='enter the username'
         name='username'
         value={formValues.username} onChange={handleChange}>
         </input>
         <p>{formErrors.username}</p>
      
       
       
       <label>Email :</label>
        <input type='text' placeholder='enter the email' 
        name='email'
        value={formValues.email} onChange={handleChange}>
        </input>
        <p>{formErrors.email}</p>
      
        
        <label>Password :</label>
        <input type='password' placeholder='enter the password'
         name='password'
         value={formValues.password} onChange={handleChange}></input>
        <p>{formErrors.password}</p>
        
        
        <div>
          <button className='fluid ui button blue'>Submit</button>
        </div>
        </div>
      </form>
    </div>
   
  );
}

export default App;
