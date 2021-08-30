export let lastEvent: NonNullable<Event>;
['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(
    (eventType) => {
        document.addEventListener(
            eventType,
            (event) => {
                lastEvent = event;
            },
            {
                capture: true,
                passive: true
            }
        );
    }
);
