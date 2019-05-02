import React from 'react';

export default function LeftTriangleBtn(props) {
  const {
    width,
    height,
    className = '',
    style = {},
    triangleClass = 'triangle-left border-left-black',
    children,
    onClick
  } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className={`cursor-pointer ${className}`}>
      <div className="relative">
        <div className="z-50 absolute pin-l pin-b ml-1 mb-1">{children}</div>
        <div className={`${triangleClass}`} />
      </div>
    </button>
  );
}
