import { useEffect, useState } from "react";
import { BACKENDURL } from "../url"
import axios from 'axios';

const AllSpaces = () => {
    const [spaces, setSpaces] =  useState<any[]>([]);

    let userToken = localStorage.getItem('userToken')
    useEffect (() => {
        const getspace = async() => {
            try {
                let res = await axios.get(`${BACKENDURL}/api/v1/space/all`, {
                    headers: { authorization: `Bearer ${userToken}` }
                })
                setSpaces(res.data.spaces)
                return res.data.spaces;
            }catch(error){
                console.log('error',error)
            }
        }
        getspace();
    },[])
    
    console.log(spaces);

    if (spaces.length == 0) {
      return <div>You have no space currently</div>
    }
  return (
    <div>
      <div>
        <h2 className="font-bold text-2xl p-5">Your Spaces</h2>
      </div>
      <div>
        {spaces.map((space: any, index: number) => {
          return (
            <div key={index}>
              <img src={space.thumbnail}/>
              <h2>{space.name}</h2>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllSpaces
