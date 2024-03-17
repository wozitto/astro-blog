import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";

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
      <Datetime pubDatetime={pubDatetime} />
      <a
        href={href}
        {...(post.type === "feedPost"
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="inline-block text-lg font-medium text-skin-accent underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>
            {title}
            {post.type === "feedPost" && (
              <svg
                role="img"
                aria-label="外部リンク"
                strokeWidth="0"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
              </svg>
            )}
          </h2>
        ) : (
          <h3 {...headerProps}>
            {title}
            {post.type === "feedPost" && (
              <svg
                role="img"
                aria-label="外部リンク"
                strokeWidth="0"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
              </svg>
            )}
          </h3>
        )}
      </a>
      <p>{description}</p>
    </li>
  );
}
