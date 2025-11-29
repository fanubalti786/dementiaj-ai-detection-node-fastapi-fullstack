import { assets } from "../assets/assets";

export default function Header() {
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative ">
      <div className="text-center mt-20 mb-8">
        <div
          className="inline-flex items-center justify-center rounded-full text-sm
        gap-4 px-6 py-1.5 border border-primary/40 bg-primary/10 text-primary
        mb-4"
        >
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} alt="" className="w-2.5" />
        </div>
        <h1
          className="text-3xl sm:text-6xl text-gray-700 font-semibold 
        sm:leading-16 font-Poppins"
        >
          Your own <span className="text-primary ">blogging</span> <br />
          platform.
        </h1>
        <p className="my-6 sm-my-8 max-w-2xl mx-auto max-sm:text-xs mt-8 text-black/60">
          this is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          start right here.
        </p>
        <img
          src={assets.gradientBackground}
          alt=""
          className="absolute -top-50 
        -z-1 opacity-50 "
        />
      </div>
    </div>
  );
}
