import Link from "next/link"; // Import Next.js Link component
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
      </div>

      <div className="flex gap-3">
        <a
          target="_blank"
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.backend}
        >
          <GithubIcon size={20} />
          Backend/model src code
        </a>
        <a
          target="_blank"
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          Frontend src code
        </a>
        <a
          target="_blank"
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.readme}
        >
          <GithubIcon size={20} />
          READEME
        </a>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by{" "}
            <Link href="/auth/register">
              <Code color="primary" className="cursor-pointer">
                creating an account
              </Code>
            </Link>{" "}
            or{" "}
            <Link href="/auth/login">
              <Code color="secondary" className="cursor-pointer">
                logging in
              </Code>
            </Link>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
