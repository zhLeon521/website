import Image from 'next/image';
import Link from '../Link';
import { Pre } from './Pre';

const MDXComponents = {
  Image,
  a: Link,
  pre: Pre,
};

export default MDXComponents;
