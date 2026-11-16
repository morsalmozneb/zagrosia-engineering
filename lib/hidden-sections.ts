// Temporarily hides the AI Lab, Academy and Blog from the website.
// To bring them back, change this to false. Nothing was deleted.
export const HIDE_AI_LAB_ACADEMY_BLOG = true

export const HIDDEN_HREFS = ["/ai-lab", "/academy", "/blog"]

export const isHiddenHref = (href: string) =>
  HIDE_AI_LAB_ACADEMY_BLOG && HIDDEN_HREFS.includes(href)
