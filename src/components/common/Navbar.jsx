import React, { useEffect } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath, useLocation } from 'react-router-dom'
import {NavbarLinks} from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { useState } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";


const subLinks=[
    {
         title:"python",
         link:"/catalog/python"
    },
    {
         title:"web dev",
         link:"/catalog/web-developer"
    },
];




const Navbar = () => {
     
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const {totalItems}=useSelector((state)=>state.cart);
    
    const location=useLocation();
    // const [subLinks,setSubLinks]=useState([]);
    // const fetchSublinks=async()=>{
    //     try{
    //        const result=await apiConnector("GET",categories.CATEGORIES_API);
    //        console.log("Printing sublink result:",result)
    //        setSubLinks(result.data.data);
    //     }catch(error){
    //        console.log("Could not fetch the category list");
    //     }
    //   }

    // useEffect(()=>{
    //       fetchSublinks();
    // },[])
    
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname);
    }
  return (
   <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
    <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
      <Link to="/">
        <img src={logo}
        width={160}
        height={40}
        loading='lazy'/>
      </Link>
      {/* Nav link */}
      <nav>
        <ul className='flex gap-x-6 text-richblack-25'>
            {
                NavbarLinks.map((link,index)=>{
                     return <li key={index}>
                        {
                            link.title==='Catalog'?(
                                <div className='flex items-center gap-1 group relative'>
                                  <p>{link.title}</p>
                                  <RiArrowDropDownLine />
                                  <div className='invisible absolute left-[50%] top-[-50%] translate-x-[-50%] translate-y-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[300px]'>
                                    <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5 translate-x-[75%] translate-y-[-40%] ' >
                                    </div>
                                    {
                                         subLinks.length ?(
                                            
                                                subLinks.map((sublink,index)=>(
                                                    <Link to={`${sublink.link}`} key={index}>
                                                       <p>{sublink.title}</p>
                                                    </Link>
                                                ))
                                            
                                         ):(<div></div>)
                                    }
                                  </div>
                                </div>
                                
                            ):(
                                 <Link to={link?.path}>
                                    <p className={`${matchRoute(link?.path) ?"text-yellow-25": "text-richblack-25"}`}>
                                        {link.title}
                                    </p>
                                 </Link>
                            )
                        }
                    </li>
                })
            }

        </ul>
      </nav>

      {/* login /signup/dashboard */}
       <div className='flex gap-x-4 items-center'>
        {
            user && user?.accountType!=="Instructor" && (
                <Link to="/dashboard/cart" className='relative'>
                    <AiOutlineShoppingCart/>
                    {
                       totalItems >0 &&(
                        <span>{totalItems}</span>
                       )
                    }
                    </Link>
                 ) 
        }
        {
            token===null &&(
                <Link to="/login">
                    <button className='border border-richblack-700 bg-richblack-800
                    text-richblack-100 rounded-md px-[12px] py-[8px]'>
                        Log in
                    </button>
                </Link>
            )
        }
        {
            token===null && (
                <Link to="/signup">
                 <button className='border border-richblack-700 bg-richblack-800
                    text-richblack-100 rounded-md px-[12px] py-[8px]'>
                    SignUp
                </button>
                </Link>
            )
        }
        {
            token!==null && <ProfileDropDown/>

        }

       </div>

    </div>
   </div>


  )
}

export default Navbar