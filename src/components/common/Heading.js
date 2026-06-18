"use client";

import { Children, cloneElement, isValidElement } from "react";
import { useCapitalizeHeadingText } from "@/hooks/useHeadingLocale";

export function formatHeadingChildren(node, capitalize) {
  if (typeof node === "string") {
    return capitalize(node);
  }

  if (Array.isArray(node)) {
    return node.map((child) => formatHeadingChildren(child, capitalize));
  }

  if (!isValidElement(node)) {
    return node;
  }

  if (node.props.children == null) {
    return node;
  }

  return cloneElement(
    node,
    node.props,
    Children.map(node.props.children, (child) => formatHeadingChildren(child, capitalize))
  );
}

function createHeading(Tag) {
  return function Heading({ children, ...props }) {
    const capitalize = useCapitalizeHeadingText();
    return <Tag {...props}>{formatHeadingChildren(children, capitalize)}</Tag>;
  };
}

export const H1 = createHeading("h1");
export const H2 = createHeading("h2");
export const H3 = createHeading("h3");
export const H4 = createHeading("h4");
