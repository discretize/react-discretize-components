import classNames from 'classnames';
import { makeStyles } from 'tss-react/mui';

// stolen from https://gitlab.com/benblazak/homepage/-/blob/0cb4a432b3b3e9697f1a4a796d203884de59bb7f/src/lib/Image.svelte
const useStyles = makeStyles()(() => ({
  img: {
    width: '100%',
    display: 'block',
  },
}));

interface ResponsiveImageProps {
  // meta: object that gets returned by vite-imagetools
  meta: Record<string, unknown>[];
  alt: string;
  className?: string;
}

export function ResponsiveImage({
  alt,
  meta: metaProps,
  className,
}: ResponsiveImageProps) {
  const { classes } = useStyles();

  if (!metaProps) return <></>;

  let meta = metaProps;
  if (!Array.isArray(metaProps)) meta = [metaProps];
  // TODO add css

  // all images by format
  let sources = new Map();
  meta.map((m) => sources.set(m.format, []));
  meta.map((m) => sources.get(m.format).push(m));

  // fallback
  let image = sources.get([...sources.keys()].slice(-1)[0])[0];

  return (
    <div className={className}>
      <picture>
        {[...sources.keys()].map((format, index) => (
          <source
            key={`${format}-${index}`}
            type={`image/${format}`}
            srcSet={meta
              .filter((m) => m.format === format)
              .map((m) => `${m.src} ${m.width}w`)
              .join(', ')}
          />
        ))}
        <img
          loading="lazy"
          decoding="async"
          className={classNames(className, classes.img)}
          src={image.src}
          alt={alt}
        />
      </picture>
    </div>
  );
}
