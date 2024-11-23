import { IoIosArrowForward } from "react-icons/io";

const VirtualPage = () => {
  return (
    <div className="p-10">
        <div className="flex">
            <div className="pt-60 pr-10">
                <h1 className="font-semibold text-6xl bg-gradient-to-r from-white via-blue-200 to-blue-300 bg-clip-text text-transparent">Your Virtual HQ</h1>
                <p className="text-white py-4 text-xl">Gather brings the best of in-person collaboration to distributed teams.</p>
                    <button className="px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 bg-emerald-400">
                        Get started
                    </button>
                    <button className="text-white px-4 font-medium">
                        <div className="flex">
                            <p className="pr-5">Or take a tour</p>
                            <IoIosArrowForward className="mt-1.5"/>
                        </div>
                    </button>
            </div>
            <div>
                <video id="home-hero" src="https://cdn.vidzflow.com/v/h3yy6rTnJQ_720p_1691443174.mp4" 
                className="width:100%;border-radius: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.55);" poster="https://cdn.prod.website-files.com/63c885e8fb810536398b658a/645bf7b13ac3a54d23fb33ad_Screenshot%202023-05-10%20125910.jpg">
                </video>
                
            </div>
        </div>
    </div>
  )
}

export default VirtualPage
