import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center mb-5">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>music&nbsp;</span>
        <br />
        <span className={title()}>more personal.</span>
        {/* <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div> */}
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Research Paper
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub Repository
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by <Code color="primary"> creating an account </Code> or{" "}
            <Code color="secondary"> logging in</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}