import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import Circle from "./Circle";
import ImageFallback from "./ImageFallback";

function Cta() {
  const { title, content, button, enable } = config.call_to_action;
  const titleRef = useRef(null);

  useEffect(() => {
    if (!enable) return;

    const tl = gsap.timeline({
      repeat: -1, // Repeat the animation indefinitely
      yoyo: true, // Reverse the animation to create the "beep" effect
    });

    tl.to(titleRef.current, {
      duration: 0.5,
      scale: 1.1,
      ease: "power1.inOut",
    }).to(titleRef.current, {
      duration: 0.5,
      scale: 1,
      ease: "power1.inOut",
    });

    return () => tl.kill();
  }, [enable]);

  if (!enable) return null;

  return (
    <section className="cta section pt-0">
      <div className="container-xl">
        <div className="section relative px-4 text-center">
          <div className="animate">
            <h2 ref={titleRef} className="section-title">
              {title}
            </h2>
            {markdownify(content, "p", "mt-10")}
            <Link href={button.link} className="btn btn-primary mt-10">
              {button.label}
            </Link>
          </div>
          <div className="bg-theme animated-bg absolute top-0 left-0 w-full after:hidden">
            <ImageFallback
              src="/images/wave.svg"
              fill={true}
              sizes="100vw"
              alt="bg wave"
            />
            <Circle
              className="left-[10%] top-12"
              width={32}
              height={32}
              fill={false}
            />
            <Circle className="left-[3%] bottom-[13%]" width={85} height={85} />
            <Circle
              className="left-[15%] bottom-[35%]"
              width={47}
              height={47}
              fill={false}
            />

            <Circle className="right-[12%] top-[12%]" width={20} height={20} />
            <Circle
              className="right-[2%] bottom-[30%]"
              width={73}
              height={73}
              fill={false}
            />
            <Circle
              className="right-[19%] bottom-[16%]"
              width={37}
              height={37}
              fill={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
