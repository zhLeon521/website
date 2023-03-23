import { SVGProps } from "react";
const SvgPagesFill = (props: SVGProps<SVGSVGElement> & { size: string }) => (
  <div className={props.className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 48 48"
    >
      <path d="M24 32.05q.25 0 .425-.1t.275-.35l2.1-4.8 4.8-2.1q.25-.1.35-.275.1-.175.1-.425t-.1-.425q-.1-.175-.35-.275l-4.8-2.1-2.1-4.8q-.1-.25-.275-.35-.175-.1-.425-.1t-.425.1q-.175.1-.275.35l-2.1 4.8-4.8 2.1q-.25.1-.35.275-.1.175-.1.425t.1.425q.1.175.35.275l4.8 2.1 2.1 4.8q.1.25.275.35.175.1.425.1ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Z" />
    </svg>
  </div>
);
export default SvgPagesFill;
