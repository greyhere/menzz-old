const Logo = ({ stroke = 'currentColor', ...props }) => (
  <svg
    width='203'
    height='64'
    viewBox='0 0 203 64'
    fill='none'
    stroke={stroke}
    shapeRendering='geometricPrecision'
    {...props}
  >
    <path
      d='M1 60.8821V3L31.7681 32.719L62.5362 3H200L139.953 61H202'
      stroke={stroke}
      strokeWidth='2'
    />
    <path
      d='M98.75 61H64V39M64 39V17H88M64 39H88'
      stroke={stroke}
      strokeWidth='1.5'
    />
    <path
      d='M98 61.5V16L128.844 61V16H186.513L152.5 48.7273H202'
      stroke={stroke}
      strokeWidth='1.5'
    />
  </svg>
);

export default Logo;
