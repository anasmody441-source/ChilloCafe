const paths = {
  menu: 'M4 7h16M4 12h16M4 17h10',
  close: 'M6 6l12 12M18 6L6 18',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.8-4.8',
  chevronLeft: 'M15 5l-7 7 7 7',
  chevronRight: 'M9 5l7 7-7 7',
  arrowUp: 'M12 20V5M5.5 11.5L12 5l6.5 6.5',
  arrowLeft: 'M20 12H5M11.5 5.5L5 12l6.5 6.5',
  pause: 'M9 5v14M15 5v14',
  play: 'M8 5l11 7-11 7z',
  plus: 'M12 5v14M5 12h14',
  trash: 'M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v5.5M14 11v5.5',
  lock: 'M7 11V8a5 5 0 0 1 10 0v3M5.5 11h13v9.5h-13z',
  image: 'M4 5h16v14H4zM4 16l5-5 4 4 2.5-2.5L20 17M15.5 9.5h.01',
  pin: 'M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  phone: 'M6 3.5h3l1.5 5-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 5 1.5v3a2 2 0 0 1-2 2C11.5 20 4 12.5 4 5.5a2 2 0 0 1 2-2z',
  mail: 'M3.5 6h17v12h-17zM3.5 7l8.5 6.5L20.5 7',
  clock: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 7.5V12l3 2',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  info: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 11v5.5M12 7.5h.01',
  share: 'M17 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM7 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM17 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM9.6 10.6l4.8-2.7M9.6 13.4l4.8 2.7',
  bean: 'M15.5 3.5c3.5 2 4.5 7 2 11.5s-7 7-10.5 5-4.5-7-2-11.5 7-7 10.5-5zM16 4c-1 4-5 3.5-6.5 7.5S10 18 8 20',
  cup: 'M4 9h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6zM17 10.5h1.5a2.75 2.75 0 0 1 0 5.5H16.5M8 5.5c0-1.5 1.5-1.5 1.5-3M12 5.5c0-1.5 1.5-1.5 1.5-3',
  heart: 'M12 20s-8-4.8-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.2 12 20 12 20z',
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
