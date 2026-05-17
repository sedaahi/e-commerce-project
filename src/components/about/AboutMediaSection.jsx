import { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";

import videoThumbnail from "../../assets/images/about/about-thumbnail.png";
import aboutVideo from "../../assets/images/about/about-video.mp4";

function AboutMediaSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const stats = [
    { number: "15K", label: "Happy Customers" },
    { number: "150K", label: "Monthly Visitors" },
    { number: "15", label: "Countries Worldwide" },
    { number: "100+", label: "Top Partners" },
  ];

  return (
    <section className="bg-white px-[45px] py-[80px] md:px-0 md:py-[80px]">
      <div className="mx-auto max-w-[1050px]">
       <div className="flex flex-col gap-[60px] md:flex-row md:items-start md:justify-between">
  <div className="max-w-[381px] text-center md:max-w-[394px] md:text-left">
    <p className="text-[14px] leading-[20px] text-[#E74040]">
      Problems trying
    </p>

    <h2 className="mt-[24px] text-[24px] font-bold leading-[32px] text-[#252B42]">
      Met minim Mollie non desert Alamo est sit cliquey dolor do met
      sent.
    </h2>
  </div>

  <p className="max-w-[353px] text-left text-[14px] leading-[20px] text-[#737373] md:mt-[44px] md:max-w-[545px]">
    Problems trying to resolve the conflict between the two major realms
    of Classical physics: Newtonian mechanics
  </p>
</div>

        <div className="mt-[80px] flex flex-col items-center gap-[40px] text-center md:grid md:grid-cols-4 md:gap-y-0">
          {stats.map((item) => (
            <div key={item.label}>
              <h3 className="text-[58px] font-bold leading-[80px] text-[#252B42]">
                {item.number}
              </h3>

              <p className="text-[16px] font-bold leading-[24px] text-[#737373]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-[80px] md:mt-[112px]">
          <div className="relative overflow-hidden rounded-[20px]">
            <video
              ref={videoRef}
              poster={videoThumbnail}
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="h-[316px] w-full object-cover md:h-[540px]"
            >
              <source src={aboutVideo} type="video/mp4" />
            </video>

            {!isPlaying && (
              <button
                onClick={handlePlay}
                className="absolute left-1/2 top-1/2 flex h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#23A6F0] text-white"
              >
                <FaPlay className="ml-[4px] text-[24px]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMediaSection;
