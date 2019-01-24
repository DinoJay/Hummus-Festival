import React, {useEffect, Component} from 'react';
import * as d3 from 'd3';

import * as rough from 'roughjs/dist/rough.umd';

export default function ReactRough(props) {
  const {height, width, render, prepend = null, append, children} = props;
  const refSVG = React.createRef();

  useEffect(() => {
    const svg = refSVG.current;
    const rc = rough.svg(svg);

    if (render) render(rc);

    // .filter(c => /[A-Z]/.test(c.type.displayName[0]))
    if (children) {
      React.Children.toArray(children).map(child => {
        console.log('child', child.type.name);
        const type = child.type.name.toLowerCase();
        const {translate = [0, 0], filter, id, ...props} = child.props;
        // const {points, ...opts} = child.props;
        const args = Object.keys(props).map(key => child.props[key]);
        const shape = rc[type](...args);

        const cont = d3
          .select(svg)
          .select('#rough')
          .append('g')
          .style('transform', `translate(${translate[0]}px,${translate[1]}px)`);
        // .attr('filter', filter);

        cont.node().appendChild(shape);

        cont
          .select('path:nth-child(1)')
          .attr('filter', filter)
          .attr('id', id);

        // d3.select(svg)
        //   .append('defs')
        //   .append('filter')
        //   .attr('id', 'f1')
        //   .attr('x', 0)
        //   .attr('y', 0)
        //   .append('feGaussianBlur')
        //   .attr('in', 'SourceGraphic')
        //   .attr('stdDeviation', 15);
      });
    }
    return () => {
      d3.select(svg)
        .selectAll('#rough g')
        .remove();
      // while (svg.lastChild) {
      //   svg.removeChild(svg.lastChild);
      // }
    };
  });

  return (
    <svg width={width} height={height} ref={refSVG}>
      {prepend}
      <g id="rough" filter="url(#goo)" />
      {append}
    </svg>
  );
}

export const Arc = ({x, y, width, height, start, stop, closed, options}) => (
  <ReactRough
    width={width}
    height={height}
    render={rc => {
      rc.arc(x, y, width, height, start, stop, closed, options);
    }}
  />
);

export const Circle = ({x, y, diameter, options = {}}) => (
  <ReactRough
    render={rc => {
      rc.circle(x, y, diameter, (options = {}));
    }}
  />
);

export const Ellipse = ({x, y, width, height, options = {}}) => (
  <ReactRough
    render={rc => {
      rc.ellipse(x, y, width, height, options);
    }}
  />
);

export const Line = ({x1, y1, x2, y2, options = {}}) => (
  <ReactRough
    render={rc => {
      rc.line(x1, y1, x2, y2, options);
    }}
  />
);

export const LinearPath = ({points, options = {}}) => (
  <ReactRough
    render={rc => {
      rc.linearPath(points, options);
    }}
  />
);

export const Polygon = ({vertices, options = {}}) => (
  <ReactRough
    render={rc => {
      rc.polygon(vertices, options);
    }}
  />
);

export const Path = ({width, height, points, ...data}) => (
  <ReactRough
    render={rc => {
      rc.path(...points, data);
    }}
  />
);

export const Rectangle = ({x, y, width, height, options = {}}) => (
  <ReactRough
    width={width}
    height={height}
    render={rc => {
      rc.rectangle(x, y, width, height, options);
    }}
  />
);

export const Curve = ({points, options = {}}) => (
  <ReactRough
    render={rc => {
      rc.curve(points, options);
    }}
  />
);
