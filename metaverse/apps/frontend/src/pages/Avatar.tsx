import axios from 'axios';
import { BACKENDURL } from '../url';
import { useEffect, useState } from 'react';

const Avatar = () => {
  const [avatars, setAvatars] = useState<any[]>([]);

  useEffect(() => {
    const getAvatar = async () => {
      try {
        let res = await axios.get(`${BACKENDURL}/api/v1/avatars`);
        setAvatars(res.data.avatars)
      } catch (error) {
        console.error('Error fetching avatars:', error);
      }
    };
    getAvatar();
  }, []);

  return (
    <div>
      <div>
        <h2 className="font-bold text-2xl p-5">Select Avatar</h2>
      </div>
      <div>
        {avatars.map((avatar: any, index: number) => {
          console.log(avatar.id)
          return (
            <div key={index}>
              <img src={avatar.imageUrl}/>
              <h2>{avatar.name}</h2>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Avatar;
