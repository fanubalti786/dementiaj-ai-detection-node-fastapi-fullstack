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
          <p>New: AI memory check integrated</p>
          <img src={assets.star_icon} alt="" className="w-2.5" />
        </div>
        <h1
          className="text-3xl sm:text-5xl text-gray-700 font-semibold 
        sm:leading-16 font-Poppins"
        >
          Your own <span className="text-primary sm:text-5xl ">AI-powered dementia</span> <br />
          detection & care assistant.
        </h1>
        <p className="my-6 sm-my-8 max-w-2xl mx-auto max-sm:text-xs mt-8 text-black/60">
          this is your space to track changes, to monitor what matters, and to
          check your cognitive health with clarity. Whether it's early signs or
          ongoing care, your support starts right here.
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
