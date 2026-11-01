import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { usePageVisible, usePrefersReducedMotion } from '../hooks/useMediaState';
import { Icon } from './Icon';

const slides = [
  {
    image: '/assets/slider/hot-coffee.webp',
    alt: 'كوبان من اللاتيه بفن الحليب على طاولة خشبية',
    title: 'قهوة ساخنة بروح مختصة',
    text: 'إسبريسو غني ومشروبات دافئة تُحضَّر بعناية في كل مرة.',
    category: 'hot',
  },
  {
    image: '/assets/slider/iced-drinks.webp',
    alt: 'كوب بارد بالليمون والنعناع والثلج',
    title: 'انتعاش في كل كوب',
    text: 'مشروبات مثلجة تكسر حرارة اليوم بنكهات متوازنة.',
    category: 'cold',
  },
  {
    image: '/assets/slider/desserts.webp',
    alt: 'قطعة تيراميسو مزيّنة بالشوكولاتة على طبق',
    title: 'حلويات تكمل قهوتك',
    text: 'لمسة حلوة مختارة لتكون الرفيق الأجمل لمشروبك.',
    category: 'desserts',
  },
];

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD_PX = 40;

export function ImageSlider() {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const swipeStartX = useRef<number | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const pageVisible = usePageVisible();

  const goTo = (next: number) => setIndex((next + slides.length) % slides.length);

  const autoplay = !reducedMotion && !userPaused && !interacting && pageVisible;

  // Depending on `index` restarts the countdown after any manual change of slide.
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % slides.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, index]);

  const handlePointerUp = (event: PointerEvent) => {
    if (swipeStartX.current === null) return;
    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;
    // RTL: the next slide sits to the left, so dragging rightwards reveals it.
    if (Math.abs(distance) >= SWIPE_THRESHOLD_PX) goTo(index + (distance > 0 ? 1 : -1));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') goTo(index + 1);
    if (event.key === 'ArrowRight') goTo(index - 1);
  };

  return (
    <section
      className="slider"
      aria-roledescription="carousel"
      aria-label="أبرز ما في قائمتنا"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={() => setInteracting(false)}
      onKeyDown={handleKeyDown}
    >
      <div
        className="slider__viewport"
        onPointerDown={(event) => {
          swipeStartX.current = event.clientX;
        }}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          swipeStartX.current = null;
        }}
      >
        {slides.map((slide, slideIndex) => {
          const active = slideIndex === index;
          return (
            <div
              key={slide.image}
              className={`slide ${active ? 'slide--active' : ''}`}
              role="group"
              aria-roledescription="شريحة"
              aria-label={`${slideIndex + 1} من ${slides.length}`}
              aria-hidden={!active}
              inert={!active}
            >
              <img src={slide.image} alt={slide.alt} width="1600" height="900" draggable={false} />
              <div className="slide__caption">
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
                <Link to={`/products?category=${slide.category}`} className="slide__link">
                  تصفّح الأصناف
                  <Icon name="arrowLeft" size={16} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="slider__controls">
        <div className="slider__dots">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.image}
              type="button"
              className="slider__dot"
              aria-label={`الانتقال إلى الشريحة ${slideIndex + 1}: ${slide.title}`}
              aria-current={slideIndex === index}
              onClick={() => goTo(slideIndex)}
            />
          ))}
        </div>
        <div className="slider__buttons">
          {!reducedMotion && (
            <button
              type="button"
              className="icon-button"
              aria-label={userPaused ? 'تشغيل التنقل التلقائي' : 'إيقاف التنقل التلقائي'}
              onClick={() => setUserPaused((paused) => !paused)}
            >
              <Icon name={userPaused ? 'play' : 'pause'} size={18} />
            </button>
          )}
          <button type="button" className="icon-button" aria-label="الشريحة السابقة" onClick={() => goTo(index - 1)}>
            <Icon name="chevronRight" />
          </button>
          <button type="button" className="icon-button" aria-label="الشريحة التالية" onClick={() => goTo(index + 1)}>
            <Icon name="chevronLeft" />
          </button>
        </div>
      </div>
    </section>
  );
}
