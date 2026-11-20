"use client";
import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const randomColors = (count) => {
  return new Array(count)
    .fill(0)
    .map(() => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

const TubesCursorBackground = forwardRef(function TubesCursorBackground({ onColorChange }, ref) {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  const cycleColors = () => {
    if (appRef.current) {
      const newTubeColors = randomColors(3);
      appRef.current.tubes.setColors(newTubeColors);
      appRef.current.tubes.setLightsColors(randomColors(4));
      onColorChange?.(newTubeColors[0]);
    }
  };

  const setPalette = (colors, lights) => {
    if (appRef.current && Array.isArray(colors)) {
      appRef.current.tubes.setColors(colors);
      if (lights) appRef.current.tubes.setLightsColors(lights);
      onColorChange?.(colors[0]);
    }
  };

  useImperativeHandle(ref, () => ({
    cycleColors,
    setPalette,
  }));

  useEffect(() => {
    // Delaying init lets the canvas settle to its final size first —
    // initializing immediately produces "Computed radius is NaN" from the lib.
    const initTimer = setTimeout(() => {
      import(/* webpackIgnore: true */ 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js')
        .then((module) => {
          const TubesCursor = module.default;
          if (canvasRef.current) {
            const initialColors = ['#10b981', '#065f46', '#34d399'];
            appRef.current = TubesCursor(canvasRef.current, {
              tubes: {
                colors: initialColors,
                lights: {
                  intensity: 200,
                  colors: ['#10b981', '#34d399', '#6ee7b7', '#065f46'],
                },
              },
            });
            onColorChange?.(initialColors[0]);
          }
        })
        .catch((err) => console.error('Failed to load TubesCursor module:', err));
    }, 100);

  return () => {
      clearTimeout(initTimer);
      if (appRef.current && typeof appRef.current.dispose === 'function') {
        appRef.current.dispose();
      }
    };
  }, [onColorChange]);

  return (
    <div onClick={cycleColors} className="fixed inset-0 z-0 bg-black cursor-pointer">
      <canvas ref={canvasRef} className="fixed inset-0" />
    </div>
  );
});

export default TubesCursorBackground;
