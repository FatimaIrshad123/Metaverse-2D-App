

const IntroPage = () => {
  return (
    <div className="bg-white lg:px-48 md:px-10">
        <div className="pt-16">
            <h2 className="text-center font-semibold text-6xl text-gray-700" style={{lineHeight:1.2}}>The in-person moments you’ve been missing</h2>
        </div>
        <div className="md:flex-row py-24 px-20 sm:flex-col lg:flex">
            <div className="lg:pt-16 pb-5">
                <h2 className="font-bold  from-indigo-600 to-blue-600 text-transparent bg-clip-text bg-gradient-to-r pb-5">PROXIMITY AND VISIBILITY</h2>
                <h2 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-800 pb-7">Bring your remote team closer together</h2>
                <p className="text-gray-800">Communicate, collaborate, and feel more connected in a persistent space that reflects your unique team culture.</p>
            </div>
            <div>
                <img src="https://cdn.prod.website-files.com/63c885e8fb810536398b658a/643efaed7bdd2933eec28371_home%20proximity.png" loading="lazy" width="640" sizes="(max-width: 479px) 100vw, (max-width: 767px) 90vw, (max-width: 991px) 47vw, 45vw" alt=""></img>
            </div>
        </div>
        <div className="md:flex-row px-20 lg:flex">
            <div>
                <img src="https://cdn.prod.website-files.com/63c885e8fb810536398b658a/643efaed50a294a779d34a2e_home%20moments.png" loading="lazy" width="640" sizes="(max-width: 479px) 100vw, (max-width: 767px) 90vw, (max-width: 991px) 47vw, 45vw" alt="" ></img>
            </div>
            <div className="lg:pt-16 lg:pl-16 pt-5">
                <h2 className="font-bold from-indigo-600 to-blue-600 text-transparent bg-clip-text bg-gradient-to-r pb-5">SERENDIPITOUS MOMENTS</h2>
                <h2 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-800 pb-7">Talk naturally throughout your day</h2>
                <p className="text-gray-800">Stop by someone's desk, say hi in the hallway, and bring back water cooler chats. No scheduling required.</p>
            </div>
        </div>
        <div className="md:flex-row py-10 px-20 sm:flex-col lg:flex">
            <div className="lg:pt-16 pb-5">
                <h2 className="font-bold  from-indigo-600 to-blue-600 text-transparent bg-clip-text bg-gradient-to-r pb-5">PRODUCTIVE CONVERSATIONS</h2>
                <h2 className="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-800 pb-7">Meet in the moment</h2>
                <p className="text-gray-800">Collaborate in the moment or schedule team meetings to keep everyone aligned and work moving forward.</p>
            </div>
            <div>
            <img src="https://cdn.prod.website-files.com/63c885e8fb810536398b658a/643efaedee179c6b6c275e75_home%20conversations.png" loading="lazy" width="640" sizes="(max-width: 479px) 100vw, (max-width: 767px) 90vw, (max-width: 991px) 47vw, 45vw" alt=""></img>
            </div>
        </div>
    </div>
  )
}

export default IntroPage
