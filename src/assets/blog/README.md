# Asset-pipeline images

Images placed here are imported by name and processed by Astro at build time
(resized, converted to WebP/AVIF, lazy-loaded, aspect-ratio preserved).

Use from an .mdx post:

```mdx
import { Image } from 'astro:assets';
import diagram from '../../assets/blog/your-image.png';

<Image src={diagram} alt="..." width={900} />
```

For static images that you reference with a plain `/blog/...` URL, use
`public/blog/` instead.
