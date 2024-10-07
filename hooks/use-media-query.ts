import { useEffect, useState } from 'react';

/**
 * Custom hook to check if a media query matches.
 * @param query - The media query string (e.g., "(min-width: 768px)").
 * @returns A boolean indicating whether the media query matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Update state based on the current media query match status
    const updateMatch = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Set the initial state
    setMatches(mediaQueryList.matches);

    // Add event listener to handle changes
    mediaQueryList.addEventListener('change', updateMatch);

    // Clean up the event listener on unmount
    return () => mediaQueryList.removeEventListener('change', updateMatch);
  }, [query]);

  return matches;
}
