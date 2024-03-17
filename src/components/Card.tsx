import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: {
    title: string;
    pubDatetime: string;
    description: string;
    type?: string;
  };
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        {...(frontmatter.type === "feedPost"
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="inline-block text-lg font-medium text-skin-accent underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <Datetime pubDatetime={pubDatetime} />
      <p>{description}</p>
    </li>
  );
}
