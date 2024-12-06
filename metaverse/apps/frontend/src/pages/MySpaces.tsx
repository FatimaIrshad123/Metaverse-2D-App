import { MicOff, VideoOff} from 'lucide-react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const MySpaces = () => {
    const navigate = useNavigate();
    let spaceName = localStorage.getItem('spaceName')
    let [name, setName] = useState('');

    const handleChange = (e:any) => {
      setName(e.target.value);
      console.log('abcdname',name)
    };

    const handleSubmit = (e:any) => {
      e.preventDefault();
      localStorage.setItem('name', name);
      navigate('/selectedspace');
      console.log('name',name);
    }
    return (
    <div className="min-h-screen p-20 justify-items-center" style={{
        backgroundImage: "url('/bgh.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <div>
        <h2 className='text-white font-semibold text-5xl text-center bg-gradient-to-r from-white via-blue-200 to-blue-300 bg-clip-text text-transparent'>Welcome to {spaceName}</h2>
      </div>
      <div className='flex pt-32'>
        <div className="justify-center items-center">
            <div className="bg-black text-white p-24 rounded-xl">
                <h2>You are muted</h2>
                <h2>Your camera is off</h2>
            </div>
            <div className='flex justify-center pt-5 space-x-4'>
                <MicOff className='text-white'/>
                <VideoOff className='text-white'/>
            </div>
        </div>
        <div className='pl-20'>
            <div className='flex'>
                <div>
                    <img src="https://dynamic-assets.gather.town/v2/sprite-profile/avatar-ty0CoZao8eIAgVnSKFg7.oQePaZCdEjy7bEWWLzb8.RjHZpJroqxJb85HeASYK.uelBgm8fS0qdpl7vVBoj.K6tbhYXBDUPkIw6ijSvq.RhTmC28lTQJ7MKeDlGwn.png?d=." className="h-32"/>
                    <span className='text-sm text-gray-500 pl-4 mt-0.5' onClick={() => navigate('/updatemetadata')}>Edit</span>
                </div>
                <input type="text" required className='bg-transparent rounded-lg w-full h-10 mt-20 ml-5 border border-solid border-blue-300 relative z-10 text-white' placeholder="What's your Name?"
                onChange={handleChange}/>
            </div>
            <button className='bg-green-500 font-medium w-full rounded-lg py-2 mt-3' onClick={handleSubmit}>Join</button>
        </div>
       </div>
    </div>
  )
}

export default MySpaces
