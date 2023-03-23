import { SVGProps } from "react";
const SvgArrowUpwardFill = (
  props: SVGProps<SVGSVGElement> & { size: string }
) => (
  <div className={props.className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 48 48"
    >
      <path d="M24 40q-.65 0-1.075-.425-.425-.425-.425-1.075V13.7L11.15 25.05q-.45.45-1.05.45-.6 0-1.05-.45Q8.6 24.6 8.6 24q0-.6.45-1.05l13.9-13.9q.25-.25.525-.35.275-.1.525-.1.3 0 .55.1.25.1.5.35l13.9 13.9q.45.45.45 1.05 0 .6-.45 1.05-.45.45-1.05.45-.6 0-1.05-.45L25.5 13.7v24.8q0 .65-.425 1.075Q24.65 40 24 40Z" />
    </svg>
  </div>
);
export default SvgArrowUpwardFill;
