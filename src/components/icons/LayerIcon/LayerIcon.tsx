import type { HTMLAttributes } from 'react';

import type { LayerSpecification } from '@maplibre/maplibre-gl-style-spec';

export type LayerIconProps = HTMLAttributes<SVGElement> & {
  type: LayerSpecification['type'];
};

const LayerIcon = ({ type, ...props }: LayerIconProps) => {
  switch (type) {
    case 'background':
    case 'fill-extrusion':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
          <path d="m 1.821019,10.255581 7.414535,5.020197 c 0.372277,0.25206 0.958697,0.239771 1.30985,-0.02745 L 17.539255,9.926162 C 17.89041,9.658941 17.873288,9.238006 17.501015,8.985946 L 10.08648,3.9657402 C 9.714204,3.7136802 9.127782,3.7259703 8.776627,3.9931918 L 1.782775,9.315365 c -0.3511551,0.267221 -0.3340331,0.688156 0.03824,0.940216 z" />
        </svg>
      );
    case 'circle':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
          <path
            transform="translate(2 2)"
            d="M7.5,0C11.6422,0,15,3.3578,15,7.5S11.6422,15,7.5,15 S0,11.6422,0,7.5S3.3578,0,7.5,0z M7.5,1.6666c-3.2217,0-5.8333,2.6117-5.8333,5.8334S4.2783,13.3334,7.5,13.3334 s5.8333-2.6117,5.8333-5.8334S10.7217,1.6666,7.5,1.6666z"
          ></path>
        </svg>
      );
    case 'hillshade':
    case 'raster':
    case 'heatmap':
    case 'fill':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
          <path d="M 2.84978,9.763512 9.462149,4.7316391 16.47225,9.478015 9.859886,14.509879 2.84978,9.763512 m -1.028761,0.492069 7.414535,5.020197 c 0.372277,0.25206 0.958697,0.239771 1.30985,-0.02745 L 17.539255,9.926162 C 17.89041,9.658941 17.873288,9.238006 17.501015,8.985946 L 10.08648,3.9657402 C 9.714204,3.7136802 9.127782,3.7259703 8.776627,3.9931918 L 1.782775,9.315365 c -0.3511551,0.267221 -0.3340331,0.688156 0.03824,0.940216 l 0,0 z" />
        </svg>
      );
    case 'line':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
          <path
            d="M 12.34,1.29 C 12.5114,1.1076 12.7497,1.0029 13,1 13.5523,1 14,1.4477 14,2 14.0047,2.2478 13.907,2.4866 13.73,2.66 9.785626,6.5516986 6.6148407,9.7551593 2.65,13.72 2.4793,13.8963 2.2453,13.9971 2,14 1.4477,14 1,13.5523 1,13 0.9953,12.7522 1.093,12.5134 1.27,12.34 4.9761967,8.7018093 9.0356422,4.5930579 12.34,1.29 Z"
            transform="translate(2,2)"
          />
        </svg>
      );

    case 'symbol':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
          <g transform="matrix(1.2718518,0,0,1.2601269,16.559526,-7.4065264)">
            <path d="m -9.7959773,11.060163 c -0.3734787,-0.724437 -0.3580577,-1.2147051 -0.00547,-1.8767873 l 8.6034029,-0.019416 c 0.39670292,0.6865644 0.38365934,1.4750693 -0.011097,1.8864953 l -3.1359613,-0.0033 -0.013695,7.1305 c -0.4055357,0.397083 -1.3146432,0.397083 -1.7769191,-0.02274 l 0.030226,-7.104422 z" />
          </g>
        </svg>
      );

    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" {...props}>
          <path d="M480-120q-33 0-56.5-23.5T400-200q0-33 23.5-56.5T480-280q33 0 56.5 23.5T560-200q0 33-23.5 56.5T480-120Zm-80-240v-480h160v480H400Z" />
        </svg>
      );
  }
};

LayerIcon.displayName = 'LayerIcon';

export { LayerIcon };
