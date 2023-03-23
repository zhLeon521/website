import { SVGProps } from "react";
const SvgAddCircleFill = (
  props: SVGProps<SVGSVGElement> & { size: string }
) => (
  <div className={props.className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 48 48"
    >
      <path d="M24.15 34q.65 0 1.075-.425.425-.425.425-1.075v-6.8h6.9q.6 0 1.025-.425Q34 24.85 34 24.2q0-.65-.425-1.075-.425-.425-1.075-.425h-6.85v-7.25q0-.6-.425-1.025Q24.8 14 24.15 14q-.65 0-1.075.425-.425.425-.425 1.075v7.2h-7.2q-.6 0-1.025.425Q14 23.55 14 24.2q0 .65.425 1.075.425.425 1.075.425h7.15v6.85q0 .6.425 1.025Q23.5 34 24.15 34ZM24 44q-4.25 0-7.9-1.525-3.65-1.525-6.35-4.225-2.7-2.7-4.225-6.35Q4 28.25 4 24q0-4.2 1.525-7.85Q7.05 12.5 9.75 9.8q2.7-2.7 6.35-4.25Q19.75 4 24 4q4.2 0 7.85 1.55Q35.5 7.1 38.2 9.8q2.7 2.7 4.25 6.35Q44 19.8 44 24q0 4.25-1.55 7.9-1.55 3.65-4.25 6.35-2.7 2.7-6.35 4.225Q28.2 44 24 44Z" />
    </svg>
  </div>
);
export default SvgAddCircleFill;
