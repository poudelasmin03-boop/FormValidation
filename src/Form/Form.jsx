import React, { useState } from 'react'
import "./form.css"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


const schema = z.object({
username :z.string().nonempty("username is required").min(3,'username must have 3 character.'),
email : z.string().nonempty("Email is reqired").email("Invalid email address."),
password:z.string().nonempty("password is required").min(8,"Password must have 8 character").regex(/[A-Z]/,"Password must contain at least one uppercase").regex(/[a-z]/,"password must contain at least one lowercase").regex(/[0-9]/,"password must be contain at least one digits").regex(/[!@#$%^&*()`/*?{}:,<>]/,"password must contain at lease one special character"),

confirmPassword : z.string().nonempty("Confirm password is required"),
})
.refine((data)=>data.password === data.confirmPassword,{
  required:"required cannot be empty",
  message:"passwords don't match",
  path: ["confirmPassword"],
});
export default function Form() {

    const {
      register,
      handleSubmit,
      reset,
      formState:{errors},

    }=useForm({
      resolver: zodResolver(schema)
    });
function onSubmit  (data) {
     alert(`${data.username} successfully register`)
      console.log(data)
      reset();
    };
  
  return (
    <div>
          <div className='container'>
            <h3>Register Form</h3>
             <form method="post" onSubmit={handleSubmit(onSubmit)}>
               <div className='username'>
                <label htmlFor="username">Username</label>
                <input {...register('username')}  />

                <p>{errors.username?.message}</p>
               </div>

               <div className='email'>
                <label htmlFor="email">Email</label>
                <input {...register('email')}  />
                  <p>{errors.email?.message}</p>
               </div>

               <div className='password'>
                <label htmlFor="password">password</label>
                <input {...register("password")}  />
                  <p>{errors.password?.message}</p>
                  
               </div>

               <div className='password2'>
                <label htmlFor="confirm">confirm password</label>
                <input {...register('confirmPassword')} />
                  <p>{errors.confirmPassword?.message}</p>
                  <p>{errors.confirmPassword?.required}</p>

               </div>

               <button id="btn" type="submit" >Register</button>
             </form>
          </div>
       
    </div>
  )
}
