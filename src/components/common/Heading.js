import { capitalizeHeadingText } from "@/utils/capitalizeHeading";

function formatChildren(children) {
  if (typeof children === "string") {
    return capitalizeHeadingText(children);
  }

  if (Array.isArray(children)) {
    return children.map((child) => (typeof child === "string" ? capitalizeHeadingText(child) : child));
  }

  return children;
}

function createHeading(Tag) {
  return function Heading({ children, ...props }) {
    return <Tag {...props}>{formatChildren(children)}</Tag>;
  };
}

export const H1 = createHeading("h1");
export const H2 = createHeading("h2");
export const H3 = createHeading("h3");
export const H4 = createHeading("h4");
