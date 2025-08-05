import { useRef, useState, type UIEventHandler } from "react";

interface VirtualizedListProps {
  items: Array<string>;
  itemHeight: number;
  height: number;
}

const VirtualizedList = ({
  items,
  height,
  itemHeight,
}: VirtualizedListProps) => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const totalHeight = items.length * itemHeight;

  const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  const visibleCount = Math.ceil(height / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      style={{
        height,
        overflowY: "auto",
        scrollBehavior: "smooth",
        width: 500,
      }}
      ref={containerRef}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;
          return (
            <div
              key={index}
              style={{
                width: "100%",
                height: itemHeight,
                position: "absolute",
                top: itemHeight * actualIndex,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);
export const VirtualizedListExample = () => {
  return <VirtualizedList itemHeight={40} height={400} items={items} />;
};
