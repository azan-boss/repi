"use client"
import { ErrorBoundary } from 'react-error-boundary';
import Spline from '@splinetool/react-spline';
const SplineFallback = () => (
  <div className="text-center text-red-500">
    Unable to load 3D scene. Please try again later.
  </div>
);

export default function Robot() {
  return (
    <main>
      <ErrorBoundary FallbackComponent={SplineFallback}>
      <Spline
        scene="https://prod.spline.design/5nw5sfzQKRNfnjZn/scene.splinecode" 
      />
      </ErrorBoundary>
    </main>
  );
}
