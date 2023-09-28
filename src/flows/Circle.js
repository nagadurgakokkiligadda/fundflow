import React from 'react';

function HalfCircle() {
  // Define CSS styles for the half circle with a glass effect
  const halfCircleStyle = {
    width: '0',
    height: '0',
    borderBottom: '100px solid transparent', // Bottom triangle, change the height for the half circle
    borderRight: '100px solid transparent', // Transparent color on the right side
    position: 'fixed', // Position the half circle
    bottom: '20px', // Add margin from the bottom
    left: '20px', // Add margin from the left
    borderRadius: '50%', // Rounded edges for all sides
    transform: 'rotate(0deg)', // Rotate the half circle to the opposite direction (0 degrees)
    background: 'linear-gradient(to top, #9900CC, #9900CC 50%, #FFFFFF 50%)', // Glass effect with purple and white colors
  };

  return <div style={halfCircleStyle}></div>;
}

function Circle() {
  // Define CSS styles for the circles with linear gradients
  const circleStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%', // Makes it a circle
    margin: '20px', // Spacing between circles
    display: 'inline-block', // Allows the circles to appear side by side
    position: 'relative', // Enables positioning
  };

  // Define positions for each circle
  const circlePositions = [
    { top: '0', left: '0' },
    { top: '0', left: '200px' },
    { top: '150px', left: '50px' },
    { top: '150px', left: '250px' },
    { top: '300px', left: '100px' },
    { top: '300px', left: '300px' },
    { top: '450px', left: '150px' }, // Original position of circle1
    { top: '200px', left: '50px' }, // Position of the new circle
    { top: '400px', left: '250px' }, // Position of the new circle
    // Half Circle is placed at the bottom left
    { top: '200px', left: '0' }, // Position of the new circle at the left side
    { top: '350px', left: '0' }, // Position of the new circle at the left side
  ];

  // Linear gradient background styles using gradientStyle1 for all circles
  const gradientStyles = Array(circlePositions.length).fill({
    ...circleStyle,
    background: 'linear-gradient(to bottom, #CCCCCC, #FFFFFF)', // Gradient from blue to light blue
  });

  return (
    <div style={{ position: 'fixed', height: '100%', width: '100%' }}>
      {/* Half Circle */}
      <HalfCircle />

      {/* Render circles at different positions with the same color */}
      {circlePositions.map((position, index) => (
        <div
          key={index}
          style={{
            ...circleStyle,
            ...position,
          }}
        >
          {/* Conditionally render gradient styles */}
          <div style={{ ...circleStyle, ...gradientStyles[index] }}></div>
        </div>
      ))}
    </div>
  );
}

export default Circle;
