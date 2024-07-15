// components/ScrollableContent.tsx
import React from 'react';

const ScrollableContent: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4">Scrollable Content</h2>
      <div className="overflow-y-auto h-96">
        {/* Add long content here to test scrolling */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim consequat ligula, at congue
          nulla dapibus quis. Pellentesque sodales, lorem sit amet ultricies fermentum, sem urna placerat justo,
          quis luctus mi sem vel purus.
        </p>
        <p>
          Sed id quam vestibulum, suscipit odio et, efficitur lorem. Phasellus ac sem non nisi venenatis varius
          vel ut sem. Aenean a lorem ac risus placerat maximus.
        </p>
        <p>
          Donec id lorem ut ex consequat suscipit. Fusce auctor interdum urna, nec ultrices sem tempus sit amet.
          Mauris a vehicula nisi.
        </p>
        <p>
          Proin feugiat, turpis at volutpat vehicula, eros ante fermentum ligula, sed commodo felis velit a
          ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam ut
          diam dolor.
        </p>
        {/* Add more content to test scrolling */}
      </div>
    </div>
  );
};

export default ScrollableContent;
