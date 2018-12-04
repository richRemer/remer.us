/**
 * Create view to toggle between stop and play when signalled.
 * @param {HTMLMediaElement} elem
 * @returns {View}
 */
export default function stopToggle(elem) {
    return () => {
        elem[elem.paused ? "play" : "pause"]();
        if (elem.paused) elem.currentTime = 0;
    };
}
