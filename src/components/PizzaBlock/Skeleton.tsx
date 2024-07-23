import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="133" cy="131" r="118" />
    <rect x="-1" y="272" rx="8" ry="8" width="280" height="27" />
    <rect x="-2" y="315" rx="8" ry="8" width="280" height="88" />
    <rect x="1" y="425" rx="8" ry="8" width="92" height="27" />
    <rect x="110" y="415" rx="8" ry="8" width="166" height="44" />
  </ContentLoader>
);

export default Skeleton;
