import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  post: {
    title: string;
    pubDatetime: string;
    description: string;
    type?: string;
  };
  secHeading?: boolean;
}

export default function Card({ href, post, secHeading = true }: Props) {
  const { title, pubDatetime, description } = post;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium underline",
  };

  return (
    <li className="my-6">
      <a
        href={href}
        {...(post.type === "feedPost"
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
