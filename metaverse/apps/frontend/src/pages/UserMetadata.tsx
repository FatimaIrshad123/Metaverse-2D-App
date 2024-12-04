import axios from "axios"
import { BACKENDURL } from "../url"


const UserMetadata = () => {

    let userId = localStorage.getItem('userId')
    const getUserMetadata = async() => {
        try {
            let res = await axios.get(`${BACKENDURL}/api/v1/user/metadata/bulk?ids=${userId}`);
            console.log(res.data)
        }catch(error){
            console.log(error)
        }
    }
    getUserMetadata();

  return (
    <div>
      
    </div>
  )
}

export default UserMetadata
