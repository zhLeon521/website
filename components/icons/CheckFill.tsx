import { SVGProps } from "react";
const SvgCheckFill = (props: SVGProps<SVGSVGElement> & { size: string }) => (
  <div className={props.className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 48 48"
    >
      <path d="M18.9 35.1q-.3 0-.55-.1-.25-.1-.5-.35L8.8 25.6q-.45-.45-.45-1.1 0-.65.45-1.1.45-.45 1.05-.45.6 0 1.05.45l8 8 18.15-18.15q.45-.45 1.075-.45t1.075.45q.45.45.45 1.075T39.2 15.4L19.95 34.65q-.25.25-.5.35-.25.1-.55.1Z" />
    </svg>
  </div>
);
export default SvgCheckFill;
