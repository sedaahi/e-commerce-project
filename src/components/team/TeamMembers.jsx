import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { teamMembers } from "../../data/teamMembers";

function TeamMembers() {
  return (
    <div>
      <section className="bg-white py-[60px] md:py-[112px]">
        <div className="mx-auto max-w-[1050px] px-[45px] md:px-0">
          <h2 className="mb-[45px] text-center text-[40px] font-bold leading-[50px] text-[#252B42] md:mb-[112px] md:text-[40px] md:leading-[50px]">
            Meet Our Team
          </h2>

          <div className="flex flex-col items-center gap-[30px] md:flex-row md:flex-wrap md:justify-center md:gap-x-[30px] md:gap-y-[112px]">
            {" "}
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex w-full max-w-[316px] flex-col items-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-[231px] w-full object-cover"
                />

                <div className="flex flex-col items-center px-[30px] py-[30px]">
                  <h5 className="text-center text-[16px] font-bold leading-[24px] text-[#252B42]">
                    {member.name}
                  </h5>

                  <h6 className="mt-[10px] text-center text-[14px] font-bold leading-[24px] text-[#737373]">
                    {member.role}
                  </h6>

                  <div className="mt-[10px] flex gap-[15px] text-[24px] text-[#23A6F0] md:text-[20px]">
                     <FaFacebook className="text-[#335BF5] md:text-[#23A6F0]" />
            <FaInstagram className="text-[#E61F5A] md:text-[#23A6F0]" />
            <FaTwitter className="text-[#23A6F0]" />
            <FaLinkedin className="text-[#23A6F0]" />

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[60px] md:py-[80px]">
        <div className="mx-auto flex max-w-[1050px] flex-col items-center px-[45px] text-center md:px-0">
          <h2 className="max-w-[330px] text-[40px] font-bold leading-[50px] text-[#252B42] md:max-w-none">
            Start your 14 days free trial
          </h2>

          <p className="mt-[10px] max-w-[280px] text-[14px] leading-[20px] text-[#737373] md:max-w-[430px]">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
            RELIT official consequat.
          </p>

          <button className="mt-[24px] h-[52px] w-[186px] rounded-[5px] bg-[#23A6F0] text-[14px] font-bold text-white">
            Try it free now
          </button>

          <div className="mt-[30px] flex gap-[34px] text-[30px] text-[#23A6F0] md:gap-[30px] md:text-[24px]">
            <FaFacebook  className="text-[#395185]"/>
            <FaInstagram  className="text-[#000000]"/>
            <FaTwitter  />
            <FaLinkedin   className="text-[#0A66C2]"/>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TeamMembers;
