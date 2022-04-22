const Search = ({ ...props }) => (
  <svg
    viewBox='0 0 24 24'
    width='24'
    height='24'
    stroke='currentColor'
    strokeWidth='1.5'
    strokeLinecap='round'
    strokeLinejoin='round'
    fill='none'
    shapeRendering='geometricPrecision'
    {...props}
  >
    <circle cx='11' cy='11' r='8' />
    <line x1='21' y1='21' x2='16.65' y2='16.65' />
  </svg>
);

export default Search;
