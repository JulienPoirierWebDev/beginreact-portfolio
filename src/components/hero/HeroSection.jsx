import { FULL_NAME } from "../../lib/config";

export const HeroSection = () => {
  return (
    <div className="relative flex-col m-auto items-center md:flex-row md:pr-[52px]">
      <img
        width={300}
        height={300}
        src="/images/avatar.jpg"
        alt="avatar"
        className="top-[-16px]  right-[16px] rounded mx-auto shadow-lg md:absolute  "
      />
      {/* Hero - Exercise*/}
      <div className="relative z-40 flex flex-col gap-4 md:mr-32">
        {/* Hero - Exercise*/}
        <h1 className="text-6xl drop-shadow-[0_0px_20px_rgba(0,0,0,0.25)] md:text-8xl">
          I'm{" "}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            {FULL_NAME}
          </span>
        </h1>
        <p className="max-w-xl text-xl ">
          <b>Apprenti React.</b> I’m a software developer that make thing on
          internet, very happy to see your here, place holder please fill
          something here please fill something here.
        </p>
      </div>
    </div>
  );
};
