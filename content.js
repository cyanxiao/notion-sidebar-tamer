const sidebarInitObserver = new MutationObserver((mutationsList, observer) => {
  // Check if "notion-sidebar" class is present in the target element
  const targetElement = document.querySelector(".notion-sidebar");
  if (targetElement && targetElement.classList.contains("notion-sidebar")) {
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
  if (targetElement && targetElement.classList.contains("notion-sidebar")) {
    const sidebar = document.getElementsByClassName("notion-sidebar")[0];
    setTimeout(
      () => {
        if (sidebar && sidebar.style) {
          sidebar.style.display = JSON.parse(
            localStorage.getItem("LRU:KeyValueStore2:sidebar")
          )["value"]["expanded"]
            ? "block"
            : "none";
        }
      },
      JSON.parse(localStorage.getItem("LRU:KeyValueStore2:sidebar"))["value"][
        "expanded"
      ]
        ? 0
        : 500
    );
  }
}

// Start observing changes to the target element and its descendants
sidebarInitObserver.observe(document.body, { subtree: true, childList: true });
