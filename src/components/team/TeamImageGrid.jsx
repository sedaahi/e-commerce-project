import heroMain from "../../assets/images/team/hero-main.png";
import heroSmall1 from "../../assets/images/team/hero-small-1.png";
import heroSmall2 from "../../assets/images/team/hero-small-2.png";
import heroSmall3 from "../../assets/images/team/hero-small-3.png";
import heroSmall4 from "../../assets/images/team/hero-small-4.png";

export default function TeamImageGrid() {
  return (
    <section className="bg-white">
      <div className="flex w-full flex-col md:flex-row gap-2">
        {/* LEFT BIG IMAGE */}
        <div className="h-[530px] w-full md:h-[530px] md:w-1/2">
          <img
            src={heroMain}
            alt="Team hero"
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT GRID */}
        <div className="flex w-full flex-wrap gap-[8px] md:w-1/2">
          {[heroSmall1, heroSmall2, heroSmall3, heroSmall4].map(
            (image, index) => (
              <div key={index} className="h-[260px] w-[calc(50%-4px)]">
                <img
                  src={image}
                  alt={`Team detail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
