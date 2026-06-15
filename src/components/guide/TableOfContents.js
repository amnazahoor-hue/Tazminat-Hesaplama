export default function TableOfContents({ items }) {
  return (
    <nav className="toc-nav" aria-label="İçindekiler" translate="no">
      <span className="toc-title">İçindekiler</span>
      <ol className="toc-list">
        {items.map((item) => (
          <li key={item.id} className="toc-item">
            <a href={`#${item.id}`} className="toc-link">
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
