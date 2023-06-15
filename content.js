const sidebarInitObserver = new MutationObserver((mutationsList, observer) => {
  const targetElement = document.querySelector(".notion-sidebar");
  if (targetElement) {
    observer.disconnect();
    const expandedObserver = new MutationObserver(expandedObserverCallback);
    expandedObserver.observe(targetElement, {
      subtree: false,
      childList: false,
      attributes: true,
    });
  }
});

function expandedObserverCallback(mutationsList, observer) {
  const targetElement = document.querySelector(".notion-sidebar");
  if (targetElement) {
    const sidebar = targetElement;
    const sidebarData = JSON.parse(
      localStorage.getItem("LRU:KeyValueStore2:sidebar")
    );
    const expanded = sidebarData["value"]["expanded"];
    requestAnimationFrame(() => {
      if (sidebar && sidebar.style) {
        sidebar.style.display = expanded ? "block" : "none";
      }
    });
  }
}

sidebarInitObserver.observe(document.body, { subtree: true, childList: true });
