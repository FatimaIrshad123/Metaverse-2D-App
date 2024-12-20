import { useEffect, useState } from "react";
import { BACKENDURL } from "../url"
import axios from 'axios';
import UserNavbar from "../components/UserNavbar";
import { useNavigate } from "react-router-dom";

const AllSpaces = () => {
    const [spaces, setSpaces] =  useState<any[]>([]);

    const navigate = useNavigate();
    let userToken = localStorage.getItem('userToken')
    useEffect (() => {
        const getspace = async() => {
            try {
                let res = await axios.get(`${BACKENDURL}/api/v1/space/all`, {
                    headers: { authorization: `Bearer ${userToken}`}
                })
                setSpaces(res.data.spaces)
                return res.data.spaces;
            }catch(error){
                console.log('error',error)
            }
        }
        getspace();
    },[])

    const deleteSpace = async(spaceId:any) => {
      try {
        let response = await axios.delete(`${BACKENDURL}/api/v1/space/${spaceId}`,{
          headers: { authorization: `Bearer ${userToken}`}
        });
        setSpaces((prevSpaces) => prevSpaces.filter((space) => space.id !== spaceId));
        alert('Space Deleted Successfully!');
        return response;
      }catch (error){
        console.log(error);
        alert('Error occured while deleting the space')
      }
    }
    
    if (spaces.length == 0) {
      return <div>You have no space currently</div>
    }
    
  return (
    <div className="min-h-screen" style={{
      backgroundImage: "url('/bgh.avif')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <UserNavbar />
      <div>
        <h2 className="p-5 font-bold text-2xl text-white">Your Spaces</h2>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4 sm:justify-center mt-7 px-8" >
        {spaces.map((space: any, index: number) => {
          return (
            <div key={index} style={{width:'100%', height:'100%', backgroundSize: 'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'}}>
              <img src='https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/N4XpyYnWRAiFz9CP/jDBuCZ53Lz9AwEGxROt7m4'
              className="rounded-lg" onClick={() => {
                navigate('/spaces');
                localStorage.setItem('spaceName',space.name)
                localStorage.setItem('spaceId',space.id)}}/>
              <div className="flex justify-between px-2">
                <h2 className="text-white font-bold">{space.name}</h2>
                <button className="text-white font-bold" onClick={() => deleteSpace(space.id)}>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllSpaces
